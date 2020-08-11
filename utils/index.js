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

export { encrypt, decrypt };
