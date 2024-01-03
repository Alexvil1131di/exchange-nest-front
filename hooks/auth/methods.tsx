import CryptoJS from "crypto-js";
import Cookies from "js-cookie";
import { useRouter } from "next/router";


export function stringEncrypter(stringToEncrypt: string) {
    return CryptoJS.AES.encrypt(stringToEncrypt, "ICKKCK").toString() as any;
}

export function stringDecrypter(stringToDecrypt: string) {
    return stringToDecrypt ? CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(stringToDecrypt as string, "ICKKCK")) as any : ""
}

export function removeDataAttribute(obj: any): any {



    if (Array.isArray(obj)) {
        return obj.map(removeDataAttribute);
    } else if (typeof obj === 'object' && obj !== null) {
        if ('data' in obj) {
            return removeDataAttribute(obj.data);
        } else {
            const newObj = {};
            for (const key in obj) {
                const newObj = {};
                newObj[key] = removeDataAttribute(obj[key]);
            }
            return newObj;
        }
    }
    return obj;
}

export function userLogOut() {
    Cookies.remove("token");
    window.location.href = "/Auth/signIn";
}

export function isAuthorizedRoute(pathname: string, userRole: string) {
    const authorizedRoutes = {

        //everyone have access
        "/": ["student"],

        "/Menu/[id]/editMenu": ["student"],

        "/Products": ["student"],
        "/Products/[id]/editProduct": ["student"],

        "/ProductOptions": ["student"],
        "/ProductOptions/[id]/editProductOption": ["student"],

        "/vistaPrevia": ["student"],

        "/POS/OrderReception": ["student"],

        "/Support": ["student"],


        //Institutions
        "/Applications": ["student"],
        "/Programs": ["student"],

        //admins
        "/Institutions": ["student"],
        "/Users": ["student"],

    };

    const authorizedRoles = authorizedRoutes[pathname];
    if (!authorizedRoles) {
        return true;
    }

    return authorizedRoles.includes(userRole);
}