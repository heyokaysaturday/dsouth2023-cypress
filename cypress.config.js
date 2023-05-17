const { defineConfig } = require("cypress");
const getCompareSnapshotsPlugin = require("cypress-image-diff-js/dist/plugin");

require("dotenv").config();

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  screenshotsFolder: "cypress/screenshots",
  trashAssetsBeforeRuns: false,
  defaultCommandTimeout: 10000,
  reporter: "cypress-mochawesome-reporter",
  e2e: {
    baseUrl: "https://drupal-south-2023.lndo.site",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require("cypress-mochawesome-reporter/plugin")(on);
      (config.env.cyAdminUser = "adminUser"),
        (config.env.cyAdminPassword = "adminUser"),
        (config.env.cyAdminRole = "administrator"),
        (config.env.cyEditorUser = "editorUser"),
        (config.env.cyEditorPassword = "editorUser"),
        (config.env.cyEditorRole = "content_editor"),
        getCompareSnapshotsPlugin(on, config);
      return config;
    },
  },
});
