const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: 'fsq3l/7/KnqGnbRmkhzeDFBm4FLyYBdHTegUn9nzRUJqvZY='
    }
  };
  
  fetch('https://api.foursquare.com/v3/places/search', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));