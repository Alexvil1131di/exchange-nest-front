import React, { useEffect, useState } from "react";
import InputComponent from "../inputs/InputComponent";
import ImageUpload from "../inputs/imageUpload";
import X from "@/public/x.svg";
import useInstitutionForm from "@/store/institutionsStore";
import CustomizableButton from "../buttons/CustomizableButton";
import { useGetStatus, useGetOrganizationTypes } from "@/hooks/genericData/hooks";
import { getStatusIdByName, getStatusNameById } from "@/hooks/genericData/methods";


interface InstitutionModal {
    closeModal: Function;
    headerMessage: string;
    onSubmit: Function;
}

const InstitutionModal = ({ closeModal, headerMessage, onSubmit }: InstitutionModal) => {
    const [submitted, setSubmitted] = useState<boolean>(false)
    const { institution, setName, setDescription, setEmail, setPhoneNumber, setAddress, setOrganizationTypeId, setStatusId, setImage } = useInstitutionForm();


    const { data: statuses } = useGetStatus();
    const { data: organizationTypes } = useGetOrganizationTypes();

    const institutionStatus = statuses?.slice(0, 2).map((status) => status.description)
    const organizationType = organizationTypes?.map((type) => type.description)

    function getInstitutionStatusById(id: number) {
        return id ? organizationTypes?.find((type) => type.id === id)?.description : ""
    }

    function getInstitutionStatusByName(name: string) {
        let institutionTypeId = organizationTypes?.find((type) => type.description === name)?.id
        institutionTypeId && setOrganizationTypeId(institutionTypeId)
    }

    function setStatusIdByName(status: string) {
        setStatusId(getStatusIdByName(status, statuses) as number)
    }


    return (
        <>

            <div className="fixed top-14 left-0 right-0 bottom-0 flex flex-col justify-center items-center bg-[#0000004b] z-10 ">

                <form onSubmit={(e) => { e.preventDefault(), onSubmit() }} className="flex flex-col w-full max-w-[1222px] bg-[#ffffffe6] rounded-md overflow-scroll ">

                    <div className="flex items-center justify-between h-16 w-full max-w-[1222px] bg-[#52BAAB] text-center text-white text-[24px] font-bold">
                        <div></div>
                        {headerMessage}
                        <X className={`w-8 h-8 bg-white fill-[#52BAAB] rounded-full p-2 mr-2 cursor-pointer`} onClick={closeModal} />
                    </div>

                    <div className="flex flex-col md:flex-row w-full ">

                        <div className="flex flex-col max-w-[462px] p-3 w-full  items-center justify-center">
                            <ImageUpload image={institution.imageUrl} description={"UPLOAD YOUR OWN IMAGE"} errorMessage={"El tamaño del logo debe ser inferior a los 2mb"} imageOnChange={setImage} height={"h-[160px]"} uniqueKey={"commerceImage"} maxWidth={"max-w-[160px]"} maxSize={200000000} />
                        </div>

                        <div className="flex flex-col w-full p-6 pt-12 gap-4">

                            <div className="flex flex-col md:flex-row w-full max-h-[644px] gap-3  ">
                                <div className="flex flex-col gap-6 items-end w-full ">

                                    <InputComponent type={'text'} bgColor="#ffffff" value={institution.name} required={true} label='Institution Name' width='w-full ' errorMessage={''} onChange={(e) => { setName(e.target.value) }} placeholder='Enter institution name' />

                                    <InputComponent type={'text'} bgColor="#ffffff" value={institution.address} required={true} label='Address' width='w-full ' errorMessage={''} onChange={(e) => { setAddress(e.target.value) }} placeholder='Enter address' />

                                    <InputComponent type={'email'} bgColor="#ffffff" value={institution.email} required={true} label='Email' width='w-full ' errorMessage={''} onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter email' />
                                </div>

                                <div className="flex flex-col gap-6 items-end w-full ">

                                    <InputComponent type={'tel'} bgColor="#ffffff" value={institution.phoneNumber} required={true} label='Phone Number' width='w-full ' errorMessage={''} onChange={setPhoneNumber} placeholder='Enter phone number' />

                                    <InputComponent type={'dropdown'} bgColor="#ffffff" value={getInstitutionStatusById(institution.organizationTypeId as number)} required={true} label='Type Of Institution' width='w-full' options={organizationType} errorMessage={''} onChange={getInstitutionStatusByName} placeholder='Select institution type' />

                                    <InputComponent type={'dropdown'} bgColor="#ffffff" value={getStatusNameById(institution?.statusId as number, statuses)} required={true} label='Status' width='w-full' errorMessage={''} options={institutionStatus} onChange={setStatusIdByName} placeholder='Select status' />

                                </div>

                            </div>

                            <InputComponent type={'textarea'} bgColor="#ffffff" value={institution.description} required={true} height='h-[80px]' label='Description' width='w-full ' errorMessage={''} onChange={(e) => { setDescription(e.target.value) }} placeholder='Enter description' />

                        </div>

                    </div>

                    <div className="flex w-full justify-end p-3 text-[14px]">
                        <CustomizableButton type="submit" text={`${institution.id ? "UPDATE" : "CREATE"} INSTITUTIONS`} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:w-[180px]  h-[45px]' onClick={() => { }} />
                    </div>

                </form>

            </div >

        </>
    );
};

export default InstitutionModal;
