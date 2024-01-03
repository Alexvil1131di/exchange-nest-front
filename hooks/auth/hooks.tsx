import { useMutation, useQuery } from "@tanstack/react-query";
import { userRegister, userLogin, changePassword } from "./fetchs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { isAuthorizedRoute } from "./methods";
import useLoginForm from "@/store/singInStore";
import { stringDecrypter, stringEncrypter } from "./methods";
import { user } from "@/interfaces/usersInterface";
import { sendChangePasswordEmail } from "./fetchs";

// export function useLogIn() {
//     return useQuery(["orders-count", from, to, status], () => getOrdersCount(status, from, to), { refetchInterval: 60 * 500 });
// }

export function useRegister() {
    return useMutation({
        mutationFn: userRegister,
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
            const data = stringDecrypter(userData as string) as user
            const token = Cookies.get("token");
            setUserAuth(true)

            if (!token && !router.pathname.includes("Auth")) {
                router.push("/Auth/signIn");
                setUserAuth(false)
            }
            else if (token && router.pathname === "/Auth/signIn") {
                router.push("/");
                setUserAuth(true)
            }

            if (token && !isAuthorizedRoute(route, data?.roleText)) {
                setUserAuth(false)
            }

            if (data?.roleText && !isAuthorizedRoute(router.pathname, data?.roleText)) {
                router.push("/");
            }

        }
        else {
            router.push("/Auth/signIn");
            setUserAuth(false)
        }

    }, [router.pathname, userData]);

    return { userAuth }
}