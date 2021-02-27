import { useEffect, useRef, useState } from "react";

import axios from "axios";
import crypto from "crypto";
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

function parseCharToImagePath(char) {
  const special = {
    "|": "vertical_bar",
    ".": "full_stop",
    ",": "coma",
    "/": "slash",
    "'": "apostrophe",
    "#": "hashtag",
    "%": "percent",
    '"': "close_quote",
    "/": "slash",
    "\\": "backslash",
    "<": "less_than",
    ">": "more_than",
    "!": "exclamation_mark",
    "?": "question_mark",
    "`": "apostrophe",
    ":": "colon",
    "*": "question_mark",
    _: "question_mark",
    ";": "question_mark",
  };

  return special[char] || char.toUpperCase();
}

function downloadFromURI(base64, name) {
  let a = document.createElement("a");
  a.style.display = "none";
  a.href = base64;
  // the filename you want
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function usePDF() {
  let toastId = useRef(null),
    url =
      process.env.NODE_ENV === "production"
        ? "https://app.plakaciary.pl/"
        : "http://localhost:3000/";

  function error() {
    toast.update(toastId.current, {
      render: "Something went wrong...",
      type: toast.TYPE.ERROR,
      position: "top-right",
      autoClose: 5000,
    });
  }

  async function print(slogan) {
    toastId.current = toast.info("Your file is being prepared!", {
      position: "top-center",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      style: { zIndex: 999 },
    });

    const resp = await axios
      .get(url + "api/pdf", {
        params: {
          slogan,
        },
      })
      .catch(() => error());
    if (!resp) return;

    downloadFromURI(resp.data, slogan + ".pdf");
    toast.update(toastId.current, {
      render: "Done!",
      type: toast.TYPE.SUCCESS,
      position: "top-right",
      autoClose: 5000,
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
