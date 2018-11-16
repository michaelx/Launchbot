var launchbotConfig = {

  // Enter absolute URIs 'http://', 'https://', 'ftp://' …
  sets: [

    // First example set
    {
      name: 'Daily',
      items: [
        'https://mymorningroutine.com',
        'https://www.nytimes.com',
        'https://www.newyorker.com',
        'https://news.ycombinator.com',
        'https://reddit.com',
        'https://macstories.net',
        'http://brettterpstra.com'
      ]
    },

    // Second example set
    {
      name: 'Travel',
      items: [
        'https://michaelxander.com/static/nyc-cams.html',
        'https://www.google.com/flights/',
        'http://en.wikivoyage.org',
        'http://wikitravel.org'
      ]
    }

    // Add more sets below, don’t forget to add a comma after the previous set.

  ],

  // For favorites bar, enter absolute URIs 'http://', 'https://', 'ftp://' …
  favs: [
    'https://michaelxander.com',
    'https://mymorningroutine.com',
    'https://mail.google.com',
    'https://drive.google.com',
    'https://app.asana.com',
    'https://twitter.com',
    'https://reddit.com',
    'https://www.nytimes.com',
    'https://news.ycombinator.com',
    'https://devdocs.io'
  ],

  // Optional settings
  options: {
    searchEngine: 'https://www.google.com/search',
    faviconSize: 16,
    faviconService: 'http://www.google.com/s2/favicons?domain=',
    linkTarget: '_blank'
  },
  plugins: {
    weather: {
      enabled: true,
      zipCode: 10439,
      country: 'Germany',
      useCelcius: true
    }
  }
};