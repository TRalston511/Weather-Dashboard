var searchButton = document.querySelector(".search-btn");
var cityInput = document.querySelector(".city-input")

var getCityCoordinates = () => {
    var cityName = cityInput.value.trim(); //retrieves entered city name
    if(!cityName) return; // return if emtpy

    console.log(cityName)
}


searchButton.addEventListener("click", getCityCoordinates);