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

export {
  encrypt,
  decrypt,
  findCommonElements,
  getCharactersCount,
  mobileCheck,
};

export { default as usePdf } from "./usePdf";
export { default as parseCharToImagePath } from "./charToImage";
export { default as themes } from "./theme";
