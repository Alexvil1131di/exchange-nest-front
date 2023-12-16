'use client'
import CustomizableButton from "@/components/buttons/CustomizableButton";
import CheckBoxWithLabel from "@/components/inputs/CheckBoxWithLabel";
import InputComponent from "@/components/inputs/InputComponent"
import ExchangeNestLogo from "@/public/ExchangeNestLogo.svg"
import Link from "next/link";

export default function Home() {
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

                <form className="flex flex-col w-full max-w-[600px] items-center gap-8 justify-center">

                    <InputComponent label="First name" required={true} placeholder="Enter your First name " type="text" name="first-name" value="" hasAnError={false}
                        width="w-full " onChange={() => { }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Last name" required={true} placeholder="Enter your Last name " type="text" name="last-name" value="" hasAnError={false}
                        width="w-full " onChange={() => { }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Email" required={true} placeholder="Enter your email" type="email" name="email" value="" hasAnError={false}
                        width="w-full " onChange={(e) => { }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Country" required={true} placeholder="Enter your email" type="dropdown" name="country" value="" hasAnError={false}
                        width="w-full " onChange={(e) => { }} options={["Opcion 1", "Opcion 2"]}
                        errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Password" required={true} placeholder="Enter your Password" type="password" name="password" value="" hasAnError={false}
                        width="w-full " onChange={() => { }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <InputComponent label="Confirm password" required={true} placeholder="Confirm your Password" type="password" name="password" value="" hasAnError={false}
                        width="w-full " onChange={() => { }} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <CustomizableButton text={"SING UP"} type="submit" onClick={() => { }} ></CustomizableButton>

                </form>



            </div>

        </div >


    )
}
