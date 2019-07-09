import embeddedConfig from '../config';
import { storageAvailable } from './helpers';


function getConfig() {
  if (storageAvailable('localStorage')) {
    // If localStorage is available and not yet initialized,
    // store the embedded config in it.
    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify(embeddedConfig));
    }
    return JSON.parse(localStorage.getItem('config'));
  }

  // Otherwise use the embedded config and hide the settings button
  document.getElementById('js-settings-button').style.display = 'none';
  return embeddedConfig;
}


export default getConfig();
