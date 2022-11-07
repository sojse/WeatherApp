
/**
 * Used to setup my page and call the other functions that will 
 * get the coordinates and the weather data
 * It is called once when the script is loaded
 */
function init () {
    /**
     * TODO
     *  1. Ladda sidan
     *  2. Hämta koordinater
     *  3. Hämta väder
     *  4. Uppdatera sidan
     */

    let coordinates = getCoordinates();
    let weatherInfo = getWeather(coordinates);
}

/**
 * Making a AJAX request to get the location data from the API
 * Returns an object with longitude and lattitude
 */
function getCoordinates() {
    //Ajax object constructor that will be used to construct a new HTTP request
    let request = new XMLHttpRequest();
    let coordinates = {};

    // False means that the request will be synchronous, meaning the data is fully retrieved before the rest of the code runs
    request.open('GET', 'http://api.openweathermap.org/geo/1.0/direct?q=Malmö&appid=8e741e5447944515dd0d2a32ea8269a0', false);

    //To make the data available to us I add an eventlistener that waits for the data to load
    request.addEventListener('load', () => {
        //Checks if the request was successfull and if it is ready
        if (request.status === 200 && request.readyState === 4) {
            let result = JSON.parse(request.responseText);
            coordinates.lattitude = result[0].lat;
            coordinates.longitude = result[0].lon;
        } else {
            throw new Error('Bad request');
        }
    })

    request.send();
    return coordinates;
}

/**
 * Making an AJAX call to get the weather data by using the coordinates from getCoordinates
 * The unit used for degrees will be Celsius 
 */
function getWeather(coordinates) {
    let request = new XMLHttpRequest();
    let weatherInfo = {};

    request.open('GET', `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lattitude}&lon=${coordinates.longitude}&units=metric&appid=8e741e5447944515dd0d2a32ea8269a0`, false);

    request.addEventListener('load', () => {
        //Checks if the request was successfull and if it is ready
        if (request.status === 200 && request.readyState === 4) {
            let result = JSON.parse(request.responseText);
            weatherInfo.weatherDescription = result.weather[0].description;
            weatherInfo.temperature = result.main.temp;
        } else {
            throw new Error('Bad request');
        }
    })

    request.send();
    return weatherInfo;
}


init();