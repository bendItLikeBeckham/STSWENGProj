const { defineConfig } = require("cypress");
const { configurePlugin } = require('cypress-mongodb');


module.exports = defineConfig({
  env: {
      mongodb: {
          uri: 'mongodb+srv://Admin_Acc:6rtztqN8cgcS6uwg@payrollcluster.ho2w0w9.mongodb.net/',
          database: 'test',
          collection: 'payrolls'
      }
  },
  e2e: {
    setupNodeEvents(on, config) {
      configurePlugin(on);
    },
    chromeWebSecurity: false
  },
});
