
/**
 * Used to setup my page and call the other functions that will 
 * set the default background and have an eventlistener that will execute when the
 * user presses the button
 * It is called once when the script is loaded
 */
function init () {
    let body = document.getElementsByTagName('body')[0];
    body.className = 'background-warm';
    
    document.getElementById('showWeatherOnClick').addEventListener('click', clickWeatherButton);  
}

/**
 * When the user clicks the weather button the functions to get coordinates, weather and display
 * output are called. If the user presses the button multiple times the previous temperature icon will 
 * disapear
 */
async function clickWeatherButton() {
    document.getElementById('low-temp').style.display = 'none';
    document.getElementById('high-temp').style.display = 'none';
    document.getElementById('neutral-temp').style.display = 'none';


    let city = document.getElementById('city').value;
    let coordinates = await getCoordinates(city);
    let weatherInfo = await getWeather(coordinates);
    displayTemperature(weatherInfo);
    displayCity(city);    
}

/**
 * Making a AJAX request to fetch the location data from the API
 * Returns an object with longitude and lattitude
 */
async function getCoordinates (city) {
    let coordinates = {};
    await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=8e741e5447944515dd0d2a32ea8269a0`)
    .then((response) => response.json())
    .then((data) => {
        coordinates.latitude = data[0].lat;
        coordinates.longitude = data[0].lon;
    });

    return coordinates;
}

/**
 * Making an AJAX call to fetch the weather data by using the coordinates from getCoordinates
 * The unit used for degrees will be Celsius 
 */
async function getWeather (coordinates) {
    let weatherInfo = {};
    await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=8e741e5447944515dd0d2a32ea8269a0`)
    .then((response) => response.json())
    .then((data) => {
        weatherInfo.weatherDescription = data.weather[0].description;
        weatherInfo.temperature = data.main.temp;
    });

    return weatherInfo;
}

/**
 * Displays the weather information for the user and changes the background and termometer
 * icon based on the current temperature
 */
function displayTemperature (weather) {
    let temperatureInfo = document.getElementById('temperatureInfo');
    let description = weather.weatherDescription;
    let temperature = weather.temperature;
    temperatureInfo.innerHTML = `${Math.floor(temperature)}&#176;C ${description}`;     //using innerHTML to get the degree symbol
    
    let body = document.getElementsByTagName('body')[0];
    if (temperature >= 15) {
        body.className = 'background-warm';
        document.getElementById('high-temp').style.display = 'block';
    } else if (temperature <= 0) {
        body.className = 'background-cold';
        document.getElementById('low-temp').style.display = 'block';        
    } else {
        body.className = 'background-neutral';
        document.getElementById('neutral-temp').style.display = 'block';

    }
}

/**
 * Displays the current city to the user and formats the first letter to upper case 
 */
function displayCity (city) {
    let cityText = document.getElementById('weatherInfo');
    let country = '';
    if (city === 'batman') {
        country = 'Turkey'
    } else if (city === 'borås') {
        country = 'Sweden';
    } else if (city === 'chicken' || city === 'hell') {
        country = 'USA';
    } else if (city === 'boring') {
        country = 'Denmark';
    }

    cityText.textContent = `The local weather in ${city.charAt(0).toUpperCase() + city.slice(1)}, ${country}`;
}

init();