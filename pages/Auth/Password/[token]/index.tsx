'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useChangePassword } from "@/hooks/auth/hooks";
import { toast } from "react-toastify";

export default function Home() {
    const router = useRouter();
    const token = router.query.token as string
    const [password, setPassword] = useState("")
    const [confirmedPassword, setConfirmedPassword] = useState("")
    const { mutateAsync: changePassWord } = useChangePassword()

    const handlePasswordChange = (e) => {
        e.preventDefault()
        if (password == confirmedPassword && token?.split("token=")[1]) {

            toast.promise(
                changePassWord({ newPassword: password, token: token?.split("token=")[1] }), {
                pending: 'Changing password',
                success: `Password changed successfully`,
                error: `An error has occurred, please try again later`,
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
                    <h1 className="text-[24px]">Reset your password</h1>
                    <p className="text-[16px]">Set the new password for your account so you can login and access all featuress.</p>
                </div>

                <form onSubmit={handlePasswordChange} className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label="Password" required={true} placeholder="Enter your new Password" type="password" name="password" value={password} hasAnError={false}
                        width="w-full " onChange={(e) => { setPassword(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Confirm password" required={true} placeholder="Confirm your new Password" type="password" name="password" value={confirmedPassword} hasAnError={password == confirmedPassword ? false : true}
                        width="w-full " onChange={(e) => { setConfirmedPassword(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <CustomizableButton text={"UPDATE PASSWORD"} type="submit" onClick={() => { }} ></CustomizableButton>

                </form>



            </div>

        </div>


    )
}
