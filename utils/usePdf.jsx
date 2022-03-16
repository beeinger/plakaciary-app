import { useEffect, useRef, useState } from "react";

import { jsPDF } from "jspdf";
import { parseCharToImagePath } from "utils";
import { toast } from "react-toastify";

const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  },
  getProgress = (progress, slogan) => {
    return Array.isArray(slogan)
      ? progress / slogan.reduce((prev, curr) => prev + curr.length, 0)
      : typeof slogan === "string"
      ? progress / (slogan.length + 1)
      : 0;
  };

export default function usePdf() {
  let [slogan, setSlogan] = useState(null),
    [progress, setProgress] = useState(0),
    toastId = useRef(null);

  useEffect(() => {
    if (!slogan) return;
    if (typeof slogan === "string")
      printPDF(slogan).then(() => setSlogan(null));
    else {
      Promise.all(slogan.map(printPDF)).then(() => setSlogan(null));
    }
  }, [slogan]);

  useEffect(() => {
    if (!slogan && progress) {
      toast.update(toastId.current, {
        render: "Done!",
        type: toast.TYPE.SUCCESS,
        position: "top-right",
        progress: undefined,
        autoClose: 5000,
      });
      setProgress(0);
    }

    if (!progress || !slogan) return;

    let _progress = getProgress(progress, slogan);

    toast.update(toastId.current, {
      render: "Preparing... " + (_progress * 100).toFixed(1) + "%",
      progress: _progress,
      onOpen: undefined,
    });
  }, [progress, slogan]);

  async function printPDF(slogan) {
    if (typeof slogan !== "string") return false;

    let doc = new jsPDF({
      compress: true,
    });

    const characters = slogan.split("");
    for (const id in characters) {
      const val = characters[id];
      if (val !== " ") {
        const _val = parseCharToImagePath(val),
          img = await getBase64FromUrl(`/letters/full/${_val}.png`);
        doc.addImage(img, "PNG", 0, 0, 210, 297);
      }
      if (id !== slogan.length) doc.addPage("a4", "p");
      setProgress((prev) => prev + 1);
    }

    // QR code at the end of each slogan
    const img = await getBase64FromUrl(`/letters/full/qr_code.png`),
      size = 110,
      w = 210,
      h = 297;
    doc.addImage(img, "PNG", (w - size) / 2, (h - size) / 2, size, size);

    return doc.save(slogan + ".pdf", { returnPromise: true });
  }

  function print(slogan) {
    toastId.current = toast("Preparing... 0.0%", {
      type: toast.TYPE.INFO,
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress,
      style: { zIndex: 999 },
      onOpen: () => setSlogan(slogan),
    });
  }

  return print;
}
