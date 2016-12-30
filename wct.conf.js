var args = require('yargs').argv;

module.exports = {
  extraScripts: args.dom === 'shadow' ? ['test/enable-shadow-dom.js'] : [],
  registerHooks: function(context) {
    // run Saucelabs tests for
    //  - internal PRs, except cases when branch contains 'quick/'
    //  - daily builds, triggered by cron
    if (
      (process.env.TRAVIS_EVENT_TYPE === 'push' && process.env.TRAVIS_BRANCH.indexOf('quick/') === -1) ||
      process.env.TRAVIS_EVENT_TYPE === 'cron'
    ) {
      context.options.plugins.sauce.browsers = [
        // desktop
        'Windows 10/chrome@54',
        'Windows 10/firefox@50',
        'Windows 10/microsoftedge@13',
        'Windows 10/internet explorer@11',
        'OS X 10.11/safari@9.0',
        // mobile
        'OS X 10.11/iphone@9.2',
        'OS X 10.11/ipad@9.2',
        'Linux/android@5.1'
      ];
    }
  },
  plugins: {
    'local': true,
    'istanbul': {
      'dir': './coverage',
      'reporters': ['text-summary', 'lcov'],
      'include': [
        '/iron-list-behavior.html',
        '/vaadin-grid-active-item-behavior.html',
        '/vaadin-grid-array-data-source-behavior.html',
        '/vaadin-grid-cell-click-behavior.html',
        '/vaadin-grid-column.html',
        '/vaadin-grid-data-source-behavior.html',
        '/vaadin-grid-dynamic-columns-behavior.html',
        // TODO: @limonte, revisit this in future, currently a weird istanbul bug here
        // '/vaadin-grid-filter-behavior.html',
        '/vaadin-grid-row-details-behavior.html',
        '/vaadin-grid-selection-behavior.html',
        '/vaadin-grid-selection-column.html',
        '/vaadin-grid-sizer.html',
        // TODO: @limonte, revisit this in future, currently a weird istanbul bug here
        // '/vaadin-grid-sort-behavior.html',
        '/vaadin-grid-table-cell.html',
        '/vaadin-grid-table-header-footer.html',
        '/vaadin-grid-table-outer-scroller.html',
        '/vaadin-grid-table-row.html',
        '/vaadin-grid-table-scroll-behavior.html',
        '/vaadin-grid-table.html',
        '/vaadin-grid-templatizer.html',
        '/vaadin-grid.html'
      ],
      'exclude': []
    }
  },
  root: '.'
};
