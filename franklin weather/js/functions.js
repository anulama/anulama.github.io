/*
*weather site JavaScript Functions
******************************/
//weatehr site JavaScript Functions

console.log('My javaScrip is being read.');
//Variable for function use
const temp = 31;
const speed = 5;
buildWC(speed, temp);
//calculate the windhill
function buildWC(speed, temp){

const feelTemp= document.getElementById('feelTemp');
//compute the windchill
let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
 console.log(wc);

//Round the answer down to integer
wc= Math.floor(wc);

// If chill is greater than temp, return the temp
wc= (wc>temp)?temp:wc;

// Display the windchill
console.log(wc);

// wc= 'feel like '+wc+'F';
feelTemp.innerHTML = wc;
}