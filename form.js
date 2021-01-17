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
  
}
var timestamp = new Date().toISOString();
//var timestamp = Date.now() || +new Date()
console.log('' + timestamp);

document.querySelector("#date_planted").valueAsDate = new Date();

// Input Field Validation
document.getElementById("submit").onclick = function() {
  let allAreFilled = true;
  document.getElementById("myForm").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (!i.value) allAreFilled = false;
  })
  if (!allAreFilled) {
    swal("Please fill all the *Required fields","Click okay to continue", "warning");
  }
  else {
    swal("Your Information has been submitted successfully ", "Click okay to continue", "success");
  }
};

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCZhP_mwsdzM5X-tgmkplUj5e&libraries=places">

function initMap() {
  const input = document.getElementById("location-input");
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", () => {
  
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      //window.alert("No details available for input: '" + place.name + "'");
      swal("You have provided an Invalid address","Enter a valid Address", "warning");
      return;
    }
  });

  //Check before submit
  document.getElementById('myForm').addEventListener('submit', function(e){
    e.preventDefault(); //prevent form submit
    const place = autocomplete.getPlace(); //get place from autocomplete
    if (!place || !place.geometry) { //check if valid location
      swal("You have provided an Invalid address","Enter a valid Address", "warning");
      return false;
    }
    else {
      // Listen for form submit
      document.getElementById('myForm').addEventListener('submit', geocode);
      function geocode(e){
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
    
            // Get values from the input fields
            var veg_planted = getInputVal('veg_planted');
            var date_planted = getInputVal('date_planted');
            var planting_tech = getInputVal('planting_tech');
            var experience = getInputVal('experience');
            var message = getInputVal('message');
            var your_name = getInputVal('your_name');
            var email = getInputVal('email');
        
    
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




// Function to Geocode address


// Listen for Form Submit
document.getElementById('myForm').addEventListener('submit', submitForm);

// validate form
function validForm(){
  // All possible scenarios
  

  if (validForm == true){
    // we should now submit the form --- Else return false( Show Error)
    document.getElementById('myForm').addEventListener('submit', submitForm);
  }
}


// Submit Form 
function submitForm(e){
    e.preventDefault();

}

// Function to get form values
function getInputVal(id){
    return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(veg_planted, date_planted, planting_tech, experience, message, your_name, email, coords, timestamp){
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