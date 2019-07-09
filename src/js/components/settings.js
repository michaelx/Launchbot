import config from './configLoader';


// DOM
const configOptionsDOM = document.getElementById('js-settings-options');
const configPluginsDOM = document.getElementById('js-settings-plugins');
const configSetsDOM = document.getElementById('js-settings-sets');
const exportDOM = document.getElementById('js-settings-export');
const footerDOM = document.getElementById('js-footer');
const settingsDOM = document.getElementById('js-settings');
const settingsAddSetDOM = document.getElementById('js-settings-add-set');
const settingsButtonDOM = document.getElementById('js-settings-button');
const settingsCancelDOM = document.getElementById('js-settings-cancel');
const settingsRestoreDOM = document.getElementById('js-settings-restore');
const settingsSaveDOM = document.getElementById('js-settings-save');


function saveConfig(obj) {
  localStorage.setItem('config', JSON.stringify(obj));
  window.location.reload(true);
}


function getFormData() {
  const sets = [];
  configSetsDOM.childNodes.forEach((set) => {
    sets.push({
      name: set.children[0].value,
      items: [...set.children[1].value.split('\n')],
    });
  });

  const options = {};
  configOptionsDOM.childNodes.forEach((opt) => {
    const { name, type, checked } = opt.children[1];
    let { value } = opt.children[1];
    if (type === 'checkbox') value = checked;
    options[name] = value;
  });

  const plugins = [];
  configPluginsDOM.childNodes.forEach((plugin) => {
    const pluginOptions = {};
    plugin.childNodes.forEach((opt) => {
      const { name, type, checked } = opt.children[1];
      let { value } = opt.children[1];
      if (type === 'checkbox') value = checked;
      pluginOptions[name] = value;
    });
    plugins.push(pluginOptions);
  });

  return {
    sets,
    options,
    plugins,
  };
}


// Render config sets
let renderSets = '';
config.sets.forEach(({ name, items }) => {
  renderSets += `<li class="settings-form-list__item">
    <input class="input input--settings input--set" type="text" value="${name}">
    <textarea class="textarea">${items.join('\n')}</textarea>
    <button class="button button--small" type="button">Remove</button>
  </li>`;
});

configSetsDOM.innerHTML = renderSets;


// Render config options
let renderOptions = '';

// Make config.options obj iterable
Object.entries(config.options).forEach(([key, value]) => {
  let attribute = '';
  let inputStyles = 'input input--settings';

  // Map input type
  let inputType = 'text'; // default
  if (key === 'darkMode' || key === 'keyboardShortcuts') {
    inputType = 'checkbox';
    inputStyles = ''; // Use default style for checkboxes
    if (value === true) attribute = 'checked';
  }

  renderOptions += `<li class="settings-form-list__item">
    <label class="input-label" for="${key}">${key}:</label>
    <input class="${inputStyles}" type="${inputType}" name="${key}" value="${value}" ${attribute}>
  </li>`;
});

configOptionsDOM.innerHTML = renderOptions;


// Render plugins and their options
config.plugins.forEach((plugin) => {
  const pluginDOM = document.createElement('ul');
  pluginDOM.setAttribute('class', 'settings-form-list settings-form-list--plugin');

  Object.entries(plugin).forEach(([key, value]) => {
    let attribute = '';
    let inputStyles = 'input input--settings';

    // Map input type
    let inputType = 'text'; // default
    if (key === 'enabled') {
      inputType = 'checkbox';
      inputStyles = ''; // Use default style for checkboxes
      if (value === true) attribute = 'checked';
    }

    // Disable plugin name changes through the UI
    if (key === 'name') attribute = 'disabled';

    pluginDOM.innerHTML += `<li class="settings-form-list__item settings-form-list__item--plugin">
      <label class="input-label" for="${key}">${key}:</label>
      <input class="${inputStyles}" type="${inputType}" name="${key}" value="${value}" ${attribute}>
    </li>`;
  });

  configPluginsDOM.appendChild(pluginDOM);
});


// Export config
exportDOM.innerHTML = `export default ${JSON.stringify(config, null, 2)};`;


// Handlers
//
// Settings handlers are defined here, as some are generated dynamically by
// this component.

// Open settings
settingsButtonDOM.addEventListener('click', () => {
  footerDOM.style.position = 'relative';
  settingsDOM.classList.add('is-active');
});

// Cancel and close settings
settingsCancelDOM.addEventListener('click', (event) => {
  event.preventDefault();
  settingsDOM.classList.remove('is-active');
  footerDOM.style.position = 'fixed';
});

// Save
settingsSaveDOM.addEventListener('click', (event) => {
  event.preventDefault();
  saveConfig(getFormData());
});

// Restore embedded config
settingsRestoreDOM.addEventListener('click', (event) => {
  event.preventDefault();
  localStorage.removeItem('config');
  window.location.reload(true);
});


// Remove set from settings form
//
// removeSetHandler() is defined here, so that the event can reference it
// correctly by obj reference.
const removeSetHandler = ({ target }) => {
  configSetsDOM.removeChild(target.parentNode);
};

function initRemoveSetHandlers() {
  configSetsDOM.childNodes.forEach((set) => {
    const el = set.children[2];
    el.addEventListener('click', removeSetHandler);
  });
}

initRemoveSetHandlers();


// Add set to settings form
settingsAddSetDOM.addEventListener('click', () => {
  const el = document.createElement('li');
  el.setAttribute('class', 'settings-form-list__item');
  el.innerHTML = `
    <input class="input input--settings input--set" type="text" placeholder="Enter set title">
    <textarea class="textarea" placeholder="Enter one URL per line"></textarea>
    <button class="button button--small" type="button">Remove</button>
  `;

  configSetsDOM.appendChild(el);
  initRemoveSetHandlers();
});
