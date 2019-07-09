import config from './configLoader';


// Get all enabled plugins
const plugins = config.plugins.filter(plugin => plugin.enabled === true);

// Dynamically import and initialize the enabled plugins
async function loadPlugin(src) {
  try {
    const plugin = await import('../plugins/' + src.name + '.js');
    plugin.init();
  } catch (err) {
    throw err;
  }
}

plugins.forEach(plugin => loadPlugin(plugin));
