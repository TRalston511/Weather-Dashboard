var searchButton = document.querySelector(".search-btn");
var cityInput = document.querySelector(".city-input");
var weatherCardDiv = document.querySelector(".weather-cards");
var currentWeatherDiv = document.querySelector(".current-weather")
var API_KEY = "02c9368f3f57f52dd91a2a7829833177"; // API KEY for OpenWeatherMap API

var createWeatherCard = (cityName, weatherItem, index) => {
    if(index === 0){ // Main Card
        return ` <div class="detail">
                    <h2>${cityName} (${weatherItem.dt_txt.split(" ")[0]})</h2>
                    <h4>Temperature:${(weatherItem.main.temp - 273.15).toFixed(2)}C</h4>
                    <h4>Wind Speed:${weatherItem.wind.speed}M/S</h4>
                    <h4>Humidity:${weatherItem.main.humidity}%</h4>
                </div>
                <div class="weather-condition">
                    <h4>${weatherItem.weather[0].description}</h4>
                </div>`;
    } else { // Five Day Forecast Card 
    return `<li class="card">
                <h3>(${weatherItem.dt_txt.split(" ")[0]})</h3>
                <h4>Temperature:${(weatherItem.main.temp - 273.15).toFixed(2)}C</h4>
                <h4>Wind Speed:${weatherItem.wind.speed}M/S</h4>
                <h4>Humidity:${weatherItem.main.humidity}%</h4>
                <h4>${weatherItem.weather[0].description}</h4>
            </li>`;
    }
}

var getWeatherDetails = (cityName, lat, lon) => {
    var WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
  
        // One forecast per day filter
        var uniqueForecastDays = [];
        var fiveDaysForecast = data.list.filter(forecast => {
            var forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
               return uniqueForecastDays.push(forecastDate);
            }
        });

        // Clearing previous cards
        cityInput.value = "";
        weatherCardDiv.innerHTML = "";
        currentWeatherDiv.innerHTML = "";

        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach((weatherItem, index)=> {
            if(index === 0){
                currentWeatherDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            } else {
                weatherCardDiv.insertAdjacentHTML("beforeend", createWeatherCard(cityName, weatherItem, index));
            }
        });
    })
}

var getCityCoordinates = () => {
    var cityName = cityInput.value.trim(); //retrieves entered city name
    if(!cityName) return; // return if emtpy
    var GEOCODING_API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

    // get city lat, lon, and name
    fetch(GEOCODING_API_URL).then(res => res.json()).then(data => {
        if(!data.length) return alert("No coordinates found");
        var { name, lat, lon} = data[0];
        getWeatherDetails(name, lat, lon);
    }).catch(() => {
        alert("An error occured");
    });
}


searchButton.addEventListener("click", getCityCoordinates);