var APIKey = "667c2def329f02a09cd4ba7bed05e4c6"
var citySearch = document.getElementById("city");
var searchBtn = document.getElementById("search-btn")
//API 1 call to convert city name into coordinates
function getCoordinates(cityName){
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid="+APIKey;
    console.log(geocodeUrl);
    fetch(geocodeUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
        console.log(cityLat, cityLon);
      });
      
}

//above currently gets 'object' with many keys including 'lat' and 'lon'
//get the lat and lon keys so that I can send them to weather for forecast
//API 2 takes the cooridinates and gets the weather

searchBtn.addEventListener("click", function(){
    var city=citySearch.value;
    getCoordinates(city);

});

