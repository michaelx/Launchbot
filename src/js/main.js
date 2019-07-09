import config from './components/configLoader';
import Launchbot from './components/launchbot';
import handlers from './components/handlers';
import welcomeModal from './components/welcomeModal';
import { formatItemBar } from './components/helpers';
import './components/pluginLoader';
import './components/settings';


function render(launchbot) {
  // Initialize theme
  if (launchbot.options.darkMode === false) {
    document.documentElement.classList.add('theme-light');
  }

  // Render sets
  let outputSets = '';
  launchbot.sets.forEach(({ name, items }, i) => {
    let itemBar = '';
    items.forEach((item) => {
      itemBar += formatItemBar(item, config);
    });
    outputSets += `<li class="grid__item">
      <div class="set">
        <h2 class="set__name">${name}</h2>
        <span class="set__id">${i + 1}</span>
        <ul>${itemBar}</ul>
      </div>
    </li>`;
  });

  document.getElementById('js-sets').innerHTML = outputSets;

  // Set search engine
  if (launchbot.options.searchEngine) {
    document.getElementById('js-search-form').action = launchbot.options.searchEngine;
  }

  // Initialize welcome modal
  welcomeModal();

  // Initialize handlers and keyboard shortcuts after DOM is generated
  handlers(launchbot);
}


render(new Launchbot(config));
