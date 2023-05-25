//TA Andrew Truong helped me and several classmates implementing dayjs to format dates

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
  var weatherCard = document.createElement("div");
  //add class here to weatherCard for border and size
  var weatherBody = document.createElement("div");
  //add weatherBody style here
  weatherCard.append(weatherBody);


  var titleEl = document.createElement("h2");
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
  console.log(forecastCall);
  var forecastContainer = document.createElement("div");
  var forecastCard1 = document.createElement("div");
  var forecastCard2 = document.createElement("div");
  var forecastCard3 = document.createElement("div");
  var forecastCard4 = document.createElement("div");
  var forecastCard5 = document.createElement("div");

  var forecastHeaderEl = document.createElement("h3");
  forecastHeaderEl.textContent = "5-Day Forecast:";

  var day1TitleEl = document.createElement("h4");
  var day2TitleEl = document.createElement("h4");
  var day3TitleEl = document.createElement("h4");
  var day4TitleEl = document.createElement("h4");
  var day5TitleEl = document.createElement("h4");

  var day1ContentEl = document.createElement("p");
  var day2ContentEl = document.createElement("p");
  var day3ContentEl = document.createElement("p");
  var day4ContentEl = document.createElement("p");
  var day5ContentEl = document.createElement("p");

  var date1 = dayjs(forecastCall.list[6].dt_txt).format("MM/DD/YYYY");
  var date2 = dayjs(forecastCall.list[14].dt_txt).format("MM/DD/YYYY");
  var date3 = dayjs(forecastCall.list[22].dt_txt).format("MM/DD/YYYY");
  var date4 = dayjs(forecastCall.list[30].dt_txt).format("MM/DD/YYYY");
  var date5 = dayjs(forecastCall.list[38].dt_txt).format("MM/DD/YYYY");
  console.log(date1);
  console.log(date2);
  console.log(date3);
  console.log(date4);
  console.log(date5);

  //NEXT: Create and test day 1 forecast card

  



  forecastContainer.append(forecastHeaderEl);
  fiveDayEl.append(forecastContainer);
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
