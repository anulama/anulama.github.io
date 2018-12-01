'use strict';

// Call the function to get our location
getGeoLocation();

// URL to request city data using latitude and longitude
// 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=2sw5vR3a2FasN7xaGtCVaKAG7adjboWt&q='+ LOCALE     

// Gets longitude and latitude of current location
function getGeoLocation() {
    const STATUS = document.getElementById('status');
    STATUS.innerHTML = 'Getting Location...';

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const LAT = position.coords.latitude;
            const LONG = position.coords.longitude;

            // Combine the values
            const LOCALE = LAT + "," + LONG;
            console.log(`Lat and Long are: ${LOCALE}.`);

            // Call getCode function, send locale
            getCode(LOCALE);
        })
    } else {
        STATUS.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
    } // end else
} //end getGeoLocation

