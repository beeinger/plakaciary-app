var fs = require("fs"),
  trace = require("./trace");

const sources = ["./public/letters/full"],
  destinations = ["./public/letters/minimised"];

const iterate = async (idx) => {
  const source = sources[idx],
    destination = destinations[idx];

  if (!fs.existsSync(destination)) fs.mkdirSync(destination);

  const dir = await fs.promises.opendir(source);
  for await (const dirent of dir) {
    const name = dirent.name;

    let tmp = name.split(".");
    tmp.pop();
    let newName = tmp.join(".") + ".svg";

    trace(`${source}/${name}`).then((svg) =>
      fs.writeFileSync(`${destination}/${newName}`, svg)
    );
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
