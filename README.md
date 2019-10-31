# Launchbot

A startpage to open collections of websites with one click. It’s like restoring tabs, but anywhere.

## Demo

You can use the [official instance of Launchbot](https://launchbot.michaelxander.com) to try it out, or to use it indefinitely. You can customize the settings to your liking. Your data is only stored in your browser’s `localStorage`.

Alternatively, you can [self-host it](#self-host-launchbot).

## Prerequisites

None. You can use Launchbot from the file system with your browser, e.g. `file:///Users/michael/Projects/Launchbot/dist/index.html`. Just make sure you’re using the build files in the `dist` folder, all other files are for development only.

### Development

> **Note:** I use and recommend [asdf-vm](https://github.com/asdf-vm/asdf) to install and manage versions of Node.js. Alternatives like `NVM` or `nodenv` can be used as long as there’s a `.nvmrc` etc. file.

**Node.js**. Currently developed against Node.js `8.11.4`.

Clone the repository and change into the `Launchbot` folder. Install dependencies:

```sh
npm install
```

Used style guides *(enforced with stylelint and ESLint)*:

- CSS: [michaelx/code-guide](https://github.com/michaelx/code-guide/blob/master/css-styleguide.md)
- JavaScript: [airbnb-base](https://github.com/airbnb/javascript)

## Self-host Launchbot

Clone or download the repository. Copy the `dist` folder (or the files within) where you want it. This can be within the file system or onto a web server. Navigate to the `index.html` in your browser. E.g. `file:///Users/michael/Projects/Launchbot/dist/index.html` or `https://launchbot.michaelxander.com` (you can omit the index.html on servers.) Open the “Settings” to customize your collections, manage plugins, and to adjust options.

### Embedded default config

> **Note:** This requires the development environment. Also, if `localStorage` isn’t available, the embedded config will be used.

You can also create your own embedded default config, so that you don’t have to adjust the settings twice. This is helpful if you’re using Launchbot from multiple devices.

1. Edit the file `src/js/config.js`.
2. Create a new build: `npm run build`
3. Upload the files in the folder `dist`.

### Upgrading

`git pull`, or download the latest release and replace your copy with it. If an embedded default config is used, make sure to make a backup of it, or `stage` and `merge` it.

## Keyboard shortcuts

Shortcut | Action
:------- | :-----
`1` to `9` | Open set
`s` or `/` | Search
`esc` | Close search

## Settings

Once the settings panel is open, and you made all changes, make sure to scroll down to save or reset them.

### Sets

These are your collections of websites. You can add as many as you want. Enter one URL per line.

### Options

Key | Values | Description
:------- | :----- | :-----
darkMode | `true` or `false` | Enable dark mode or use light theme.
searchEngine | URL as String | Search engine to use.
faviconSize | Integer | Size of website icons.
faviconService | URL as String | Service to use to get the website icons.
linkTarget | `_blank` | Where to open website sets.
keyboardShortcuts | `true` or `false` | Enable or disable keyboard shortcuts.

### Plugins

Two default plugins are available. Development of new plugins should be straight forward.

#### Weather

Displays the weather. Example:

```text
Weather in Berlin: Mostly Cloudy, 16°C (high 22°), 3km/h wind 0% precip., 75% cloud cover.
```

The weather plugin uses the Dark Sky API. Please familiarize yourself with their service before using it ([API Documentation](https://darksky.net/dev/docs)). 1,000 API calls per day are [free](https://darksky.net/dev/docs/faq). If `localStorage` is available, Launchbot caches by default the weather data for 30 minutes before making a new request.

Dark Sky has disabled cross-origin resource sharing (CORS), so we need a proxy for that. If you don’t include your Dark Sky `apiKey` in your embedded default config, you could use the public instance of [cors-anywhere](https://cors-anywhere.herokuapp.com). If you deploy Launchbot with your `apiKey` in public, I’d host the proxy myself ([cors-anywhere on GitHub](https://github.com/Rob--W/cors-anywhere)).

Key | Values | Description
:------- | :----- | :-----
name | String | Plugin identifier. Can’t be changed.
enabled | `true` or `false` | Enable or disable the plugin.
corsProxy | URL as String | CORS Proxy for Dark Sky API request.
apiKey | String | Your Dark Sky API key.
locationAlias | String | Name to display for the weather location.
latitude | String | In decimal degrees for Dark Sky API request.
longitude | String | In decimal degrees for Dark Sky API request.
lang | String | Desired language for Dark Sky data.
units | String | Desired units for Dark Sky data.

#### Age

Displays your precise age, as well as the percentage and years left until your defined goal. Example:

```text
Age: 30.99692, 55.72% left until 70
```

Motivating, right?

Key | Values | Description
:------- | :----- | :-----
name | String | Plugin identifier. Can’t be changed.
enabled | `true` or `false` | Enable or disable the plugin.
birthday | yyyy-mm-dd as String | Desired language for Dark Sky data.
goal | Integer | Goal in years.

## Compatibility

You need to allow pop-ups from Launchbot. Your browser should prompt you.

Then, Launchbot should work with every major browser on most devices, as long as JavaScript is enabled.

### Exceptions

Safari on iOS only allows one new tab per action. If there’s enough demand, I’ll try an [alternative approach](https://stackoverflow.com/a/46439467). You can use Launchbot with Chrome on iOS for the time being.

## Themes

**Dark** *(default)*

![Dark theme](https://github.com/michaelx/launchbot/blob/master/docs/screenshots/theme-dark.png?raw=true)

**Light**

![Light theme](https://github.com/michaelx/launchbot/blob/master/docs/screenshots/theme-light.png?raw=true)

## Author

Michael Xander

- <https://michaelxander.com>
- <https://twitter.com/michaxndr>
