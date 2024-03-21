'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import CheckBoxWithLabel from "@/components/inputs/CheckBoxWithLabel";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import useLoginForm from "@/store/singInStore";
import OpenEye from "@/public/openEye.svg"
import CloseEye from "@/public/closeEye.svg"

import { stringDecrypter, stringEncrypter } from "@/hooks/auth/methods";
import { useEffect, useState } from "react";
import { useLogin } from "@/hooks/auth/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import ResetPasswordModal from "@/components/modals/resetPasswordModal";
import { useChangePasswordEmail } from "@/hooks/auth/hooks";
import Link from "next/link";

export default function SignUp() {
    const router = useRouter();

    const { email, password, rememberMe, userData, setEmail, setPassword, setRememberMe, setUserData, getTexts } = useLoginForm();
    const { loginTittle, loginDescription, emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder, rememberMeLabel, forgotPassword, loginButton, signUpLabel, signUpButton, resetPasswordTittle, resetPasswordDescription, cancel, sendPasswordEmail } = getTexts("Auth")
    const { pending, success, error } = getTexts("LoginNotification")
    const { pending: passPending, success: passSuccess, error: passError } = getTexts("resetPasswordNotification")


    const { mutateAsync: loginUser } = useLogin()
    const { mutateAsync: changePassWord } = useChangePasswordEmail()

    const [showModal, setShowModal] = useState(false)
    const [changePassEmail, setChangePassEmail] = useState("")
    const [viewPassword1, setViewPassword1] = useState<"password" | "text">("password")

    useEffect(() => { if (!rememberMe) { setEmail(""); setPassword("") } else { setRememberMe(true) } }, [rememberMe])

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.promise(loginUser({ email: stringDecrypter(email), password: stringDecrypter(password) }), {
            pending: pending,
            success: success,
            error: error,
        }).then((data) => {

            Cookies.set('token', stringEncrypter(String(data.accessToken)), { expires: 1 })
            setUserData(data)

            setTimeout(async () => {
                if (data.roleText == "Student") {
                    router.push("/UsersApp")
                }
                else {
                    router.push("/")
                }
            }, 500)


        }).catch((err) => { console.log(err) })

    }

    const handleResetPassword = () => {
        toast.promise(changePassWord(changePassEmail), {
            pending: passPending,
            success: passSuccess,
            error: passError,
        }).then(() => {
            setShowModal(false)
        }).catch((err) => { console.log(err) })
    }

    return (

        <div className="flex w-screen h-screen">
            {showModal && <ResetPasswordModal confirmButtonLabel={sendPasswordEmail} rejectButtonLabel={cancel} placeholder={emailPlaceholder} title={resetPasswordTittle} actionMessage={resetPasswordDescription}
                acctionConfirm={() => { handleResetPassword() }} acctionReject={() => { setShowModal(false) }} value={changePassEmail} onChange={(e) => { setChangePassEmail(e.target.value) }} />
            }

            <img className="hidden select-none lg:inline w-full h-full object-center object-cover" src="/loginBackground.png" alt="" />

            <div className="flex flex-col w-full gap-[40px] h-full items-center pt-[60px] px-4 pb-4 flex-nowrap overflow-scroll">

                <div className=" w-full max-w-[300px] h-[200px] flex-nowrap">
                    <ExchangeNestLogo className="w-full h-full" />
                </div>

                <div className="flex flex-col w-full max-w-[600px] gap-2">
                    <h1 className="text-[24px]">{loginTittle}</h1>
                    <p className="text-[16px]">{loginDescription}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label={emailLabel} required={true} placeholder={emailPlaceholder} type="email" name="email" value={stringDecrypter(email)} hasAnError={false}
                        width="w-full " onChange={(e) => { setEmail(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label={passwordLabel} required={true} placeholder={passwordPlaceholder} type={viewPassword1} name="password" value={stringDecrypter(password)} hasAnError={false}
                        width="w-full " onChange={(e) => { setPassword(e.target.value); }} endIcon={viewPassword1 == "password" ? <CloseEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword1("text"); }} /> : <OpenEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword1("password"); }} />} errorMessage={""} />

                    <div className="w-full text-[14px] flex justify-between">
                        <CheckBoxWithLabel label={rememberMeLabel} id={"recuerdame"} checked={rememberMe as boolean} onChange={() => { setRememberMe() }} />
                        <button type="button" onClick={() => { setShowModal(true) }} className="underline">{forgotPassword}</button>
                    </div>

                    <CustomizableButton text={loginButton} maxSize="w-full h-[42px]" type="submit" onClick={() => { }} ></CustomizableButton>

                </form>

                <Link href={"/Auth/signUp/Xx"}>{signUpLabel}<span className=" text-[#52BAAB] font-semibold ">{" " + signUpButton}</span></Link>

            </div>

        </div>


    )
}
