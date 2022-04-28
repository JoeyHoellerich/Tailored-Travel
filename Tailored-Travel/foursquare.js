// Fetch Foursquare results

// categories codes
// coffee = 13032
// resaurant = 13065
// business = 11000
// hotel = 19014


// search function
// /search?ll=###%2C###&categories=#####%2C#####%2C######&limit=5
// ll=LAT%2CLONG - sets starting location based on LAT and LONG
// categories=#####%2C##### - sets search criteria categories based on codes 
// limit=# - sets number of results


let array = []
// create async function that get list of businesses based on user's location, and category selected
async function getBusinessesList(lat, long, businessCode){

    // set options for fetching information from foursquare (from API)
    const options = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: 'fsq3l/7/KnqGnbRmkhzeDFBm4FLyYBdHTegUn9nzRUJqvZY='
        }
      };

    let searchQuery = `https://api.foursquare.com/v3/places/search?ll=${lat}%2C${long}&categories=${businessCode}&limit=5`
      
    // fetch information from foursquare places, store in array called businessList   
    let businessList = await fetch(searchQuery, options)
        .then(response => response.json())
        .catch(err => console.error(err));

    return businessList
}

getBusinessesList(57.8, -57.8, 13032).then(results => console.log(results))
