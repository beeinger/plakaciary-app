import fs from "fs";
import { jsPDF } from "jspdf";
import { parseCharToImagePath } from "utils";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { slogan } = req.query;
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const characters = slogan.split("");
    for (const id in characters) {
      const val = characters[id];
      if (val !== " ") {
        const _val = parseCharToImagePath(val);
        const image = fs.readFileSync(`public/images/alphabet/${_val}.png`);
        doc.addImage(image, "PNG", 0, 0, 210, 297);
      }
      if (id != slogan.length - 1) doc.addPage("a4", "p");
      console.log(((id * 100) / characters.length).toFixed(2) + "% ", slogan);
    }
    console.log("100% ", slogan);
    const pdf = doc.output("datauristring", { filename: slogan + ".pdf" });
    res.status(200).send(pdf);
  }
}
