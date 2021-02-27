const withOptimizedImages = require("next-optimized-images");
const path = require("path");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

module.exports = withOptimizedImages(
  withPWA({
    pwa: {
      dest: "public",
      disable: process.env.NODE_ENV === "development",
      runtimeCaching,
    },
    webpack(config) {
      config.resolve.alias.images = path.join(__dirname, "images");
      return config;
    },
  })
);
