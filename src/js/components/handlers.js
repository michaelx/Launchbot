const searchDOM = document.getElementById('js-search-text');
const setsDOM = document.getElementsByClassName('set');
const settingsDOM = document.getElementById('js-settings');


export default function (launchbot) {
  // Open sets with a click
  Array.from(setsDOM).forEach((set, i) => {
    set.addEventListener('click', () => {
      launchbot.openSet(i);
    });
  });


  if (launchbot.options.keyboardShortcuts === true) {
    // Global keyboard shortcuts
    window.addEventListener('keydown', (event) => {
      // Prevent global shortcuts to run while the settings are open
      if (settingsDOM.classList.contains('is-active')) return;

      // Search
      if (event.key === 's' || event.key === '/') {
        searchDOM.focus();
        // Prevent 's' to be added to the search field
        event.preventDefault();
      }

      // Open sets
      //
      // Note: Currently only the first 9 sets have a shortcut.
      if (
        Number(event.key) > 0
        && Number(event.key) <= 9
        && Number(event.key) <= launchbot.sets.length
      ) {
        launchbot.openSet(Number(event.key - 1));
      }
    });

    // Search
    searchDOM.addEventListener('keydown', (event) => {
      // Prevent global shortcuts to run while typing text
      event.stopPropagation();

      if (event.key === 'Escape') searchDOM.blur();
    });
  }
}
