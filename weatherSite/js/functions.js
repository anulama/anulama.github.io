/*
 *weather site JavaScript Functions
 ******************************/
//weatehr site JavaScript Functions
//console.log('My javaScrip is being read.');

const temp = 12;
const speed = 2.3;
const phrase = "Cloudy";
const direction = "W"; //Set your own value
//Call function build Wind Chill
buildWC(speed, temp);
//Call function build Wind Dial
windDial(direction);
//call function getCondition
const keyword = getCondition(phrase);
//call funnction change Summary Image
changeSummaryImage(keyword);

// Get location code from API
function getCode(LOCALE) {
    const API_KEY = '2sw5vR3a2FasN7xaGtCVaKAG7adjboWt';
    const URL = 'https://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=' + API_KEY + '&q=' + LOCALE;
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getCode function:');
            console.log(data);
            const locData = {}; // Create an empty object
            locData['key'] = data.Key; // Add the value to the object
            locData['name'] = data.LocalizedName;
            locData['postal'] = data.PrimaryPostalCode;
            locData['state'] = data.AdministrativeArea.LocalizedName;
            locData['stateAbbr'] = data.AdministrativeArea.ID;
            locData['geoposition'] = LOCALE;
            locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
            getWeather(locData);
        })
        .catch(error => console.log('There was a getCode error: ', error))
} // end getCode function

// Get Current Weather data from API
function getWeather(locData) {
    const API_KEY = '2sw5vR3a2FasN7xaGtCVaKAG7adjboWt';
    const CITY_CODE = locData['key']; // We're getting data out of the object
    const URL = "https://dataservice.accuweather.com/currentconditions/v1/" + CITY_CODE + "?apikey=" + API_KEY + "&details=true";
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getWeather function:');
            console.log(data); // Let's see what we got back
            // Start collecting data and storing it
            locData['currentTemp'] = data[0].Temperature.Imperial.Value;
            locData['summary'] = data[0].WeatherText;
            locData['windSpeed'] = data[0].Wind.Speed.Imperial.Value;
            locData['windUnit'] = data[0].Wind.Speed.Imperial.Unit;
            locData['windDirection'] = data[0].Wind.Direction.Localized;
            locData['windGust'] = data[0].WindGust.Speed.Imperial.Value;
            locData['pastLow'] = data[0].TemperatureSummary.Past12HourRange.Minimum.Imperial.Value;
            locData['pastHigh'] = data[0].TemperatureSummary.Past12HourRange.Maximum.Imperial.Value;
            getHourly(locData); // Send data to getHourly function
            buildPage(locData);
        })
        .catch(error => console.log('There was an error: ', error))
} // end getWeather function


// Get next 12 hours of forecast data from API
function getHourly(locData) {
    const API_KEY = '2sw5vR3a2FasN7xaGtCVaKAG7adjboWt';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + CITY_CODE + "?apikey=" + API_KEY;
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log('Json object from getHourly function:');
            console.log(data); // See what we got back
            // Get the first hour in the returned data
            let date_obj = new Date(data[0].DateTime);
            let nextHour = date_obj.getHours(); // returns 0 to 23
            // Store into the object
            locData["nextHour"] = nextHour;
            // Counter for the forecast hourly temps
            var i = 1;
            // Get the temps for the next 12 hours
            data.forEach(function (element) {
                let temp = element.Temperature.Value;
                let hour = 'hourTemp' + i;
                locData[hour] = temp; // Store hour and temp to object
                // New hiTemp variable, assign value from previous 12 hours
                let hiTemp = locData.pastHigh;
                // New lowTemp variable, assign value from previous 12 hours
                let lowTemp = locData.pastLow;
                // Check current forecast temp to see if it is 
                // higher or lower than previous hi or low
                if (temp > hiTemp) {
                    hiTemp = temp;
                } else if (temp < lowTemp) {
                    lowTemp = temp;
                }
                // Replace stored low hi and low temps if they changed
                if (hiTemp != locData.pastHigh) {
                    locData["pastHigh"] = hiTemp; // When done, this is today's high temp
                }
                if (lowTemp != locData.pastLow) {
                    locData["pastLow"] = lowTemp; // When done, this is today's low temp
                }
                i++; // Increase the counter by 1
            }); // ends the foreach method
            console.log('Finished locData object and data:');
            console.log(locData);

            // Send data to buildPage function
        })
        .catch(error => console.log('There was an error: ', error))
} // end getHourly function
// build page function

