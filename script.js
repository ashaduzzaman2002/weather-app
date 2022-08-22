// Api key 
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '644a632a82msha1903bea456c7c6p1bb6b6jsn2f02771939d0',
    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
  }
};


// get data function 
const getData = (city) => {

  return (fetch(`https://weatherapi-com.p.rapidapi.com/current.json?q=${city}`, options)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      weather.innerHTML = `${err.message}`
    }));
}


const getForecast = (city, date) => {
  return (fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${city}&days=3&dt=${date}`, options)
    .then(response => response.json())
    .then(data => data)
    .catch(err => {
      weather.innerHTML = `${err.message}`
    }));
}


// All query selectors
const weather = document.querySelector('.weather')
const searchBtn = document.getElementById('searchBtn')
const weatherDetails = document.querySelector('.weather_details_box')
const serachInput = document.getElementById('serachInput')
const forecastBox = document.querySelector('.forecast_box')
const maxTemp = document.getElementById('maxTemp')
const minTemp = document.getElementById('minTemp')
const conditionDetails = document.getElementById('condition')
const cloudy = document.getElementById('cloudy')
const humidity = document.getElementById('humadity')
const wind = document.getElementById('wind')



// Data and months list 
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sutarday']
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Formt date function 
const formatDate = (input) => {
  var datePart = input.match(/\d+/g),
    year = datePart[0]
  let month = datePart[1], day = datePart[2];

  return month + ' ' + day + ', ' + year;
}

// Change background according to weather and time 
const setCondition = (data) => {
  let isDay = 'day'
  if (!data.current.is_day) {
    isDay = 'night'
  }
  let code = data.current.condition.code

  if (code == 1000) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),  url('images/${isDay}/clear.jpg')`;
    searchBtn.background = '#e5ba92'
    if (isDay == 'night') {
      searchBtn.style.background = '#181e27'
    }
  }
  else if (
    code == 1003 ||
    code == 1006 ||
    code == 1009 ||
    code == 1030 ||
    code == 1069 ||
    code == 1087 ||
    code == 1135 ||
    code == 1273 ||
    code == 1276 ||
    code == 1279 ||
    code == 1282
  ) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),  url('images/${isDay}/cloudy.jpg')`;
    searchBtn.style.background = '#fa6d1b'
    if (isDay == 'night') {
      searchBtn.style.background = '#181e27'
    }
  }
  else if (
    code == 1063 ||
    code == 1069 ||
    code == 1072 ||
    code == 1150 ||
    code == 1153 ||
    code == 1180 ||
    code == 1183 ||
    code == 1186 ||
    code == 1189 ||
    code == 1192 ||
    code == 1195 ||
    code == 1205 ||
    code == 1207 ||
    code == 1240 ||
    code == 1243 ||
    code == 1246 ||
    code == 1249 ||
    code == 1252
  ) {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),  url('images/${isDay}/rainy.jpg')`;
    searchBtn.style.background = '#647d75'
    if (isDay == 'night') {
      searchBtn.style.background = '#325c80'
    }
  }
  else {
    document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)),  url('images/${isDay}/snowy.jpg')`;
    searchBtn.background = '#4d72aa'
    if (isDay == 'night') {
      searchBtn.style.background = '#1b1b1b'
    }
  }
  return isDay
}

// show time function
const showData = async (data) => {
  console.log(data)
  let time = data.location.localtime.split(' ')[1]
  let date = formatDate(data.location.localtime.split(' ')[0])
  let location = data.location.name
  const d = new Date(date);
  let day = days[d.getDay()]
  let mm = months[d.getMonth()];
  let dd = d.getDate()
  let temp = data.current.temp_c
  let condition = data.current.condition.text
  let iconUrl = data.current.condition.icon.split('/')
  let icon = iconUrl[iconUrl.length - 1]
  let isDay = setCondition(data)
  console.log(location)
  let forecast = await getForecast(location,'date')
  let forecastData = forecast.forecast.forecastday[0].day
  console.log(forecast)

  weather.innerHTML = `<div id="lds-ring"><div></div><div></div><div></div><div></div></div>`
  setTimeout(() => {
    weather.innerHTML = `<h1 class="temp">${temp}&#176;</h1>
    <div class="city_time">
      <h1 class="name">${data.location.name}</h1>
      <small>
        <span class="time">${time}</span>
        <span class="date">${day} ${mm} ${dd}</span>
      </small>
    </div>
    <div class="weather_icon">
      <img
        src="./icons/${isDay}/${icon}"
        class="icon"
        alt="icon"
        width="50"
        height="50"
      />
      <small class="condition">${condition}</small>
    </div>`

  cloudy.innerText = `${data.current.cloud}%`
  humidity.innerText = `${data.current.humidity}%`
  wind.innerText = `${data.current.wind_kph}km/h`

  minTemp.innerText = `${forecastData.mintemp_c}°`
  conditionDetails.innerText = `${forecastData.condition.text}`
  maxTemp.innerText = `${forecastData.maxtemp_c}°`
  },500)
}


searchBtn.onclick = async () => {
  let city = serachInput.value
  let data = await getData(city)
  console.log(data)
  showData(data)
}