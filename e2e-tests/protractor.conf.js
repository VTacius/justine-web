//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
    /*,'seleniumAddress': 'http://192.168.2.20:4444/wd/hub'*/
  },

  baseUrl: 'http://127.0.0.1:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
