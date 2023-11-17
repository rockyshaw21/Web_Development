// Required Elements
const userWeatherTab = document.querySelector("#userWeatherTab");
const searchWeatherTab = document.querySelector("#searchWeatherTab");

// -- Frames --
const searchCityFrame = document.querySelector("[data-searchWeatherFormContainer]");
const locationPermissionFrame = document.querySelector("[data-locationTakerFrame]");
const userWeatherFrame = document.querySelector("[data-userWeatherDisplayContainer]");

// Grant Access Button
const grantAccessButton = document.querySelector("#locationTakerButton")

// User Frame Data Div's
var userCity = document.querySelector(".userCityName");
var userCountryFlag = document.querySelector(".userCountryFlag");
var userWeather = document.querySelector(".userWeather");
var weatherImage = document.querySelector(".imageAccordingToWeather");
var userTemperature = document.querySelector(".temperature");
var userWindspeedData = document.querySelector("#userWindspeedData");
var userHumidityData = document.querySelector("#userHumidityData");
var userCloudData = document.querySelector("#userCloudData");


// Required Variables
var API_KEY ="8d391f28f5d942fda08150321230508";
var userLattitude = 0;
var userLongitude = 0;

getUserLocation();

// -- Default Case Scenario ---
let currentTab = userWeatherTab;
currentTab.classList.add("tabStyle");
locationPermissionFrame.classList.add("active");

// this function opens city search Frame
function openSearchFrame(){
    locationPermissionFrame.classList.remove("active");
    userWeatherFrame.classList.remove("active");
    searchCityFrame.classList.add("active");
}

function openLocationPermissionFrame(){
    userWeatherFrame.classList.remove("active");
    searchCityFrame.classList.remove("active");
    locationPermissionFrame.classList.add("active");
}

function openUserWeatherFrame(){
    locationPermissionFrame.classList.remove("active");
    searchCityFrame.classList.remove("active");
    userWeatherFrame.classList.add("active");
}

function switchTab(currentTab){
    if(currentTab !== userWeatherTab){
        userWeatherTab.classList.remove("tabStyle");
        searchWeatherTab.classList.add("tabStyle");
        openSearchFrame();
    }
    else{
        searchWeatherTab.classList.remove("tabStyle")
        currentTab.classList.add("tabStyle");
        if(userLattitude===0 && userLongitude===0){
            openLocationPermissionFrame();
        }
        else{
            openUserWeatherFrame();
        }
    }
}

// this function takes user lattitude & longitude
function getUserLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position)=>{
            userLattitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
        })
    }
}


// get weather info with Lattitude & Longitude
async function getUserWeather(){
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=8d391f28f5d942fda08150321230508&q=${userLattitude},${userLongitude}&aqi=no`);
        const result = await response.json();
        return result;
    }
    catch(e){
        console.log("Error aaye hai !!!" + e);
    }
}

// this function displays useer tab data's
function displayUserData(){
    getUserWeather().then((data)=>{
        console.log(data);
        userCity.innerHTML = data?.location?.name;
        userWeather.innerHTML = data?.current?.condition?.text;
        userTemperature.innerHTML = data?.current?.temp_c + " ºC";

        userWindspeedData.innerHTML = data?.current?.wind_kph + " Km/Hour";
        userHumidityData.innerHTML = data?.current?.humidity + " %";
        userCloudData.innerHTML = data?.current?.cloud + " %";

    })
}

userWeatherTab.addEventListener('click',() =>{
    currentTab = userWeatherTab;
    switchTab(currentTab);
})

searchWeatherTab.addEventListener('click',()=>{
    currentTab = searchWeatherTab;
    switchTab(currentTab);
})

grantAccessButton.addEventListener('click',()=>{
    openUserWeatherFrame();
    // getUserWeather();
    displayUserData();
})















