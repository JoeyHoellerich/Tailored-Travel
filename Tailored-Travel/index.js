const user ={
    latitude: null,
    longitude: null
}

// Obtain user location
async function getCoords(){
    // check and see if the user has geolocation
    if (navigator.geolocation){
        // create a new promise object that will be resolved with the user's geolocation data
        new Promise((resolve) => {
            // gets the current position information from user, resolves promise when completed
            navigator.geolocation.getCurrentPosition(resolve)
        }).then((value) => {
            // after promise is resolved, update the user's latitude and longitude with the coordinates
            user.latitude = value.coords.latitude;
            user.longitude = value.coords.longitude;
        })
    // if the user doesn not have geoloaction, log it in the console
    } else{
        console.log("No geolocation feature")
    }  
}

getCoords();
// use leaflet's get coordinate built in function - async
// return user's latitude and longitude

// Center Map based on user's latitude and longitude
// zoom in on map (set minzoom value)
// add marker on user's position


// grab submit button from DOM
const businessSubmit = document.getElementById("businessSub");
// grab dropdown from DOM
const businessDrop = document.getElementById("businessDrop")
businessSubmit.addEventListener("click", businessLocator)

// create function for submit button
async function businessLocator(){
    // get value from dropdown menu
    let businessSelect = businessDrop.value;
    console.log(businessSelect);
}
// get value from dropdown menu (resturant, business, coffee, etc)
// use value to identify 5 closest places based on user Lat/Long - Foursquare API
// create obejct for each location with location name, and Lat/Long Values
// place locations on map using markers (add location names to markers) - Leaflet API
