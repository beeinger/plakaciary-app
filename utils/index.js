import { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";
import crypto from "crypto";

function encrypt(data, key) {
  var cipher = crypto.createCipher("aes-256-cbc", key);
  var encrypted = cipher.update(JSON.stringify(data), "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

function decrypt(data, key) {
  var decipher = crypto.createDecipher("aes-256-cbc", key);
  var decrypted = decipher.update(data, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return JSON.parse(decrypted);
}

function findCommonElements(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) return true;
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j].includes(arr1[i])) return true;
    }
  }
  return false;
}

function getCharactersCount(string) {
  var dict = {};
  for (const char of string) {
    if (Object.keys(dict).includes(char)) dict[char] += 1;
    else dict[char] = 1;
  }
  return Object.keys(dict).map((key) => [key, dict[key]]);
}

function mobileCheck() {
  if (window.innerWidth <= 992) {
    if (window.innerWidth <= 600) return "mobile";
    return "tablet";
  } else {
    return "desktop";
  }
}

function parseCharToImagePath(char) {
  const special = {
    "|": "vertical_bar",
    ".": "full_stop",
    "/": "slash",
    "'": "apostrophe",
    "#": "hashtag",
    "%": "percent",
    '"': "close_quote",
    "/": "slash",
    "\\": "backslash",
    "<": "less_than",
    ">": "more_than",
    "?": "question_mark",
    "`": "apostrophe",
  };

  return special[char] || char.toUpperCase();
}

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
      if (val !== " ") {
        const _val = parseCharToImagePath(val);
        doc.addImage(
          require(`images/alphabet/${_val}.png`),
          "PNG",
          0,
          0,
          210,
          297
        );
      }
      if (id !== slogan.length - 1) doc.addPage("a4", "p");
      console.log(((id * 100) / characters.length).toFixed(2) + "%");
    }
    console.log("100%");
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

export {
  usePDF,
  encrypt,
  decrypt,
  findCommonElements,
  getCharactersCount,
  mobileCheck,
  parseCharToImagePath,
};
