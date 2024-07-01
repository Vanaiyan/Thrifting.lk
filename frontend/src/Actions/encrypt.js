import CryptoJS from "crypto-js";

// Replace this key with a more secure, generated key
const SECRET_KEY = "-j)=#b7-_fx58%ey(vsapjv@te4&r3(d=#gw2g$bl!d$r60d8i";

export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
