//jshint strict: false
exports.config = {

  allScriptsTimeout: 11000,

  specs: [
    '*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
    'seleniumAddress': 'http://192.168.2.20:4444/wd/hub'
  },

  baseUrl: 'http://web.salud.gob.sv:8000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }

};
