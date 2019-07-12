import config from '../components/configLoader';
import { addToDefaultPluginDOM } from '../components/helpers';


const pluginConfig = config.plugins.find(obj => obj.name === 'age');


// DOM setup
const pluginId = 'js-plugin-age';
addToDefaultPluginDOM(pluginId);
const ageDOM = document.getElementById(pluginId);


const renderAge = () => {
  const { birthday, goal } = pluginConfig;

  // Inspired by:
  // Alex MacCaw https://github.com/maccman/motivation
  const now = new Date();
  const age = (now - new Date(birthday)) / 3.1556952e+10; // divided by 1 year in ms
  let remainder = 100 - (age / goal * 100);

  let goalPrefix = 'left until';
  if (remainder < 0) {
    goalPrefix = 'over goal of';
    remainder = -remainder;
  }

  ageDOM.innerHTML = `Age: ${age.toFixed(5)}, ${remainder.toFixed(2)}% ${goalPrefix} ${goal}`;
};


// Initialize plugin
export const init = () => renderAge(); // eslint-disable-line import/prefer-default-export
