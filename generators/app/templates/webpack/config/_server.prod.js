module.exports = {
  port: 4010,
  files: [".dist/prod/**/*.{html,htm,css,js,gz}"],
  server: {
    baseDir: "./dist/prod",
    middleware: {
      0: require("compression")()     // removes default `connect-logger` middleware
    }
  }
};