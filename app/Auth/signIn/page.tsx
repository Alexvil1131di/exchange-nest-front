'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import CheckBoxWithLabel from "@/components/inputs/CheckBoxWithLabel";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import Link from "next/link";
import useLoginForm from "@/store/singInStore";
import { stringDecrypter } from "@/hooks/auth/methods";
import { useEffect } from "react";

export default function SignUp() {

    const { email, password, rememberMe, setEmail, setPassword, setRememberMe } = useLoginForm();

    useEffect(() => { if (!rememberMe) { setEmail(""); setPassword("") } else { setRememberMe(true) } }, [rememberMe])



    return (

        <div className="flex w-screen h-screen">


            <img className="hidden select-none lg:inline w-full h-full object-center object-cover" src="/loginBackground.png" alt="" />


            <div className="flex flex-col w-full gap-[40px] h-full items-center pt-[60px] px-4 pb-4 flex-nowrap overflow-scroll">

                <div className=" w-full max-w-[300px] h-[200px] flex-nowrap">
                    <ExchangeNestLogo className="w-full h-full" />
                </div>

                <div className="flex flex-col w-full max-w-[600px] gap-2">
                    <h1 className="text-[24px]">Sign in to ExchangeNest</h1>
                    <p className="text-[16px]">Now you just have to enter your username and password and enjoy everything that Pidebot offers you.</p>
                </div>

                <form className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label="Email" required={true} placeholder="Enter your email" type="email" name="email" value={stringDecrypter(email)} hasAnError={false}
                        width="w-full " onChange={(e) => { setEmail(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="password" required={true} placeholder="Password" type="password" name="password" value={stringDecrypter(password)} hasAnError={false}
                        width="w-full " onChange={(e) => setPassword(e.target.value)} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <div className="w-full text-[14px] flex justify-between">
                        <CheckBoxWithLabel label={"Remember me"} id={"recuerdame"} checked={rememberMe as boolean} onChange={() => { setRememberMe() }} />
                        <Link href="#" className=" underline">Forgot password?</Link>
                    </div>

                    <CustomizableButton text={"SING IN"} type="submit" onClick={() => { }} ></CustomizableButton>

                </form>



            </div>

        </div>


    )
}
