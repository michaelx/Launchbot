var launchbotConfig = {

  // Enter absolute URIs 'http://', 'https://', 'ftp://' …
  sets: [

    // First example set
    {
      name: 'Daily',
      items: [
        'http://mymorningroutine.com',
        'http://nytimes.com',
        'http://www.newyorker.com',
        'https://news.ycombinator.com',
        'http://reddit.com',
        'http://onethingwell.org',
        'http://macstories.net',
        'http://stadt-bremerhaven.de',
        'http://brettterpstra.com',
        'http://hypetrak.com'
      ]
    },

    // Second example set
    {
      name: 'Travel',
      items: [
        'http://michaelxander.com/static/nyc-cams.html',
        'http://skyscanner.de',
        'http://kayak.com',
        'http://en.wikivoyage.org',
        'http://wikitravel.org'
      ]
    }

    // Add more sets below, don’t forget to add a comma after the previous set.

  ],

  // For favorites bar, enter absolute URIs 'http://', 'https://', 'ftp://' …
  favs: [
    'http://michaelxander.com',
    'http://mymorningroutine.com',
    'https://mail.google.com',
    'https://drive.google.com',
    'https://app.asana.com',
    'https://twitter.com',
    'https://hootsuite.com',
    'http://nytimes.com',
    'https://news.ycombinator.com',
    'http://onethingwell.org',
    'http://brettterpstra.com'
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