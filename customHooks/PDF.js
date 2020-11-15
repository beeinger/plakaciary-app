import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

function usePDF() {
  let [slogan, setSlogan] = useState(),
    toastId = useRef(null);

  useEffect(() => {
    if (!slogan) return;
    printPDF(slogan);
  }, [slogan]);

  async function printPDF(slogan) {
    if (typeof slogan !== "string") return false;
    const doc = new jsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4",
      compress: true,
    });
    const characters = slogan.split("");
    for (const id in characters) {
      const val = characters[id];
      if (val !== " ")
        doc.addImage(
          require(`images/alphabet/${val.toUpperCase()}.png`),
          "PNG",
          0,
          0,
          210,
          297
        );
      if (id !== slogan.length - 1) doc.addPage("a4", "p");
    }
    doc.save(slogan + ".pdf", { returnPromise: true }).then(() =>
      toast.update(toastId.current, {
        render: "Done!",
        type: toast.TYPE.SUCCESS,
        position: "top-right",
        autoClose: 5000,
        onOpen: () => setSlogan(null),
      })
    );
  }

  function print(slogan) {
    toastId.current = toast.info("Your file is being prepared!", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      style: { zIndex: 999 },
      onOpen: () => setSlogan(slogan),
      onClose: () => setSlogan(null),
    });
  }

  return print;
}

export default usePDF;
