var potrace = require("potrace"),
  { optimize } = require("svgo"),
  fs = require("fs");

const source = "./public/letters/full",
  destination = "./public/letters/minimised";

function convert(name) {
  potrace.trace(`${source}/${name}`, { threshold: 254, turdSize: 6 }, function (
    err,
    svg
  ) {
    if (err) throw err;
    const result = optimize(svg),
      optimizedSvgString = result.data;

    let tmp = name.split(".");
    tmp.pop();
    newName = tmp.join(".") + ".svg";

    fs.writeFileSync(`${destination}/${newName}`, optimizedSvgString);
  });
}

async function iterate(path) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
  }

  const dir = await fs.promises.opendir(path);
  for await (const dirent of dir) {
    convert(dirent.name);
  }
}

iterate(source);