function buildPage(locData) {
    // Task 1 - Feed data to WC, Dial and Image functions
    console.log("THIS IS MY BUILD PAGE INFO");
    console.log(locData);
    const API_KEY = '2sw5vR3a2FasN7xaGtCVaKAG7adjboWt';
    const CITY_CODE = locData['key'];
    const URL = "https://dataservice.accuweather.com/forecasts/v1/hourly/12hour/" + CITY_CODE + "?apikey=" + API_KEY;
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
            console.log(locData);
            console.log(locData.name);

            //Variable for function use
            const temp = locData.hourTemp1;
            const speed = locData.windSpeed;
            const phrase = locData.summary;
            const direction = locData.windDirection; //Set your own value

            //JSON BASIC INFO CURRENT
            document.getElementById("nameCity").innerHTML = locData.cityabbr;
            document.getElementById("cityAbbr").innerHTML = locData.stateAbbr;
            document.getElementById("zipCode").innerHTML = locData.postal;
            document.getElementById("elevation").innerHTML = locData.elevation;
            document.getElementById("location").innerHTML = locData.geoposition;
            document.getElementById("currenttemp").innerHTML = locData.currentTemp;
            document.getElementById("highTemp").innerHTML = locData.pastHigh;
            document.getElementById("winddirection").innerHTML = locData.windDirection;
            document.getElementById("lowTemp").innerHTML = locData.pastLow;
            document.getElementById("conditionWeather").innerHTML = locData.summary;
            document.getElementById("windgust").innerHTML = locData.windGust;

            //JSON HOURLY TEMP NEXT 12HRS
            var i = 1;
            var d = new Date();
            var n = d.getHours();
            console.log(n);

            var myAside = document.querySelector('aside');
            var myUl = document.createElement('ul');
            myUl.className = "forecasthours"
            data.forEach(function (element) {
                let temp = element.Temperature.Value;
                var myLi = document.createElement('li');
                myLi.textContent = n + 'hrs:' + temp + 'F';
                myUl.appendChild(myLi);
                if (n == 23)
                    n = -1;
                n = n + 1;
                i++; // Increase the counter by 1
            }); // ends the foreach method
            myAside.appendChild(myUl);
            // Task 2 - Populate location information
            /* document.getElementById('city').innerHTML = locData.name + ", " + locData.stateAbbr;*/

            // Task 3 - Populate weather information
            //Call function build Wind Chill
            buildWC(speed, temp);
            //Call function build Wind Dial
            windDial(direction);
            //call function getCondition
            const keyword = getCondition(phrase);
            console.log("keyword");
            console.log(keyword);
             //call the cuntion change summary image
             changeSummaryImage(keyword);
             document.getElementById("status").setAttribute("class", "hide");
             document.getElementById("searchResults").setAttribute("class", "hide");
             document.getElementsByTagName("MAIN")[0].setAttribute("class", "");
 // Task 4 - Hide status and show main
 let status = document.getElementById('status');
 status.setAttribute('class', 'hide');
 let main = document.getElementById('main');
 main.setAttribute('class', 'no');
         })
         .catch(error => console.log('There was an error: ', error))
 
 } 

// Calculate the Windchill

function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');

    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction) {
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
            break;
    }
}


function getCondition(phrase) {
    if (phrase.includes("Cloudy") || phrase.includes("party cloudy") || phrase.includes("overcast")) {
        let keyword = "clouds";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("rain") || phrase.includes("rainny") || phrase.includes("wet weather")) {
        let keyword = "rain";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("snow") || phrase.includes("snowy") || phrase.includes("white weather")) {
        let keyword = "snow";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("fog") || phrase.includes("foggy")) {
        let keyword = "fog";
        console.log(keyword);
        return keyword;
    } else if (phrase.includes("clear") || phrase.includes("sunny")) {
        let keyword = "clear";
        console.log(keyword);
        return keyword;
    }
}


function changeSummaryImage(keyword) {
    const sectionContainer = document.getElementById("sectionContainer");

    switch (keyword) {
        case "clouds":
            sectionContainer.setAttribute("class", "clouds"); //"clouds" is the CSS rule selector
            weatherimage.setAttribute("src", "images/clouds_300.jpg");
            break;
        case "rain":
            sectionContainer.setAttribute("class", "rain");
            weatherimage.setAttribute("src", "images/rain_300.jpg");
            break;
        case "snow":
            sectionContainer.setAttribute("class", "snow");
            weatherimage.setAttribute("src", "images/snow_300.jpg");
            break;
        case "fog":
            sectionContainer.setAttribute("class", "fog");
            weatherimage.setAttribute("src", "images/fog_300.jpg");
            break;
        case "clear":
            sectionContainer.setAttribute("class", "clear");
            weatherimage.setAttribute("src", "images/clear_300.jpg");
            break;
    }
}
 

 // Get location info, based on city key, from API
function getLocationByKey(cityKey) {
    const API_KEY = '2sw5vR3a2FasN7xaGtCVaKAG7adjboWt';
    const URL = 'https://dataservice.accuweather.com/locations/v1/'+cityKey+'?apikey='+API_KEY;
    fetch(URL)
     .then(response => response.json())
     .then(function (data) {
      console.log('Json object from getLocationByKey function:');
      console.log(data);
      const locData = {}; // Create an empty object
      locData['key'] = data.Key; // Add the value to the object
      locData['name'] = data.LocalizedName;
      locData['postal'] = data.PrimaryPostalCode;
      locData['state'] = data.AdministrativeArea.LocalizedName;
      locData['stateAbbr'] = data.AdministrativeArea.ID;
      let lat = data.GeoPosition.Latitude;
      let long = data.GeoPosition.Longitude;
      const LOCALE = lat+', '+long;
      locData['geoposition'] = LOCALE;
      locData['elevation'] = data.GeoPosition.Elevation.Imperial.Value;
      getWeather(locData);
      })
     .catch(error => console.log('There was a getLocationByKey error: ', error))
    } // end getLocationByKey function