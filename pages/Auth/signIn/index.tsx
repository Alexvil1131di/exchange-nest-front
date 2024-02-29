'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import CheckBoxWithLabel from "@/components/inputs/CheckBoxWithLabel";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import useLoginForm from "@/store/singInStore";
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

    const { email, password, rememberMe, userData, setEmail, setPassword, setRememberMe, setUserData } = useLoginForm();
    const { mutateAsync: loginUser } = useLogin()
    const { mutateAsync: changePassWord } = useChangePasswordEmail()

    const router = useRouter();

    const [showModal, setShowModal] = useState(false)
    const [changePassEmail, setChangePassEmail] = useState("")

    useEffect(() => { if (!rememberMe) { setEmail(""); setPassword("") } else { setRememberMe(true) } }, [rememberMe])

    const handleSubmit = (e) => {
        e.preventDefault()
        toast.promise(loginUser({ email: stringDecrypter(email), password: stringDecrypter(password) }), {
            pending: 'Loggin in',
            success: `Sucessfully logged in`,
            error: `An error has occurred, please try again later`,
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
            pending: 'Sending email',
            success: `Email sended, please check your inbox`,
            error: `An error has occurred, please try again later`,
        }).then(() => {
            setShowModal(false)
        }).catch((err) => { console.log(err) })
    }

    return (

        <div className="flex w-screen h-screen">
            {showModal && <ResetPasswordModal title={"Reset Password"} actionMessage={"Enter your user account's verified email address and we will send you a password reset link."}
                acctionConfirm={() => { handleResetPassword() }} acctionReject={() => { setShowModal(false) }} value={changePassEmail} onChange={(e) => { setChangePassEmail(e.target.value) }} />
            }

            <img className="hidden select-none lg:inline w-full h-full object-center object-cover" src="/loginBackground.png" alt="" />

            <div className="flex flex-col w-full gap-[40px] h-full items-center pt-[60px] px-4 pb-4 flex-nowrap overflow-scroll">

                <div className=" w-full max-w-[300px] h-[200px] flex-nowrap">
                    <ExchangeNestLogo className="w-full h-full" />
                </div>

                <div className="flex flex-col w-full max-w-[600px] gap-2">
                    <h1 className="text-[24px]">Sign in to ExchangeNest</h1>
                    <p className="text-[16px]">Now you just have to enter your username and password and enjoy everything that Pidebot offers you.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label="Email" required={true} placeholder="Enter your email" type="email" name="email" value={stringDecrypter(email)} hasAnError={false}
                        width="w-full " onChange={(e) => { setEmail(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="password" required={true} placeholder="Password" type="password" name="password" value={stringDecrypter(password)} hasAnError={false}
                        width="w-full " onChange={(e) => setPassword(e.target.value)} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <div className="w-full text-[14px] flex justify-between">
                        <CheckBoxWithLabel label={"Remember me"} id={"recuerdame"} checked={rememberMe as boolean} onChange={() => { setRememberMe() }} />
                        <button type="button" onClick={() => { setShowModal(true) }} className=" underline">Forgot password?</button>
                    </div>

                    <CustomizableButton text={"SING IN"} maxSize="w-full h-[42px]" type="submit" onClick={() => { }} ></CustomizableButton>

                </form>

                <Link href={"/Auth/signUp/Xx"}> New to Exchange Nest? <span className=" text-[#52BAAB] font-semibold ">Join now</span></Link>

            </div>

        </div>


    )
}
