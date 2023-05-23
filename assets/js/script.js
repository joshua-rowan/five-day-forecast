var APIKey = "667c2def329f02a09cd4ba7bed05e4c6";
var citySearch = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");
var currentWeatherEl = document.getElementById("current-weather");
var fiveDayEl = document.getElementById("5-day-fore");

//API 1 call to convert city name into coordinates
function getCoordinates(cityName){
    var geocodeUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid="+APIKey;
    fetch(geocodeUrl)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        //define latitude and longitude. Data above returns array of single object. to point data to lat and lon need [0] to specify row.
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;
        getForecast(cityLat, cityLon);
      });
}

function weatherToday(weatherCall) {
  console.log(weatherCall);
  console.log(weatherCall.city.name);
  console.log(weatherCall.list[0].dt_txt);
  console.log(weatherCall.list[0].weather[0].icon);
  console.log(weatherCall.list[0].main.temp);
  console.log(weatherCall.list[0].wind.speed);
  console.log(weatherCall.list[0].main.humidity);
  var weatherCard = document.createElement("div");
  //add class here to weatherCard for border and size
  var weatherBody = document.createElement("div");
  //add weatherBody style here
  weatherCard.append(weatherBody);


  var titleEl = document.createElement("h3");
  var date = dayjs(weatherCall.list[0].dt_txt).format("MM/DD/YYYY");
  titleEl.innerHTML = weatherCall.city.name + " (" + date + ")" + weatherCall.list[0].weather[0].icon;

  var weatherContentEl = document.createElement("p");
  weatherContentEl.innerHTML = "Temp: " + weatherCall.list[0].main.temp + " F" + "<br/>";

  weatherContentEl.innerHTML += "Wind: " + weatherCall.list[0].wind.speed + " mph" + "<br/>";

  weatherContentEl.innerHTML += "Humidity: " + weatherCall.list[0].main.humidity + " %" + "<br/>";

  weatherBody.append(titleEl, weatherContentEl);
  currentWeatherEl.append(weatherCard);
}

function displayForecast(forecastCall) {
  
}

function getForecast(lat, lon) {
  var fiveDayForecastUrl = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
  fetch(fiveDayForecastUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    weatherToday(data);
    displayForecast(data);
  })
}

searchBtn.addEventListener("click", function(){
    var city=citySearch.value;
    getCoordinates(city);
});

//var date = dayjs(weatherData.gt_txt)format(MM/DD/YYYY)