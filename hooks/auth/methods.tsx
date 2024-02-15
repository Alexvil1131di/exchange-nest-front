import { Console } from "console";
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

        //Organizations
        "/Programs": ["Organization", "Administrator"],
        "/Applications": ["Organization"],

        //Admin
        "/Institutions": ["Administrator"],
        "/Users": ["Administrator"],

        //UsersApp
        "/UsersApp": ["Student", "Administrator"],
        "/UsersApp/Applications": ["Student", "Administrator"],
        "/UsersApp/Profile": ["Student", "Administrator"],

    };


    const authorizedRoles = authorizedRoutes[pathname];

    if (!authorizedRoles) {
        return true;
    }

    return authorizedRoles.includes(userRole);
}

export function luhnAlgorithm(cardNumber: string) {
    let sum = 0;
    let isSecond = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let d = parseInt(cardNumber[i]);
        if (isSecond == true)
            d = d * 2;
        sum += Math.floor(d / 10);
        sum += d % 10;
        isSecond = !isSecond;
    }
    return (sum % 10 == 0);
}