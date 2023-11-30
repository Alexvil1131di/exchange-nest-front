import CryptoJS from "crypto-js";


export function stringEncrypter(stringToEncrypt: string) {
    return CryptoJS.AES.encrypt(stringToEncrypt, "ICKKCK").toString();
}

export function stringDecrypter(stringToDecrypt: string) {
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(stringToDecrypt as string, "ICKKCK"));
}