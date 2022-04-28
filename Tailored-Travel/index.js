// create object for user that will hold latitude and longitude data
const user ={
    latitude: null,
    longitude: null
}

// holds list of current business selected by user (coffe, hotels, etc)
let shopArray = [];
// make map a global variable for use throughout functions
let map;
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

    // grab the div that the map will be placed in
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
    map = L.map("map", {
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

// grab submit button from DOM
const businessSubmit = document.getElementById("businessSub");
// grab dropdown from DOM
const businessDrop = document.getElementById("businessDrop")
businessSubmit.addEventListener("click", businessLocator)

// create function that create an array of 5 businesses for a specified category
// [{latitude, longitude, name}, {...}]
async function generateBusinessArray(){
        // get value from dropdown menu
        let businessSelect = businessDrop.value;
        // use value to create array of 5 closest businesses
        let businessList = await getBusinessesList(user.latitude, user.longitude, businessSelect);
    
        // create array to contain objects of each business
        let businessArray = [];
        // for each business in our list
        businessList.forEach((item) => {
            // create a new object
            let object = {
                // add business latitude
                latitude: item.geocodes.main.latitude,
                // add business longitude
                longitude: item.geocodes.main.longitude,
                // add business name
                businessName: item.name
            }
            // add new object to our array
            businessArray.push(object);
        })
    
        // return our business array
        shopArray = businessArray;
}

// create function for submit button
function markerMaker(){
    // create Marker array 
    let markerArray = [];
    // for each business
    shopArray.forEach((item) => {
        // create a new marker based on business lat and long
        let marker = L.marker([item.latitude, item.longitude]);
        // bind a popup to the new marker - business name
        marker.bindPopup(`<b>${item.businessName}</b>`);
        // add marker to the map
        marker.addTo(map)
        // add marker to array (if you come back, make layers and remove previous layer when user selects the submit button again)
        markerArray.push(marker);
    })
}

// function that is run when user hits submit
async function businessLocator(){
    // get list of businesses from foursquare
    await generateBusinessArray()
    // place markers
    markerMaker()
}

