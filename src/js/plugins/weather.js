import config from '../components/configLoader';
import { storageAvailable, addToDefaultPluginDOM } from '../components/helpers';


const pluginConfig = config.plugins.find(obj => obj.name === 'weather');


// DOM setup
const pluginId = 'js-plugin-weather';
addToDefaultPluginDOM(pluginId);
const weatherDOM = document.getElementById(pluginId);


// API query
const query = `
  ${pluginConfig.corsProxy}/
  https://api.darksky.net/forecast/
  ${pluginConfig.apiKey}/
  ${pluginConfig.latitude},${pluginConfig.longitude}
  ?lang=${pluginConfig.lang}
  &units=${pluginConfig.units}
  &exclude=minutely,hourly,flags
`.replace(/\s+/g, '');


const renderWeather = (data) => {
  // Map units with defaults
  const mapUnits = {
    degrees: 'F',
    speed: 'mp/h',
  };

  // Update units if necessary
  if (pluginConfig.units === 'si' || pluginConfig.units === 'ca') {
    mapUnits.degrees = 'C';
    mapUnits.speed = 'km/h';
  } else if (pluginConfig.units === 'uk2') {
    mapUnits.degrees = 'C';
  }

  const weather = {
    summary: data.currently.summary,
    temp: Math.round(data.currently.temperature),
    tempHi: Math.round(data.daily.data[0].temperatureHigh),
    wind: Math.round(data.currently.windSpeed),
    cloud: Math.round(data.currently.cloudCover * 100),
    precip: Math.round(data.currently.precipProbability * 100),
  };

  weatherDOM.innerHTML = `Weather in ${pluginConfig.locationAlias}: ${weather.summary},
    ${weather.temp}°${mapUnits.degrees} (high ${weather.tempHi}°),
    ${weather.wind}${mapUnits.speed} wind
    ${weather.precip}% precip.,
    ${weather.cloud}% cloud cover.`;
};


async function callWeatherAPI(src) {
  try {
    const response = await fetch(src);
    const data = await response.json(); // Read response body and parse as JSON
    return data;
  } catch (err) {
    weatherDOM.innerHTML = 'Weather plugin: Error, see console for details.';
    throw err;
  }
}


function getWeatherData() {
  if (
    storageAvailable('localStorage')
    && localStorage.getItem('plugin_weather__cache')
  ) {
    const data = JSON.parse(localStorage.getItem('plugin_weather__cache'));
    const now = new Date();

    // Equalize UNIX timestamp with JS (ms based)
    const cacheDate = new Date(data.currently.time * 1000);

    const diffInMinutes = (now.getTime() - cacheDate.getTime()) / 1000;

    // Use cached weather data for 30 minutes
    if (diffInMinutes < 30 * 60) {
      renderWeather(data);
      return;
    }
  }

  // Request weather from API and cache in localStorage, if available.
  weatherDOM.innerHTML = 'Loading weather data…';
  callWeatherAPI(query).then((data) => {
    renderWeather(data);
    if (storageAvailable('localStorage')) {
      localStorage.setItem('plugin_weather__cache', JSON.stringify(data));
    }
  });
}


// Initialize plugin
export const init = () => getWeatherData(); // eslint-disable-line import/prefer-default-export
