'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useChangePassword } from "@/hooks/auth/hooks";
import { toast } from "react-toastify";
import useLoginForm from "@/store/singInStore";
import OpenEye from "@/public/openEye.svg"
import CloseEye from "@/public/closeEye.svg"

export default function Home() {
    const router = useRouter();
    const token = router.query.token as string
    const [password, setPassword] = useState("")
    const [viewPassword1, setViewPassword1] = useState<"password" | "text">("password")
    const [viewPassword2, setViewPassword2] = useState<"password" | "text">("password")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,}$/

    const { getTexts } = useLoginForm();
    const { updatePasswordButton, changePasswordTittle, changePasswordDescription, passwordLabel, passwordPlaceholder, confirmPasswordLabel, confirmPasswordPlaceholder } = getTexts("Auth")
    const { pending, success, error } = getTexts("changePasswordNotification")


    const { mutateAsync: changePassWord } = useChangePassword()

    const handlePasswordChange = (e) => {
        e.preventDefault()
        if (password == confirmedPassword && token?.split("token=")[1]) {

            toast.promise(
                changePassWord({ newPassword: password, token: token?.split("token=")[1] }), {
                pending: pending,
                success: success,
                error: error,
            }).then(() => {
                router.push("/Auth/signIn")
            }).catch((err) => { console.log(err) })

        }
    }

    console.log(token?.split("token=")[1])
    return (

        <div className="flex flex-col w-full h-screen items-center justify-center px-4 ">

            <div className="flex flex-col gap-[40px] items-center p-4 flex-nowrap overflow-scroll border rounded-[20px] shadow-2xl">

                <div className=" w-full max-w-[300px] h-[200px] flex-nowrap">
                    <ExchangeNestLogo className="w-full h-full" />
                </div>

                <div className="flex flex-col w-full text-center max-w-[600px] gap-2">
                    <h1 className="text-[24px]">{changePasswordTittle}</h1>
                    <p className="text-[16px]">{changePasswordDescription}</p>
                </div>

                <form onSubmit={handlePasswordChange} className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label={passwordLabel} required={true} placeholder={passwordPlaceholder} type={viewPassword1} name="password" value={password} hasAnError={password.length > 0 && !(passwordRegex.test(password))}
                        width="w-full " onChange={(e) => { setPassword(e.target.value) }} endIcon={viewPassword1 == "password" ? <CloseEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword1("text") }} /> : <OpenEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword1("password") }} />}
                        errorMessage={(passwordRegex.test(password)) ? "An error has occurred, please fill in the appropriate field." : "Your password must include at least one uppercase letter, one special character, one number, and be at least 6 characters long."} />

                    <InputComponent label={confirmPasswordLabel} required={true} placeholder={confirmPasswordPlaceholder} type={viewPassword2} name="password" value={confirmedPassword} hasAnError={password !== confirmedPassword}
                        width="w-full " onChange={(e) => { setConfirmedPassword(e.target.value) }} endIcon={viewPassword2 == "password" ? <CloseEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword2("text") }} /> : <OpenEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword2("password") }} />}
                        errorMessage={(passwordRegex.test(password)) ? "An error has occurred, please fill in the appropriate field." : "Your password must include at least one uppercase letter, one special character, one number, and be at least 6 characters long."} />

                    <CustomizableButton text={updatePasswordButton} type="submit" onClick={() => { }} ></CustomizableButton>

                </form>



            </div>

        </div>


    )
}
