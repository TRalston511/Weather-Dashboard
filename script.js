var searchButton = document.querySelector(".search-btn");
var cityInput = document.querySelector(".city-input");
var API_KEY = "02c9368f3f57f52dd91a2a7829833177"; // API KEY for OpenWeatherMap API

var createWeatherCard = (weatherItem) => {
    return `<li class="card">
                <h3>(Time/Date)</h3>
                <h4>Weather Condition:</h4>
                <h4>Temperature:</h4>
                <h4>Wind Speed:</h4>
                <h4>Humidity:</h4> 
            </li>`;
}

var getWeatherDetails = (cityName, lat, lon) => {
    var WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL).then(res => res.json()).then(data => {
  
        // One forecast per day filter
        var uniqueForecastDays = [];
        var fiveDaysForecast = data.list.filter(forecast => {
            var forecastDate = new Date(forecast.dt_txt).getDate();
            if(!uniqueForecastDays.includes(forecastDate)) {
               return uniqueForecastDays.push(forecastDate);
            }
        });

        console.log(fiveDaysForecast);
        fiveDaysForecast.forEach(weatherItem => {
            createWeatherCard(weatherItem);
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