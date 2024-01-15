import React, { useEffect, useState } from "react";
import InputComponent from "../inputs/InputComponent";
import ImageUpload from "../inputs/imageUpload";
import X from "@/public/x.svg";
import useInstitutionForm from "@/store/institutionsStore";
import CustomizableButton from "../buttons/CustomizableButton";
import { useGetStatus } from "@/hooks/status/hooks";
import { getStatusIdByName, getStatusNameById } from "@/hooks/status/methods";


interface InstitutionModal {
    closeModal: Function;
    headerMessage: string;
    onSubmit: Function;
}

const InstitutionModal = ({ closeModal, headerMessage, onSubmit }: InstitutionModal) => {
    const [submitted, setSubmitted] = useState<boolean>(false)
    const { institution, setName, setDescription, setEmail, setPhoneNumber, setAddress, setOrganizationTypeId, setStatusId, setImage } = useInstitutionForm();

    const institutionTypes = [{
        id: 1,
        name: "Public",
    }, {
        id: 2,
        name: "Private",
    }]

    const { data: statuses } = useGetStatus();

    const institutionType = institutionTypes?.map((type) => type.name)
    const institutionStatus = statuses?.slice(0, 2).map((status) => status.description)

    function getInstitutionStatusById(id: number) {
        return id ? institutionTypes?.find((type) => type.id === id)?.name : ""
    }

    function getInstitutionStatusByName(name: string) {
        let institutionTypeId = institutionTypes?.find((type) => type.name === name)?.id
        institutionTypeId && setOrganizationTypeId(institutionTypeId)
    }

    function setStatusIdByName(status: string) {
        setStatusId(getStatusIdByName(status, statuses) as number)
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
                            <ImageUpload image={institution.imageUrl} description={"UPLOAD YOUR OWN IMAGE"} errorMessage={"El tamaño del logo debe ser inferior a los 2mb"} imageOnChange={setImage} height={"h-[160px]"} uniqueKey={"commerceImage"} maxWidth={"max-w-[160px]"} maxSize={200000000} />
                        </div>

                        <div className="flex flex-col w-full p-6 pt-12 gap-4">

                            <div className="flex flex-col md:flex-row w-full max-h-[644px] gap-3  ">
                                <div className="flex flex-col gap-6 items-end w-full ">

                                    <InputComponent type={'text'} value={institution.name} required={true} label='Institution Name' width='w-full ' errorMessage={''} onChange={(e) => { setName(e.target.value) }} />

                                    <InputComponent type={'text'} value={institution.address} required={true} label='Address' width='w-full ' errorMessage={''} onChange={(e) => { setAddress(e.target.value) }} />

                                    <InputComponent type={'email'} value={institution.email} required={true} label='Email' width='w-full ' errorMessage={''} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>

                                <div className="flex flex-col gap-6 items-end w-full ">

                                    <InputComponent type={'tel'} value={institution.phoneNumber} required={true} label='Phone Number' width='w-full ' errorMessage={''} onChange={setPhoneNumber} />

                                    <InputComponent type={'dropdown'} value={getInstitutionStatusById(institution.organizationTypeId as number)} required={true} label='Type Of Institution' width='w-full' options={institutionType} errorMessage={''} onChange={getInstitutionStatusByName} />

                                    <InputComponent type={'dropdown'} value={getStatusNameById(institution?.statusId as number, statuses)} required={true} label='Status' width='w-full' errorMessage={''} options={institutionStatus} onChange={setStatusIdByName} />

                                </div>

                            </div>

                            <InputComponent type={'textarea'} value={institution.description} required={true} height='h-[80px]' label='Description' width='w-full ' errorMessage={''} onChange={(e) => { setDescription(e.target.value) }} />

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
