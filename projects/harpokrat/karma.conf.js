// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    autoWatch: true,
    basePath: "",
    browsers: ["Chrome_no_sandbox"],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "../../coverage/harpokrat"),
      fixWebpackSourcePaths: true,
      reports: ["html", "lcovonly"],
    },
    customLaunchers: {
      Chrome_no_sandbox: {
        base: "Chromium",
        flags: ["--no-sandbox", "--headless", "--remote-debugging-port=9222"],
      },
    },
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    logLevel: config.LOG_INFO,
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage-istanbul-reporter"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    port: 9876,
    reporters: ["progress", "kjhtml"],
    restartOnFileChange: false,
    singleRun: true,
  });
};
