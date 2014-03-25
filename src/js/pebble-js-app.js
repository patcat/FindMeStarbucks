var locationOptions = {"timeout": 15000, "maximumAge": 60000}; 

function fetch_location_data(pos) {
  var req = new XMLHttpRequest(),
  	  version = Date.now(),
	  clientId = 'BSFRMG541RT1SJBWRZ4NPV1F5QQKJ2B1OSMQ0EDTU3NR0ZAX',
	  clientSecret = '4VFLSBVYEQAN0M0XNGERON0LYMSMG1AJRSXXAQURK5GJQBNB',
	  latitude = pos.coords.latitude,
	  longitude = pos.coords.longitude;

  req.open('GET', 'https://api.foursquare.com/v2/venues/search?client_id='+clientId+'&client_secret='+clientSecret+'&v='+version+'&ll='+latitude+','+longitude+'&query=starbucks', true);
  
  req.onload = function(e) {
  	if (req.readyState == 4 && req.status == 200) {
      if (req.status == 200) {
        var response = JSON.parse(req.responseText);
        if (response && response.meta.code == '200' && response.response) {
          var venue = response.response.venues[0];
          Pebble.sendAppMessage({"location": venue.location.address + ', ' + venue.location.city});
        }
      } else {
      	console.log("Error");
      }
    }
  }
  req.send(null);
}

function fetch_location_error(err) {
  console.log(err);
  Pebble.sendAppMessage({"location": "Unable to retrieve location"});
}

Pebble.addEventListener("ready", function(e) {
  locationWatcher = window.navigator.geolocation.watchPosition(fetch_location_data, fetch_location_error, locationOptions);
});