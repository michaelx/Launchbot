const pluginsDefaultDOM = document.getElementById('js-plugins-default');


// Link style with favicon
export function formatItemBar(item, config) {
  return `<li class="set-item">
    <a href="${item}" title="${item}" target="${config.options.linkTarget}">
      <img
        class="set-item__img"
        src="${config.options.faviconService + item}"
        alt="Icon for Launchbot set item"
        width="${config.options.faviconSize}"
        height="${config.options.faviconSize}">
    </a>
  </li>`;
}


// Add plugin(s) to default plugin space
export function addToDefaultPluginDOM(id) {
  const li = document.createElement('li');
  li.setAttribute('id', id);
  li.setAttribute('class', 'plugins__item');

  pluginsDefaultDOM.appendChild(li);
}


// Detect whether localStorage is supported and available
//
// via https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
/* eslint-disable operator-linebreak */
export function storageAvailable(type) {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage.length !== 0; // eslint-disable-line no-undef
  }
}
/* eslint-enable operator-linebreak */
