import CustomizableButton from "@/components/buttons/CustomizableButton";
import InputComponent from "@/components/inputs/InputComponent";
import Modal from "@/components/modals/genericModal";
import NavBar from "@/components/navBar";
import { useGetStatus } from "@/hooks/genericData/hooks";
import { useGetProgramsByIdStore } from "@/hooks/programs/hooks";
import { useGetUserByIdStore } from "@/hooks/users/hooks";
import { useGetApplications, useGetApplicationById, useUpdateApplication } from "@/hooks/usersApp/hooks";
import { applications } from "@/interfaces/usersAppInterface";
import { useRouter } from "next/router";
import { useState } from "react";

import { getStatusNameById } from "@/hooks/genericData/methods";

const ReviewApplication = () => {

    const router = useRouter();
    const { id } = router.query

    const { data: application, refetch } = useGetApplicationById(id ? parseInt(id as string) : undefined);
    const { data: program } = useGetProgramsByIdStore(application?.programId ? application?.programId : undefined);
    const { data: users } = useGetUserByIdStore(application?.studentId ? application?.studentId : undefined)
    const { data: status } = useGetStatus()
    const { mutateAsync: updateApplication } = useUpdateApplication()

    const statusArray = status?.map((status) => status.description)
    const [statusName, setStatusName] = useState('')

    const [openModal, setOpenModal] = useState(false)
    const [rejectReason, setRejectReason] = useState('')
    const [rejectData, setRejectData] = useState<{ documentId: number, type: "required" | "application", statusId: number }>()

    function onChangeDocumentStatus(documentId: number, type: "required" | "application", statusId: number) {

        let updatedRequiredDocuments = application?.requiredDocuments
        let applicationDocuments = application?.applicationDocuments

        if (type == "required") {
            updatedRequiredDocuments = application?.requiredDocuments?.map((document) => {
                if (document.id === documentId) {
                    document.statusId = statusId,
                        document.reason = rejectReason
                }
                return document
            })


        }
        else if (type == "application") {
            applicationDocuments = application?.applicationDocuments?.map((document) => {
                if (document.id === documentId) {
                    document.statusId = statusId
                    document.reason = rejectReason
                }
                return document
            })
        }

        updateApplication({ ...application, requiredDocuments: updatedRequiredDocuments, applicationDocuments: applicationDocuments } as applications).finally(() => {
            setTimeout(() => { refetch() }, 500)
        })
    }

    function onStatusChange(statusName: string | undefined) {
        let statusId = statusName ? status?.find((status) => status.description === statusName)?.id : undefined
        updateApplication({ ...application, statusId: statusId } as applications).finally(() => {
            setTimeout(() => { refetch() }, 500)
        })
    }


    return (
        <>
            <NavBar />
            <div className='flex flex-col gap-5 w-full h-full p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>Applications</h1>

                <div className="flex flex-col md:flex-row w-full h-full md:max-h-[622px] border rounded-3xl shadow-md shadow-[#00000025] overflow-x-auto">

                    <div className="flex flex-col w-full md:max-w-[360px] h-full md:max-h-[622px] border rounded-3xl shadow-md shadow-[#00000025] justify-between overflow-auto">
                        <div className="flex flex-col gap-2">
                            <img className="w-full h-[263px] rounded-3xl object-cover object-center" src={program?.imagesUrl ? "https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/" + (program?.imagesUrl as string)?.split(",")[0] : ""} />
                            <h1 className="text-[24px] font-semibold px-6">{program?.name}</h1>
                            <p className="text-[14px] font-light px-6">{program?.description}</p>
                        </div>
                        <div className="flex p-6">
                            <img className=" w-14 h-14 mr-2" src={users?.imageUrl ? "https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/" + users?.imageUrl : "/userProfile.svg"} alt="" />
                            <div>
                                <h1 className="text-[16px] font-semibold">{users?.firstName} {users?.lastName}</h1>
                                <p className="text-[16px] font-light">{users?.email}</p>
                            </div>

                        </div>

                    </div>

                    <div className="flex flex-col p-6 w-full ">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h1 className="text-[29px] font-semibold">Document Management</h1>
                                <p className="text-[16px] text-[#606060]">Here you can manage the applicant uploaded documents</p>
                            </div>
                            <InputComponent type={'dropdown'} label='Status' width='w-full md:max-w-[250px]' value={getStatusNameById(application?.statusId, status)} errorMessage={''} onChange={(status) => { setStatusName(status); onStatusChange(status) }} options={statusArray} />

                        </div>


                        <div className="flex flex-col gap-4 h-full w-full overflow-scroll">

                            {application?.requiredDocuments?.map((document, index) => (
                                <div className={`flex justify-between items-center px-6 ${document.statusId == 7 ? "bg-[#d0e1e8]" : document.statusId == 8 ? "bg-[#f2f7e5]" : "bg-[#EDEDED]"} rounded-xl min-h-[81px] gap-2 `}>
                                    <p className="text-[20px] font-medium overflow-x-scroll">{document.category}</p>
                                    <div className="flex gap-4">
                                        <CustomizableButton text={'ACEPT'} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] text-[11px]' maxSize='w-full md:max-w-[184px] h-[31px]' onClick={() => { onChangeDocumentStatus(document.id as number, "required", 8) }} />
                                        <CustomizableButton text={'DECLINE'} bgColor='bg-[#16688C]' textColor='text-[#ffffff] text-[11px]' maxSize='w-full md:max-w-[184px] h-[31px]' onClick={() => { setOpenModal(true); setRejectData({ documentId: document.id as number, type: "required", statusId: 7 }) }} />
                                        <CustomizableButton text={'DOWNLOAD'} bgColor='bg-[#ffffff]' textColor='text-[#000000] text-[11px]' maxSize='w-full md:max-w-[184px] h-[31px]' onClick={() => { window.open('https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/' + document.url, '_blank') }} />
                                    </div>
                                </div>
                            ))}

                            {application?.applicationDocuments?.map((document, index) => (
                                <div className={`flex justify-between items-center px-6 ${document.statusId == 7 ? "bg-[#d0e1e8]" : document.statusId == 8 ? "bg-[#f2f7e5]" : "bg-[#EDEDED]"} rounded-xl min-h-[81px] gap-2 `}>
                                    <p className="text-[20px] font-medium overflow-x-scroll">{document.category}</p>
                                    <div className="flex gap-4">
                                        <CustomizableButton text={'ACEPT'} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] text-[11px]' maxSize='w-full md:max-w-[184px] h-[31px]' onClick={() => { onChangeDocumentStatus(document.id as number, "application", 8) }} />
                                        <CustomizableButton text={'DECLINE'} bgColor='bg-[#16688C]' textColor='text-[#ffffff] text-[11px]' maxSize='w-full md:max-w-[184px] h-[31px]' onClick={() => { setOpenModal(true); setRejectData({ documentId: document.id as number, type: "application", statusId: 7 }) }} />
                                        <CustomizableButton text={'DOWNLOAD'} bgColor='bg-[#ffffff]' textColor='text-[#000000] text-[11px]' maxSize='w-full md:max-w-[184px] h-[31px]' onClick={() => { window.open('https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/' + document.url, '_blank') }} />

                                    </div>
                                </div>
                            ))}


                        </div>

                    </div>

                </div>

            </div>


            <Modal isOpen={openModal} onClose={() => { setOpenModal(false); setRejectReason(""); setRejectData(undefined) }} >
                <div className="flex flex-col items-center gap-5 ">
                    <p className="text-[24px] text-[#444] italic font-bold">Reject document</p>
                    <p className="text-[16px] text-[#2652BD]">Explain why do you want to reject this document ?</p>
                    <textarea className="w-[294px] p-4 md:w-[529px] h-[217px] resize-none border border-[#444] bg-[#f5f5f5] rounded-[10px]" value={rejectReason} onChange={(e) => { setRejectReason(e.target.value) }} ></textarea>
                    <div className="flex w-full text-white text-[14px] md:text-[20px] font-semibold my-8">
                        <button className="w-full h-[45px] md:h-[59px] text-center bg-[#16688C] rounded-[4px]" onClick={() => { rejectData && onChangeDocumentStatus(rejectData?.documentId, rejectData?.type, rejectData?.statusId); setOpenModal(false); setRejectReason(""); setRejectData(undefined) }}>Reject</button>
                    </div>
                </div>
            </Modal >
        </>
    )
}

export default ReviewApplication