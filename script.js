
var currentCity = document.getElementById('currentCity')
var burbankBtn = document.getElementById('burbank')
var chicagoBtn = document.getElementById('chicago')
var dallasBtn = document.getElementById('dallas')
var holder = document.getElementById('holder')
var e = document.getElementById("tempF-C");
var value = e.options[e.selectedIndex].value;
var cookies = document.getElementById('cookies')
var cSanJoseHigh = [24, 27, 21, 26]
var cHigh
var cSanJoseLow = [18, 19, 16, 21]
var cLow
var cBurbankHigh = [23, 23, 27, 21]
var cBurbankLow = [11, 14, 12, 9]
var cChicagoHigh = [9, 14, 3, 4]
var cChicagoLow = [8, -1, -3, 1]
var cDallasHigh = [27, 16, 17, 18]
var cDallasLow = [17, 7, 2, 6]
var tempCity
let data


//Accuweather keycode hGQA3833XeHWWUSMtO5lGgABACyVJ9VD
// Kelvin to Celsius: C = K - 273 (C = K - 273.15 if you want to be more precise)
// Kelvin to Fahrenheit: F = 9/5(K - 273) + 32 or F = 1.8(K - 273) + 32.
// Celsius to Fahrenheit: F = 9/5(C) + 32 or F = 1.80(C) + 32.
// Celsius to Kelvin: K = C + 273 (or K = C + 271.15 to be more precise)
async function getCurrentWeather(city) {
    var response = await fetch("https://yahoo-weather5.p.rapidapi.com/weather?location=" + city + "&format=json&u=c", {

        "method": "GET",
        "headers": {
            "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
            "x-rapidapi-key": "f2edd53b8cmsh2e6ed2306fe8cc6p11d225jsn02d97e90c363"
        }
    })
    data = await response.json();
    console.log(data)

}

function hide() {
    cookies.classList.add('hide')
}
async function changeCity(element) {
    await getCurrentWeather(element.innerText)
    alert('You have selected the city of  ' + element.innerText + '.')
    tempCity = currentCity.innerText
    currentCity.innerText = data.location.city
    element.innerText = tempCity
    changeTemp()
}
function changeTemp(element) {
    changeWeatherPIC()
    var highs = document.getElementsByClassName('high')
    var lows = document.getElementsByClassName('low')
    console.log(highs)
    value = e.options[e.selectedIndex].value;
    if (value == "c") {
        for (let i = 0; i < highs.length; i++) {
            highs[i].innerText = data.forecasts[i].high + "°"
            lows[i].innerText = data.forecasts[i].low + "°"
        }
    } else if (value == "f") {
        for (let i = 0; i < highs.length; i++) {
            highs[i].innerText = Math.floor((data.forecasts[i].high * 9 / 5) + 32) + "°"
            lows[i].innerText = Math.floor((data.forecasts[i].low * 9 / 5) + 32) + "°"
        }
        // }
    }
}
async function onStart(element) {
    if (element.innerText == "San Jose") {
        console.log(currentCity)
        await getCurrentWeather(currentCity.innerText)
        changeTemp(element.innerText)
        
    }
}
onStart(currentCity)

async function getInput(element) {
    var input = document.getElementById('input').value
    console.log(input)
    console.log(currentCity)
    await getCurrentWeather(input)
    currentCity.innerText = data.location.city
    changeTemp(input)
    
}

function changeWeatherPIC() {
    let pic = document.getElementsByClassName('pic')
    let weather = document.getElementsByClassName('weather')
    for (let i = 0; i < pic.length; i++) {
        weather[i].innerText = data.forecasts[i].text
        pic[i].alt = data.forecasts[i].text
        if (data.forecasts[i].text == "Mostly Cloudy" || data.forecasts[i].text == "Partly Cloudy" || data.forecasts[i].text == "Cloudy") {
            pic[i].src = "./assets/some_clouds.png"
        }
        else if (data.forecasts[i].text == "Sunny" || data.forecasts[i].text == "Mostly Sunny") {
            pic[i].src = "./assets/some_sun.png"


        } else if (data.forecasts[i].text == "Rain" || data.forecasts[i].text == "Scattered Showers") {
            pic[i].src = "./assets/some_rain.png"
        }

    }
}