module.exports = function (config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine', '@angular-devkit/build-angular'],
      plugins: [
        require('karma-jasmine'),
        require('karma-chrome-launcher'),
        require('karma-jasmine-html-reporter'),
        require('karma-coverage-istanbul-reporter'),
        require('karma-html-reporter'),
        require('@angular-devkit/build-angular/plugins/karma')
      ],
      client: {
        clearContext: false
      },
      coverageIstanbulReporter: {
        dir: require('path').join(__dirname, './coverage/advent-of-code'),
        reports: ['html', 'lcovonly', 'text-summary'],
        fixWebpackSourcePaths: true
      },
      reporters: ['progress', 'html', 'kjhtml', 'coverage-istanbul'],
      port: 9876,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      restartOnFileChange: true,
      browserDisconnectTimeout: 210000,
      files: [
        { pattern: 'src/**/*.spec.ts', type: 'js' }
      ]
    });
  };
  