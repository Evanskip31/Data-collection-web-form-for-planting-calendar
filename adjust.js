// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyCWGL8j9P5IM0yUsZCnU5Sa5WqMcWiTV3Q",
      authDomain: "dndg-planting-calendar.firebaseapp.com",
      databaseURL: "https://dndg-planting-calendar-default-rtdb.firebaseio.com",
      projectId: "dndg-planting-calendar",
      storageBucket: "dndg-planting-calendar.appspot.com",
      messagingSenderId: "820446353374",
      appId: "1:820446353374:web:83d4d8b80d878ae066ef4f",
      measurementId: "G-0EFQ3PV1S5"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Reference messages collection
  var messagesRef = firebase.database().ref('Planting-Calendar-Entries');
  
  
  // Date Validation
  function validDate(){
      var today = new Date().toISOString().split('T')[0];
      var nextWeekDate = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    document.getElementsByName("date")[0].setAttribute('min', null);
    document.getElementsByName("date")[0].setAttribute('max', nextWeekDate)
    document.querySelector("#date_planted").valueAsDate = new Date();
  }

  // Let's suggest and autocomplete places then geocode if true.
  document.getElementById('location-input').addEventListener('change', initMap)
  function initMap() {
    const input = document.getElementById("location-input");
    const autocomplete = new google.maps.places.Autocomplete(input);
  
    autocomplete.addListener("place_changed", () => {
    
      const place = autocomplete.getPlace();

      // If user enters a name of a place not suggested
      if (!place.geometry) {
        swal("You have provided an Invalid address","Enter a valid Address", "warning");
        return false;
      }

      // If the code gets here, it means they clicked on a suggestion, go ahead and geocode the place
      else if (place.geometry == true, geocode){
          
        // If the above function is true, proceed to geocode
          function geocode(){
            // Prevent actual submit
            e.preventDefault();
            var location = document.getElementById('location-input').value;
            axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params:{
                    address: location,
                    key: 'AIzaSyCZhP_mwsdzM5X-lJ8YNOIotgmkplUj5ew'
                }
            })
            .then(function(response){
                // Log full response
                console.log(response);
        
                // Formatted Address
                var formattedAddress = response.data.results[0].formatted_address;
                
                // Address Components
                var addressComponents = response.data.results[0].address_components;

                // Submit Form
                
                // Get values from the input fields
                var veg_planted = getInputVal('veg_planted');
                var date_planted = getInputVal('date_planted');
                var planting_tech = getInputVal('planting_tech');
                var experience = getInputVal('experience');
                var message = getInputVal('message');
                var your_name = getInputVal('your_name');
                var email = getInputVal('email');
                var timestamp = new Date().toISOString();
                console.log('' + timestamp);
            
        
                // Get geometry 
                var lat = response.data.results[0].geometry.location.lat;
                var lng = response.data.results[0].geometry.location.lng;
                var coords= (formattedAddress + ": " + lat + "," + lng);
                console.log(coords);
        
                // Save messages
                saveMessage(veg_planted, date_planted, planting_tech, experience, message, your_name, email, coords, timestamp);
                
            })
            .catch(function(error){
                console.log(error);
            });
            }
        }
      });
    }

    
    // Function to get form values
    function getInputVal(id) {
        return document.getElementById(id).value;
    }


    // Validate forn input fields
    document.getElementById("submit").onclick= function(){
        //e.preventDefault();
        let allAreFilled = true;
        document.getElementById("myForm").querySelectorAll("[required]").forEach(function (i) {
            if (!allAreFilled)nreturn;
            if (!i.value) allAreFilled = false;
        });
        if (!allAreFilled) {
            swal("Please fill all the *Required fields", "Click okay to continue", "warning");
            return false;
        }

        // If the function above returns true, it is now time to submit form
        else if (checkValidity() == true, saveMessage) {
            swal("Your Information has been submitted successfully ", "Click okay to continue", "success");
            return true;
        }
    };

    // Save message to firebase
    function saveMessage(veg_planted, date_planted, planting_tech, experience, message, your_name, email, coords, timestamp) {
        var newMessageRef = messagesRef.push();
        newMessageRef.set({
            Coordinates: coords,
            Veg_planted: veg_planted,
            Date_planted: date_planted,
            Planting_tech: planting_tech,
            Experience: experience,
            Message: message,
            Name: your_name,
            Email: email,
            Timestamp: timestamp
        });
    }

 
  
  
  // Once form submitted, Reset some specific fields
  /* function resetLabels()
  {
      //myForm is the name of form
      var cells = document.getElementById('myForm').elements;
      for (var i= 0; i < cells.length; i++) {
          if(cells[i].name =='veg_planted')//for example to not reset by name 
          cells[i].value='';
  
  //    cells[i].className = '';
  //    cells[i].style.color = 'black';
  // or cells[i].value='-1' for drop down
  // or cells[i].name= '';  name and id to compare and exclude specific elements
  // or cells[i].id= '';    
  //and i suggest to name like txt... and ddl...to                                  
  //know the type by name and id or just check the type
  //of element by using  cells[i].type
      }
  }
   */