var CryptoJS = require('./aes.js');//引入aes.js路径,根据自己的路径来引入
// aes加密
function encodeAesString(data, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  //返回的是base64格式的密文
  return encrypted;
}
 
// encrypted 为是base64格式的密文
// aes解密
function decodeAesString(encrypted, key, iv) {
  var key = CryptoJS.enc.Utf8.parse(key);
  var iv = CryptoJS.enc.Utf8.parse(iv);
  var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encodeAesString,
  decodeAesString
}