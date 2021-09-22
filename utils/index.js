import { useEffect, useRef, useState } from "react";

import crypto from "crypto";
import { jsPDF } from "jspdf";
import { toast } from "react-toastify";

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

const available = [
    " ",
    "-",
    ",",
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "@",
    "&",
    "^",
    "+",
    "=",
    "~",
    "$",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "Ą",
    "B",
    "C",
    "Ć",
    "D",
    "E",
    "Ę",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "Ł",
    "M",
    "N",
    "Ń",
    "O",
    "Ó",
    "P",
    "Q",
    "R",
    "S",
    "Ś",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Ź",
    "Ż",
  ],
  special = {
    "|": "vertical_bar",
    ".": "full_stop",
    "/": "slash",
    "'": "apostrophe",
    "‘": "apostrophe",
    "’": "apostrophe",
    "`": "apostrophe",
    '"': "close_quote",
    "“": "open_quote",
    "”": "close_quote",
    "#": "hashtag",
    "%": "percent",
    "/": "slash",
    "\\": "backslash",
    "<": "less_than",
    ">": "more_than",
    "!": "exclamation_mark",
    "?": "question_mark",
    ":": "colon",
    "—": "-",
    "―": "-",
    "‒": "-",
    "‐": "-",
    "‑": "-",
    "־": "-",
  };

function parseCharToImagePath(char) {
  const _char = char.toUpperCase();

  return available.includes(_char) ? _char : special[_char] || "question_mark";
}

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
};

function usePDF() {
  let [slogan, setSlogan] = useState(),
    [progress, setProgress] = useState(0),
    toastId = useRef(null);

  useEffect(() => {
    if (!slogan) return;
    printPDF();
  }, [slogan]);

  useEffect(() => {
    if (!progress) return;
    toast.update(toastId.current, {
      render: `Preparing... ${(progress * 100).toFixed(2)}%`,
      progress,
      onOpen: undefined,
      onClose: () => setSlogan(null),
    });
  }, [progress]);

  async function printPDF() {
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
      if (id != slogan.length - 1) doc.addPage("a4", "p");
      const progress = (id / characters.length).toFixed(2);
      console.log(progress);
      setProgress(progress);
    }
    console.log(1);
    setProgress(0);
    doc.save(slogan + ".pdf", { returnPromise: true }).then(() =>
      toast.update(toastId.current, {
        render: "Done!",
        type: toast.TYPE.SUCCESS,
        position: "top-right",
        progress: undefined,
        autoClose: 5000,
        onOpen: () => setSlogan(null),
      })
    );
  }

  function print(slogan) {
    toastId.current = toast(`Preparing... ${(progress * 100).toFixed(2)}%`, {
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
