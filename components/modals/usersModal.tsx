import React, { useEffect, useState } from "react";
import InputComponent from "../inputs/InputComponent";
import ImageUpload from "../inputs/imageUpload";
import X from "@/public/x.svg";
import CustomizableButton from "../buttons/CustomizableButton";
import useUserForm from "@/store/usersStore";
import { useGetOrganizations } from "@/hooks/Institutions/hooks";
import { useGetStatus } from "@/hooks/status/hooks";
import { getStatusIdByName, getStatusNameById } from "@/hooks/status/methods";


interface UserModal {
    closeModal: Function;
    headerMessage: string;
    onSubmit: Function;
}

const UserModal = ({ closeModal, headerMessage, onSubmit }: UserModal) => {
    const [submitted, setSubmitted] = useState<boolean>(false)
    const { user, setFirstName, setLastName, setImage, setEmail, setPassword, setNic, setCountryId, setOrganizationId, setRoleId, setStatusId } = useUserForm();

    const { data: organizations } = useGetOrganizations()
    const { data: statuses } = useGetStatus();

    const organizationName = organizations?.map((organization) => organization.name)
    const institutionStatus = statuses?.slice(0, 2).map((status) => status.description)


    function getSelectedName(id: number | undefined) {
        return id ? organizations?.find((organization) => organization.id === id)?.name : ""
    }

    function setOrganizationIdByName(name: string) {
        let organizationId = organizations?.find((organization) => organization.name === name)?.id
        organizationId && setOrganizationId(organizationId)
    }

    function getStatusIdByName(status: string) {
        let StatusId = statuses?.find((statusObject) => statusObject.description == status)?.id
        setStatusId(StatusId as number)
    }

    return (
        <>

            <div className="fixed top-14 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-[#0000004b] z-10 ">

                <form onSubmit={(e) => { e.preventDefault(), onSubmit() }} className="flex flex-col w-full max-w-[1222px] bg-white rounded-md overflow-scroll ">

                    <div className="flex items-center justify-between h-16 w-full max-w-[1222px] bg-[#52BAAB] text-center text-white text-[24px] font-bold">
                        <div></div>
                        {headerMessage}
                        <X className={`w-8 h-8 bg-white fill-[#52BAAB] rounded-full p-2 mr-2 cursor-pointer`} onClick={closeModal} />
                    </div>

                    <div className="flex flex-col md:flex-row w-full ">

                        <div className="flex flex-col max-w-[462px] p-3 w-full  items-center justify-center">
                            <ImageUpload image={user.image} description={"UPLOAD YOUR OWN IMAGE"} errorMessage={"El tamaño del logo debe ser inferior a los 2mb"} imageOnChange={setImage} height={"h-[160px]"} uniqueKey={"commerceImage"} maxWidth={"max-w-[160px]"} maxSize={200000000} />
                        </div>

                        <div className="flex flex-col w-full p-6 pt-12 gap-4">

                            <div className="flex flex-col md:flex-row w-full max-h-[644px] gap-3  ">
                                <div className="flex flex-col gap-6 items-end w-full ">

                                    <InputComponent type={'text'} value={user.firstName} required={true} label='First Name' width='w-full ' errorMessage={''} onChange={(e) => { setFirstName(e.target.value) }} />

                                    <InputComponent type={'text'} value={user.lastName} required={true} label='Last Name' width='w-full ' errorMessage={''} onChange={(e) => { setLastName(e.target.value) }} />

                                    <InputComponent type={'text'} value={user.nic} required={true} label='Id or PassportNumber' width='w-full' errorMessage={''} onChange={(e) => { setNic(e.target.value) }} />

                                    <InputComponent type={'email'} value={user.email} required={true} label='Email' width='w-full ' errorMessage={''} onChange={(e) => { setEmail(e.target.value) }} />

                                    {!user.id && <InputComponent type={'password'} value={user?.password} required={true} label='Password' width='w-full ' errorMessage={''} onChange={(e) => { setPassword(e.target.value) }} />}
                                </div>

                                <div className="flex flex-col gap-6 items-end w-full ">

                                    <InputComponent type={'dropdown'} value={user.roleId ? "Student" : ""} required={true} label='User Rol' width='w-full' options={["Student"]} errorMessage={''} onChange={(e) => { setRoleId(1) }} />

                                    <InputComponent type={'dropdown'} value={getStatusNameById(user?.statusId as number, statuses)} required={true} label='Status' width='w-full' errorMessage={''} options={institutionStatus} onChange={getStatusIdByName} />

                                    <InputComponent type={'dropdown'} value={getSelectedName(user?.organizationId)} required={true} label='Institution' width='w-full' options={organizationName} errorMessage={''} onChange={setOrganizationIdByName} />

                                    <InputComponent type={'dropdown'} value={String(user.countryId)} required={true} label='Country' width='w-full' errorMessage={''} options={["1"]} onChange={(e) => { setCountryId(1) }} />

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="flex w-full justify-end p-3 text-[14px]">
                        <CustomizableButton type="submit" text={`${user.id ? "UPDATE" : "CREATE"} USER`} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:w-[180px] h-[45px]' onClick={() => { }} />
                    </div>

                </form>

            </div >

        </>
    );
};

export default UserModal;
