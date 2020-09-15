const withOptimizedImages = require("next-optimized-images");
const withProgressBar = require("next-progressbar");
const path = require("path");

module.exports = withProgressBar(
  withOptimizedImages({
    webpack(config) {
      config.resolve.alias.images = path.join(__dirname, "images");
      return config;
    },
  })
);
