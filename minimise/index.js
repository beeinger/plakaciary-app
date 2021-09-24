var fs = require("fs"),
  trace = require("./trace"),
  themes = require("../utils/theme");

const sources = ["./public/letters/full"],
  destinations = ["./public/letters/minimised"];

const iterate = async (idx) => {
  const source = sources[idx];

  const dir = await fs.promises.opendir(source);
  for await (const dirent of dir) {
    const name = dirent.name;

    let tmp = name.split(".");
    tmp.pop();
    let newName = tmp.join(".") + ".svg";

    Object.keys(themes).forEach((theme) => {
      const destination = destinations[idx] + "/" + theme;
      if (!fs.existsSync(destinations[idx])) fs.mkdirSync(destinations[idx]);
      if (!fs.existsSync(destination)) fs.mkdirSync(destination);

      trace(`${source}/${name}`, themes[theme].text).then((svg) =>
        fs.writeFileSync(`${destination}/${newName}`, svg)
      );
    });
  }
};

const main = () => {
  console.log("Minimising assets...");
  if (sources.length !== destinations.length)
    return console.error(
      "Sources and destinations arrays have to be equal length."
    );
  for (const idx in sources) iterate(idx);
};

main();
