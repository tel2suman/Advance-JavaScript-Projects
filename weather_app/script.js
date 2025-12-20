
const cityElement = document.querySelector(".location-text");

const tempElement = document.querySelector(".temparature-text");

const windElement = document.querySelector(".windspeed-text");

const humidityElement = document.querySelector(".humidity-text");

const visibilityElement = document.querySelector(".visibility-text");

const descriptionElement = document.querySelector(".condition-text");

const dateElement = document.querySelector(".current-date-text");

const formElement = document.querySelector(".search-form");

const inputElement = document.querySelector(".location-input");

const descriptionIcon = document.querySelector(".weather-temparature-img");

const forecastElement = document.querySelector(".forecast-items-section");

const feelsElement = document.querySelector(".feels-text");

const pressureElement = document.querySelector(".pressurespeed-text");

const maxTempElement = document.querySelector(".max-temp-text");


const apiKey = `c19e9606ed0652469e45e68d74b0ecab`;

const city = "Pune";

// fetch Weather API data
async function fetchWeatherData(city_name) {
    try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) throw new Error ("Network Error");

          const data = await response.json()

        fetchWeatherForeacast(city_name);

        showWeatherUi(data);

    } catch (error) {

      console.error("Error", error);

      document.querySelector(
        ".weather-info"
      ).innerHTML = `<p class="text-danger">No Data Found</p>`;
    }
}

//fetchWeatherData();


// Show data on UI functionality
function showWeatherUi(data) {

    cityElement.textContent = data.name;

    tempElement.textContent = `${Math.round(data.main.temp)} °C`;

    windElement.textContent = `${Math.round(data.wind.speed)} Km/h`;

    humidityElement.textContent = `${data.main.humidity} %`;

    visibilityElement.textContent = `${data.visibility/1000} Km`;

    descriptionElement.textContent = `${data.weather[0].description}`

    feelsElement.textContent = `${Math.round(data.main.feels_like)} °C`;

    pressureElement.textContent = `${(data.main.pressure)} hpa`;

    maxTempElement.textContent = `${Math.round(data.main.temp_max)} °C`;

    const currentDate = new Date();

    dateElement.textContent = `${currentDate.toDateString()}`

    const weatherIconName = getWeatherIcon(data.weather[0].main);

    descriptionIcon.src = `assets/weather/${(weatherIconName)}`;
}

// search Form functionality
formElement.addEventListener('submit', function(e){

  e.preventDefault();

  const city_name = inputElement.value;

  if (city_name !== '') {

    fetchWeatherData(city_name);

    inputElement.value = "";
  }

  const weatherinfo = document.querySelector(".weather-info");

  if (city_name.length === 0) {

    weatherinfo.innerHTML = `<h4>No Data Found</h4>`

    inputElement.value = "";
  }

})

fetchWeatherData(city);

// fetch weather Icons
function getWeatherIcon(weatherconditions) {

  const iconMap = {
    Clear: "clear.svg",
    Clouds: "clouds.svg",
    Rain: "rain.svg",
    Drizzle: "drizzle.svg",
    Snow: "snow.svg",
    Smoke: "atmosphere.svg",
    ThunderStrom: "thunderstorm.svg",
    Mist: "clouds.svg",
    Haze: "atmosphere.svg",
    Fog: "atmosphere.svg",
  };

  return iconMap[weatherconditions];
}

// fetch Weather API data
async function fetchWeatherForeacast(city_name) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) throw new Error("Network Error");

    const data = await response.json();

    //console.log(data);

    const timeTaken = '12:00:00';

    const todayDate = new Date().toISOString().split();

    forecastElement.innerHTML = ``

    data.list.forEach(forecastWeather => {

      if ( forecastWeather.dt_txt.includes(timeTaken) &&

        !forecastWeather.dt_txt.includes(todayDate))

        updateForecastItems(forecastWeather);

      });

  } catch (error) {
    console.error("Error", error);
  }
}

//update Forecast Items
function updateForecastItems(weatherData) {

  //console.log(weatherData);

  getWeatherIcon(weatherData);

    const {
      dt_txt: date,
      main: {temp}
    } = weatherData

    const weatherIconName = getWeatherIcon(weatherData.weather[0].main);

    const dateTaken = new Date(date)

    const dateOption = {
      day: '2-digit',
      month: 'short'
    }

    const dateResult = dateTaken.toLocaleString('en-US', dateOption)

    const forecastItem = `<div class="forecast-item">
      <h5 class="forecast-item-date regular-text">${dateResult}</h5>
      <img src="assets/weather/${weatherIconName}" alt="" class="forecast-item-img">
      <h5 class="forecast-item-temp">${Math.round(temp)} °C</h5>
    </div>`;

  forecastElement.insertAdjacentHTML('beforeend', forecastItem);

}