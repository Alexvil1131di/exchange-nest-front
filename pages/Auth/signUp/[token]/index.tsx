'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import useRegisterForm from "@/store/singUpStore";
import OpenEye from "@/public/openEye.svg"
import CloseEye from "@/public/closeEye.svg"


import { useRegister } from "@/hooks/auth/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useGetStatus, useGetRoles, useGetCountries } from "@/hooks/genericData/hooks";
import { useState } from "react";
import { getStatusIdByName, getStatusNameById } from "@/hooks/genericData/methods";

export default function Home() {


    const { firstName, lastName, email, countryId, password, confirmedPassword, roleId, nic, statusId, organizationId, setFirstName, setLastName, setEmail, setCountryId, setNic, setPassword, setConfirmedPassword, reset } = useRegisterForm()
    const [idError, setIdError] = useState(false)
    const [viewPassword1, setViewPassword1] = useState<"password" | "text">("password")
    const [viewPassword2, setViewPassword2] = useState<"password" | "text">("password")

    const { mutateAsync: registerUser } = useRegister(setIdError)
    const { data: countries } = useGetCountries()

    const router = useRouter();
    const token = router.query.token as string
    const countryOptions = countries?.map((item) => item.description)
    const passwordRegex = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{6,}$/

    function setCountry(country: string) {
        setCountryId(getStatusIdByName(country, countries) as number)
    }

    function handleSubmit(e) {
        e.preventDefault()
        let userData = { firstName, lastName, nic: nic, email, password, birthDate: "2023-12-23T13:19:20.844Z", roleId: token?.includes("token") ? 3 : 1, statusId: 1, organizationId, countryId: 1, token: token?.split("token=")[1] }
        if (password == confirmedPassword && (passwordRegex.test(password))) {
            toast.promise(registerUser(userData), {
                pending: 'Creating user',
                success: `User ${firstName} created successfully`,
                error: `The email ${email} is already in use`,
            }).then(() => {
                reset()
                router.push("/Auth/signIn")
            }).catch((err) => { console.log(err) })

        }

    }

    return (

        <div className="flex w-full h-screen ">

            <img className="hidden select-none lg:inline w-full object-center object-cover" src="/loginBackground.png" alt="" />


            <div className="flex flex-col w-full gap-[40px] h-full items-center py-[60px] px-4 flex-nowrap overflow-scroll">

                <div className=" w-full max-w-[300px] h-[200px] flex-nowrap">
                    <ExchangeNestLogo className="w-full h-full" />
                </div>

                <div className="flex flex-col w-full max-w-[600px] gap-2">
                    <h1 className="text-[24px]">Sign up to ExchangeNest</h1>
                    <p className="text-[16px]">¡Welcome to ExchangeNest! To make the most of our platform and access all its incredible features, we invite you to register.</p>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }} className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label="First name" required={true} placeholder="Enter your First name " type="text" name="first-name" value={firstName} hasAnError={false}
                        width="w-full " onChange={(e) => { setFirstName(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Last name" required={true} placeholder="Enter your Last name " type="text" name="last-name" value={lastName} hasAnError={false}
                        width="w-full " onChange={(e) => { setLastName(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Email" required={true} placeholder="Enter your email" type="email" name="email" value={email} hasAnError={false}
                        width="w-full " onChange={(e) => { setEmail(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="ID" required={true} placeholder="Enter your id or passport" type="text" name="id" value={nic} hasAnError={idError}
                        width="w-full " onChange={(e) => { setNic(e.target.value) }} errorMessage={"An error has occurred, please use a valid id."} />

                    <InputComponent type={'dropdown'} placeholder="Select a country" value={getStatusNameById(countryId, countries)} required={true} label='Country' width='w-full' options={countryOptions} errorMessage={''} onChange={setCountry} />

                    <InputComponent label="Password" required={true} placeholder="Enter your Password" type={viewPassword1} name="password" value={password} hasAnError={password.length > 0 && !(passwordRegex.test(password))}
                        width="w-full " onChange={(e) => { setPassword(e.target.value) }} endIcon={viewPassword1 == "password" ? <CloseEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword1("text") }} /> : <OpenEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword1("password") }} />}
                        errorMessage={(passwordRegex.test(password)) ? "An error has occurred, please fill in the appropriate field." : "Your password must include at least one uppercase letter, one special character, one number, and be at least 6 characters long."} />

                    <InputComponent label="Confirm password" required={true} placeholder="Confirm your Password" type={viewPassword2} name="password" value={confirmedPassword} hasAnError={password !== confirmedPassword}
                        width="w-full " onChange={(e) => { setConfirmedPassword(e.target.value) }} endIcon={viewPassword2 == "password" ? <CloseEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword2("text") }} /> : <OpenEye className=" w-7 h-7 mr-4 cursor-pointer" onClick={() => { setViewPassword2("password") }} />}
                        errorMessage={(passwordRegex.test(password)) ? "An error has occurred, please fill in the appropriate field." : "Your password must include at least one uppercase letter, one special character, one number, and be at least 6 characters long."} />

                    <CustomizableButton text={"SING UP"} maxSize="w-full h-[42px]" type="submit" onClick={() => { }} ></CustomizableButton>

                </form>



            </div>

        </div >


    )
}

