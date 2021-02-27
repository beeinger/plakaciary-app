import axios from "axios";
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
        let image = await axios.get(
          `https://app.plakaciary.pl/images/alphabet/${_val}.png`,
          { responseType: "arraybuffer" }
        );
        let returnedB64 = Buffer.from(image.data).toString("base64");
        doc.addImage(returnedB64, "PNG", 0, 0, 210, 297);
      }
      if (id != slogan.length - 1) doc.addPage("a4", "p");
      console.log(((id * 100) / characters.length).toFixed(2) + "% ", slogan);
    }
    console.log("100% ", slogan);
    const pdf = doc.output("datauristring", { filename: slogan + ".pdf" });
    res.status(200).send(pdf);
  }
}
