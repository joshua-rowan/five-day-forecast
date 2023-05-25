//TA Andrew Truong helped me and several classmates implementing dayjs to format dates

var APIKey = "667c2def329f02a09cd4ba7bed05e4c6";
var citySearch = document.getElementById("city");
var searchBtn = document.getElementById("search-btn");
var currentWeatherEl = document.getElementById("current-weather");
var fiveDayEl = document.getElementById("5-day-fore");
var searchSectionEl = document.getElementById("search-section");
var forecastSectionEl = document.getElementById("forecast-section");
var getWeatherEl = document.getElementById("get-weather");

getWeatherEl.classList.add("columns");
searchSectionEl.classList.add("column", "is-one-quarter");
forecastSectionEl.classList.add("column", "is-three-quarters");

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
  currentWeatherEl.classList.add("box", "mr-4");
  var weatherCard = document.createElement("div");
  weatherCard.classList.add("is-align-items-center")
  var weatherBody = document.createElement("div");
  weatherCard.append(weatherBody);


  var titleEl = document.createElement("h2");
  titleEl.classList.add("title", "is-size-3", "has-text-weight-bold")
  var iconCode = weatherCall.list[0].weather[0].icon;
  var weatherIconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
  var date = dayjs(weatherCall.list[0].dt_txt).format("MM/DD/YYYY");
  titleEl.innerHTML = weatherCall.city.name + " (" + date + ")" + "<img src='" + weatherIconUrl + "'>";

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
  forecastCard1.classList.add("column");
  forecastCard2.classList.add("column");
  forecastCard3.classList.add("column");
  forecastCard4.classList.add("column");
  forecastCard5.classList.add("column");

  var forecastHeaderEl = document.createElement("h3");
  forecastHeaderEl.classList.add("columns");
  forecastHeaderEl.textContent = "5-Day Forecast:";

  var day1TitleEl = document.createElement("h4");
  var day2TitleEl = document.createElement("h4");
  var day3TitleEl = document.createElement("h4");
  var day4TitleEl = document.createElement("h4");
  var day5TitleEl = document.createElement("h4");

  var iconCode1 = forecastCall.list[6].weather[0].icon;
  var forecast1IconUrl = "https://openweathermap.org/img/wn/" + iconCode1 + ".png";
  var iconCode2 = forecastCall.list[14].weather[0].icon;
  var forecast2IconUrl = "https://openweathermap.org/img/wn/" + iconCode2 + ".png";
  var iconCode3 = forecastCall.list[22].weather[0].icon;
  var forecast3IconUrl = "https://openweathermap.org/img/wn/" + iconCode3 + ".png";
  var iconCode4 = forecastCall.list[30].weather[0].icon;
  var forecast4IconUrl = "https://openweathermap.org/img/wn/" + iconCode4 + ".png";
  var iconCode5 = forecastCall.list[38].weather[0].icon;
  var forecast5IconUrl = "https://openweathermap.org/img/wn/" + iconCode5 + ".png";

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

  day1TitleEl.textContent = date1;
  day2TitleEl.textContent = date2;
  day3TitleEl.textContent = date3;
  day4TitleEl.textContent = date4;
  day5TitleEl.textContent = date5;

  day1ContentEl.innerHTML = "<img src='" + forecast1IconUrl + "'>" + "<br/>";
  day1ContentEl.innerHTML += "Temp: " + forecastCall.list[6].main.temp + " F" + "<br/>";
  day1ContentEl.innerHTML += "Wind: " + forecastCall.list[6].wind.speed + " mph" + "<br/>";
  day1ContentEl.innerHTML += "Humidity: " + forecastCall.list[6].main.humidity + " %" + "<br/>";

  day2ContentEl.innerHTML = "<img src='" + forecast2IconUrl + "'>" + "<br/>";
  day2ContentEl.innerHTML += "Temp: " + forecastCall.list[14].main.temp + " F" + "<br/>";
  day2ContentEl.innerHTML += "Wind: " + forecastCall.list[14].wind.speed + " mph" + "<br/>";
  day2ContentEl.innerHTML += "Humidity: " + forecastCall.list[14].main.humidity + " %" + "<br/>";

  day3ContentEl.innerHTML = "<img src='" + forecast3IconUrl + "'>" + "<br/>";
  day3ContentEl.innerHTML += "Temp: " + forecastCall.list[22].main.temp + " F" + "<br/>";
  day3ContentEl.innerHTML += "Wind: " + forecastCall.list[22].wind.speed + " mph" + "<br/>";
  day3ContentEl.innerHTML += "Humidity: " + forecastCall.list[22].main.humidity + " %" + "<br/>";

  day4ContentEl.innerHTML = "<img src='" + forecast4IconUrl + "'>" + "<br/>";
  day4ContentEl.innerHTML += "Temp: " + forecastCall.list[30].main.temp + " F" + "<br/>";
  day4ContentEl.innerHTML += "Wind: " + forecastCall.list[30].wind.speed + " mph" + "<br/>";
  day4ContentEl.innerHTML += "Humidity: " + forecastCall.list[30].main.humidity + " %" + "<br/>";

  day5ContentEl.innerHTML = "<img src='" + forecast5IconUrl + "'>" + "<br/>";
  day5ContentEl.innerHTML += "Temp: " + forecastCall.list[38].main.temp + " F" + "<br/>";
  day5ContentEl.innerHTML += "Wind: " + forecastCall.list[38].wind.speed + " mph" + "<br/>";
  day5ContentEl.innerHTML += "Humidity: " + forecastCall.list[38].main.humidity + " %" + "<br/>";

  forecastCard1.append(day1TitleEl, day1ContentEl);
  forecastCard2.append(day2TitleEl, day2ContentEl);
  forecastCard3.append(day3TitleEl, day3ContentEl);
  forecastCard4.append(day4TitleEl, day4ContentEl);
  forecastCard5.append(day5TitleEl, day5ContentEl);
  forecastContainer.append(forecastHeaderEl, forecastCard1, forecastCard2, forecastCard3, forecastCard4, forecastCard5);
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
