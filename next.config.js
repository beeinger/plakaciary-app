const withOptimizedImages = require("next-optimized-images");
const withProgressBar = require("next-progressbar");
const path = require("path");
const withPWA = require("next-pwa");

module.exports = withProgressBar(
  withPWA(
    withOptimizedImages({
      pwa: {
        dest: "public",
      },
      webpack(config) {
        config.resolve.alias.images = path.join(__dirname, "images");
        return config;
      },
    })
  )
);
