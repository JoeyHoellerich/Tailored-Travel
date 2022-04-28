const user ={
    latitude: null,
    longitude: null
}

// Obtain user location
async function getCoords(){
    // check and see if the user has geolocation
    if (navigator.geolocation){
        // create a new promise object that will be resolved with the user's geolocation data
        return new Promise((resolve) => {
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

// create Map
async function makeMap(){

    let mapObj = document.getElementById("map");

    // get user's coords and set them to user.latitude and user.longitude
    await getCoords();

    // check to make sure that map coordinates are available
    if (user.latitude == null || user.longitude == null){
        // if no map coordinates are available display message below
        mapObj.innerHTML = "Sorry No Map!"
        return
    }

    // create new map object on the div with the map id
    let map = L.map("map", {
        // center map on the user's latitude and longitude
        center: [user.latitude, user.longitude],
        zoom: 15
    })

    // create tile layer for the map (copy usage from Leaflet)
    // add to the map variable
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

    // add maker to represent the user
    // place marker at the user's latitude and longitude
    let userMarker = L.marker([user.latitude, user.longitude]);
    // bind the marker with a popup stating: you are here!
    userMarker.bindPopup(`<pl><b>You are Here!<br>${user.latitude}, ${user.longitude}</b></pl>`);
    // add the markert to the map, and open it by default
    userMarker.addTo(map).openPopup();
}

makeMap()

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
