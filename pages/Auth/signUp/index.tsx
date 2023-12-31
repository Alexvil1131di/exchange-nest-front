'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import useRegisterForm from "@/store/singUpStore";
import { useRegister } from "@/hooks/auth/hooks";
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Home() {


    const { firstName, lastName, email, countryId, password, confirmedPassword, setFirstName, setLastName, setEmail, setCountryId, setPassword, setConfirmedPassword, reset } = useRegisterForm()
    const { mutateAsync: registerUser } = useRegister()
    const router = useRouter();

    function handleSubmit(e) {
        e.preventDefault()
        let userData = { firstName, lastName, nic: "4024024024024", email, password, birthDate: "2023-12-23T13:19:20.844Z", roleId: 1, statusId: 1, organizationId: 1, countryId: 1 }
        if (password == confirmedPassword) {
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

                    <InputComponent label="Country" required={true} placeholder="Enter your email" type="dropdown" name="country" value={countryId ? String(countryId) : ""} hasAnError={false}
                        width="w-full " onChange={setCountryId} options={["Opcion 1", "Opcion 2"]}
                        errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Password" required={true} placeholder="Enter your Password" type="password" name="password" value={password} hasAnError={false}
                        width="w-full " onChange={(e) => { setPassword(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Confirm password" required={true} placeholder="Confirm your Password" type="password" name="password" value={confirmedPassword} hasAnError={password !== confirmedPassword}
                        width="w-full " onChange={(e) => { setConfirmedPassword(e.target.value) }} errorMessage={"Your passwords do not match "} />

                    <CustomizableButton text={"SING UP"} maxSize="w-full h-[42px]" type="submit" onClick={() => { }} ></CustomizableButton>

                </form>



            </div>

        </div >


    )
}

