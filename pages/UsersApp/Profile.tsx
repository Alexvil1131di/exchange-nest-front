'use client'
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import useRegisterForm from "@/store/singUpStore";
import useLoginForm from "@/store/singInStore";
import { useRegister } from "@/hooks/auth/hooks";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useGetUserById, useUpdateUser } from "@/hooks/users/hooks";
import { useEffect, useState } from "react";
import { useGetCountries } from "@/hooks/genericData/hooks";
import { getStatusIdByName, getStatusNameById } from "@/hooks/genericData/methods";
import ActiveUser from "@/components/inputs/ActiveUserDropDown";

export default function Home() {


    const { firstName, lastName, email, countryId, password, confirmedPassword, roleId, nic, statusId, organizationId, setFirstName, setAll, setLastName, setEmail, setCountryId, setNic, setPassword, setConfirmedPassword, reset } = useRegisterForm()
    const { getUserData } = useLoginForm();
    const [idError, setIdError] = useState(false)
    const { mutateAsync: registerUser } = useRegister(setIdError)
    const { mutateAsync: getUserById } = useGetUserById()
    const { mutateAsync: updateUser } = useUpdateUser()

    const { data: countries } = useGetCountries()


    const router = useRouter();
    const token = router.query.token as string
    const user = getUserData()
    const countryOptions = countries?.map((item) => item.description)

    useEffect(() => {

        getUserById(user?.id).then((data) => {
            setAll(data.firstName, data.lastName, (data.countryId as number), (data.roleId as number), (data.statusId as number), (data.organizationId as number), data.email, data.nic)
        })


    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        let userData = { firstName, lastName, nic: nic, email, password, birthDate: "2023-12-23T13:19:20.844Z", roleId: token?.includes("token") ? 3 : 1, statusId: 1, organizationId, countryId: 1, token: token?.split("token=")[1] }
        if (password == confirmedPassword) {
            toast.promise(updateUser(userData).catch(), {
                pending: 'Updating user',
                success: `User ${firstName} updated successfully`,
                error: `The user could not be updated`,
            }).then(() => {
                router.push("/UsersApp")
            }).catch((err) => { console.log(err) })

        }

    }

    function setCountry(country: string) {
        setCountryId(getStatusIdByName(country, countries) as number)
    }

    return (

        <div className="flex w-full h-full ">

            <div className="flex flex-col gap-3 h-full w-full items-center p-5 mt-4 ">

                <div className='flex w-full justify-between'>
                    <button type='button' onClick={() => { router.back(); }} className='text-[16px] underline' >{"< Go Back"}</button>

                    <div className="flex items-center justify-center gap-4">
                        <ActiveUser color="#000000" commerceName={user?.firstName as string} commerceImage={"/logo.svg"} userEmail={user?.email as string} />
                    </div>
                </div>

                <div className="flex w-full max-w-[600px] gap-2 py-4">
                    <h1 className="text-[18px]">User Profile</h1>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }} className="flex w-full items-center gap-8 justify-center">

                    <div className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center mb-[54px] ">
                        <InputComponent bgColor="" label="First name" required={true} placeholder="Enter your First name " type="text" name="first-name" value={firstName} hasAnError={false}
                            width="w-full " onChange={(e) => { setFirstName(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                        <InputComponent bgColor="" label="Last name" required={true} placeholder="Enter your Last name " type="text" name="last-name" value={lastName} hasAnError={false}
                            width="w-full " onChange={(e) => { setLastName(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                        <InputComponent bgColor="" label="Email" required={true} placeholder="Enter your email" type="email" name="email" value={email} hasAnError={false}
                            width="w-full " onChange={(e) => { setEmail(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                        <InputComponent bgColor="" label="ID" required={true} placeholder="Enter your id or passport" type="text" name="id" value={nic} hasAnError={idError}
                            width="w-full " onChange={(e) => { setNic(e.target.value) }} errorMessage={"An error has occurred, please use a valid id."} />

                        <InputComponent bgColor="" type={'dropdown'} value={getStatusNameById(countryId, countries)} required={true} label='Country' width='w-full' options={countryOptions} errorMessage={''} onChange={setCountry} />


                    </div>

                    <button type='submit' className={`w-full fixed bottom-0 h-11 text-[#ffffff] text-[12px] font-bold bg-[#52BAAB] `}>Edit Profile</button>

                </form>



            </div>

        </div >


    )
}

