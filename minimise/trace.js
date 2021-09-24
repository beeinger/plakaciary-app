var Vibrant = require("node-vibrant"),
  potrace = require("potrace"),
  Potrace = potrace.Potrace,
  { optimize } = require("svgo");

const optimizeSvg = (svg) =>
  optimize(svg, { multipass: true, floatPrecision: 0 });

const extractMostProminentColor = (filePath) => {
  let vibrant = new Vibrant(filePath);

  return vibrant.getPalette().then(function (palette) {
    let mostProminentColor = "",
      highestPopulation = 0,
      color = "",
      population = 0;

    Object.keys(palette).forEach(function (key) {
      if (palette[key] === null) return;

      color = palette[key].getHex();
      population = palette[key].getPopulation();

      if (population > highestPopulation) {
        mostProminentColor = color;
        highestPopulation = population;
      }
    });

    return mostProminentColor;
  });
};

function traceSvg(filePath, traceParams) {
  return new Promise(function (resolve, reject) {
    var trace = new Potrace(traceParams);

    trace.loadImage(filePath, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(trace.getSVG());
      }
    });
  });
}

var traceParams = {
  turnPolicy: Potrace.TURNPOLICY_MINORITY,
  turdSize: 100,
  alphaMax: 1,
  optCurve: true,
  optTolerance: 0.2,
  threshold: Potrace.THRESHOLD_AUTO,
  blackOnWhite: true,
  background: Potrace.COLOR_TRANSPARENT,
};

module.exports = function (source, color) {
  var getFillColor = color
    ? new Promise((resolve) => resolve(color))
    : extractMostProminentColor(source);

  const svg = getFillColor
    .then((color) => {
      traceParams.color = color;
      return traceSvg(source, traceParams);
    })
    .then(optimizeSvg)
    .then((result) => result.data)
    .catch(function (error) {
      console.error(error);
    });

  return svg;
};
