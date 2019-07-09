import { storageAvailable } from './helpers';


// DOM
const welcomeDOM = document.getElementById('js-welcome-modal');
const welcomeButtonDOM = document.getElementById('js-welcome-dismiss');


export default function () {
  // Only display the welcome modal if localStorage is available,
  // so that we can easily keep track of it.
  if (
    storageAvailable('localStorage')
    && !localStorage.getItem('launchbot__welcome')
  ) {
    welcomeDOM.style.display = 'block';
  }


  // Handler: Dismiss welcome modal
  //
  // Set flag in localStorage, so that it doesn’t get displayed again.
  welcomeButtonDOM.addEventListener('click', () => {
    welcomeDOM.style.display = 'none';
    localStorage.setItem('launchbot__welcome', false);
  });
}
