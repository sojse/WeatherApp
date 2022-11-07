
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
}

/**
 * Making a AJAX request to get the data from the API
 */
function getCoordinates() {
    //Ajax object constructor that will be used to construct a new HTTP request
    let xmlHttp = new XMLHttpRequest();
    let coordinates = {};

    xmlHttp.open('GET', 'http://api.openweathermap.org/geo/1.0/direct?q=Malmö&appid=8e741e5447944515dd0d2a32ea8269a0');

    //To make the data available to us I add an eventlistener that waits for the data to load
    xmlHttp.addEventListener('load', () => {
        //Checks if the request was successfull and if it is ready
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            let result = JSON.parse(xmlHttp.responseText);
            coordinates.lattitude = result[0].lat;
            coordinates.longitude = result[0].lon;

        } else {
            throw new Error('Bad request');
        }
    })

    xmlHttp.send();
    return coordinates;
}

init();