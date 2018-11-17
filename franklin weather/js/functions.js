/*
*weather site JavaScript Functions
******************************/
//weatehr site JavaScript Functions
//console.log('My javaScrip is being read.');

//Variable for function use
const temp = 31;
const speed = 5;
const phrase = "rainny";
const direction = "S"; //Set your own value

//Call function build Wind Chill
buildWC(speed, temp);
//Call function build Wind Dial
windDial(direction);

 // Calculate the Windchill
 
 function buildWC(speed, temp) {
    const feelTemp = document.getElementById('feelTemp');
   
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
   
    // Round the answer down to integer
    wc = Math.floor(wc);
   
    // If chill is greater than temp, return the temp
    wc = (wc > temp)?temp:wc;
   
    // Display the windchill
    console.log(wc);
    // wc = 'Feels like '+wc+'°F';
    feelTemp.innerHTML = wc;
}

// Wind Dial Function
function windDial(direction){
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);
    // Determine the dial class
    switch (direction){
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

//call function getCondition
const keyword = getCondition(phrase);

function getCondition(phrase){
    if(phrase.includes("cloudy") || phrase.includes("party cloudy") || phrase.includes("overcast"))
    {
        let keyword = "clouds";
        console.log(keyword);
        return keyword;
    }
    else if(phrase.includes("rain") || phrase.includes("rainny") || phrase.includes("wet weather")){
        let keyword = "rain";        
        console.log(keyword);
        return keyword;
    }    
    else if(phrase.includes("snow") || phrase.includes("snowy") || phrase.includes("white weather")){
        let keyword = "snow";
        console.log(keyword);
        return keyword;
    }    
    else if(phrase.includes("fog") || phrase.includes("foggy")){
        let keyword = "fog";
        console.log(keyword);
        return keyword;
    }
    else if(phrase.includes("clear") || phrase.includes("sunny")){
        let keyword = "clear";
        console.log(keyword);
        return keyword;
    }
}


//call funnction change Summary Image
changeSummaryImage(keyword);

function changeSummaryImage(keyword){
    const sectionContainer = document.getElementById("sectionContainer");

    switch (keyword){
        case "clouds":
        sectionContainer.setAttribute("class", "clouds"); //"clouds" is the CSS rule selector
         break;
        case "rain":
        sectionContainer.setAttribute("class", "rain");
         break;
        case "snow":
        sectionContainer.setAttribute("class", "snow");
         break;
        case "fog":
        sectionContainer.setAttribute("class", "fog");
         break;
        case "clear":
        sectionContainer.setAttribute("class", "clear");
         break;
       }
}