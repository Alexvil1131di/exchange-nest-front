import { useMutation, useQuery } from "@tanstack/react-query";
import { userRegister, userLogin, changePassword, idValidation } from "./fetchs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isAuthorizedRoute } from "./methods";
import useLoginForm from "@/store/singInStore";
import { stringDecrypter, stringEncrypter, luhnAlgorithm } from "./methods";
import { user } from "@/interfaces/usersInterface";
import { sendChangePasswordEmail } from "./fetchs";
import { userData } from "@/interfaces/authInterface";


// export function useLogIn() {
//     return useQuery(["orders-count", from, to, status], () => getOrdersCount(status, from, to), { refetchInterval: 60 * 500 });
// }

export function useRegister(setIdError: (value: boolean) => void) {
    return useMutation({
        mutationFn: async (user: userData) => {
            var regex = new RegExp("^[0-9]{3}-?[0-9]{7}-?[0-9]{1}$");
            const verifyer = regex.test(user.nic) ? luhnAlgorithm(user.nic) : false

            if (regex.test(user.nic)) {
                const idValidationFetch = await idValidation(user.nic)

                if (verifyer && idValidationFetch) {
                    return userRegister(user)
                }
                else {
                    setIdError(true)
                }
            }
            else {
                return userRegister(user)
            }

        },
    })
}

export function useLogin() {
    return useMutation({
        mutationFn: userLogin,
    })
}

export function useChangePasswordEmail() {
    return useMutation({
        mutationFn: sendChangePasswordEmail,
    })
}

export function useChangePassword() {
    return useMutation({
        mutationFn: changePassword,
    })
}

export function useUserAuth(route: string) {
    const router = useRouter();
    const [userAuth, setUserAuth] = useState(false)
    const { userData } = useLoginForm()


    useEffect(() => {
        if (userData) {
            const data = JSON.parse(stringDecrypter(userData as string))

            const token = Cookies.get("token");
            setUserAuth(true)

            if (!token && !router.pathname.includes("Auth") && router.pathname !== "/") {
                router.push("/Auth/signIn");
                setUserAuth(false)
            }
            else if (token && router.pathname === "/Auth/signIn") {
                router.push("/");
                setUserAuth(true)
            }

            if (token && !isAuthorizedRoute(route, data?.roleText ?? "")) {
                setUserAuth(false)
            }

            if (data?.roleText && !isAuthorizedRoute(router.pathname, data?.roleText)) {
                router.push("/");
            }

        }
        else {
            setUserAuth(false)
        }

    }, [router.pathname, userData]);

    return { userAuth }
}