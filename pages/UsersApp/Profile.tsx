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
import UserNavBar from "@/components/usersNavBar";
import ImageUpload from "@/components/inputs/imageUpload";
import { profile } from "console";

export default function Home() {


    const { firstName, lastName, id, email, countryId, profileImg, roleId, nic, statusId, organizationId, setFirstName, setAll, setLastName, setEmail, setCountryId, setNic, setProfileImg, reset } = useRegisterForm()
    const { userData, language, setLanguage, getTexts, getUserData } = useLoginForm();
    const { userProfileLabel, editProfileButton, firstNameLabel, firstNamePlaceholder, goBackButton, lastNameLabel, lastNamePlaceholder, emailPlaceholder, idPlaceholder, countryLabel, countryPlaceholder } = getTexts("UsersApp")

    const [idError, setIdError] = useState(false)
    const { mutateAsync: getUserById } = useGetUserById()
    const { mutateAsync: updateUser } = useUpdateUser()

    const { data: countries } = useGetCountries()


    const router = useRouter();
    const token = router.query.token as string
    const user = getUserData()
    const countryOptions = countries?.map((item) => item.description)

    useEffect(() => {

        getUserById(user?.id).then((data) => {
            setAll(data.id as number, data.firstName, data.lastName, (data.countryId as number), (data.roleId as number), (data.statusId as number), (data.organizationId as number), data.email, data.nic, data.imageUrl)
        })


    }, [])

    function handleSubmit(e) {
        e.preventDefault()
        let userData = { id, firstName, imageUrl: profileImg, lastName, nic: nic, email, birthDate: "2023-12-23T13:19:20.844Z", roleId: token?.includes("token") ? 3 : 1, statusId: 1, organizationId, countryId: 1, token: token?.split("token=")[1] }
        toast.promise(updateUser(userData).catch(), {
            pending: 'Updating user',
            success: `User ${firstName} updated successfully`,
            error: `The user could not be updated`,
        }).then(() => {
            router.push("/UsersApp")
        }).catch((err) => { console.log(err) })



    }

    function setCountry(country: string) {
        setCountryId(getStatusIdByName(country, countries) as number)
    }

    console.log(profileImg)

    return (

        <div className="flex w-full h-full ">

            <div className="flex flex-col gap-3 h-full w-full items-center p-5 mt-4 ">

                <div className='flex w-full justify-between'>
                    <button type='button' onClick={() => { router.back(); }} className='text-[16px] underline' >{goBackButton}</button>

                    <div className="flex items-center justify-center gap-4">
                        <InputComponent unCheck={false} bgColor="" border="" type={'dropdown'} label='' width='w-fit h-fit px-[-10px]' value={user ? language : ""} errorMessage={''} onChange={(value) => { setLanguage(value) }} options={["En", "Es"]} />
                        <ActiveUser color="#000000" commerceName={user?.firstName as string} commerceImage={"/logo.svg"} userEmail={user?.email as string} />
                    </div>
                </div>

                <div className="flex w-full max-w-[600px] gap-2 py-4">
                    <h1 className="text-[18px]">{userProfileLabel}</h1>
                </div>

                <form onSubmit={(e) => { handleSubmit(e) }} className="flex w-full items-center gap-8 justify-center border-spacing-0">

                    <div className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center mb-[124px] ">
                        <div className="w-full max-w-[160px] mb-4">
                            <ImageUpload showButton={false} image={profileImg} description={"UPLOAD YOUR OWN IMAGE"} errorMessage={"El tamaño del logo debe ser inferior a los 2mb"} imageOnChange={setProfileImg} height={"h-[160px]"} uniqueKey={"commerceImage"} maxWidth={`max-w-[160px] rounded-full ${profileImg ? "border-none" : "border-solid"} `} maxSize={200000000} />
                        </div>

                        <InputComponent bgColor="" label={firstNameLabel} required={true} placeholder={firstNamePlaceholder} type="text" name="first-name" value={firstName} hasAnError={false}
                            width="w-full " onChange={(e) => { setFirstName(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                        <InputComponent bgColor="" label={lastNameLabel} required={true} placeholder={lastNamePlaceholder} type="text" name="last-name" value={lastName} hasAnError={false}
                            width="w-full " onChange={(e) => { setLastName(e.target.value) }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                        <InputComponent bgColor="#ffffff" type={'dropdown'} value={getStatusNameById(countryId, countries)} required={true} label={countryLabel} placeholder={countryPlaceholder} width='w-full' options={countryOptions} errorMessage={''} onChange={setCountry} />

                        <InputComponent bgColor="" label="ID" required={true} placeholder={idPlaceholder} type="text" name="id" value={nic} hasAnError={idError}
                            width="w-full " onChange={(e) => { setNic(e.target.value) }} errorMessage={"An error has occurred, please use a valid id."} />



                    </div>

                    <button type='submit' className={`w-full fixed bottom-16 h-11 text-[#ffffff] text-[12px] font-bold bg-[#52BAAB] `}>{editProfileButton}</button>

                </form>



            </div>

            <UserNavBar />

        </div >


    )
}

