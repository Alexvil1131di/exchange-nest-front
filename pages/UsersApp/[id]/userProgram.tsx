import useProgramForm from '@/store/programsStore';
import React, { use, useEffect, useState } from 'react';
import { useGetPrograms, useGetProgramsById } from '@/hooks/programs/hooks';
import { useSwipeable } from 'react-swipeable';

import Link from 'next/link';
import { useRouter } from 'next/router';
import ExchangeNestLogo from '@/public/exchangeNestLogoPlain.svg'

import useApplicationForm from '@/store/usersAppStore';
import useLoginForm from '@/store/singInStore';
import { useCreateApplication, useUpdateApplication } from '@/hooks/usersApp/hooks';
import { toast } from 'react-toastify';
import ActionConfirm from '@/components/modals/actionConfirmModal';
import { useGetOrganizations } from '@/hooks/Institutions/hooks';

const UserProgram = () => {

    const { mutateAsync: getProgramById } = useGetProgramsById();
    const { mutateAsync: createApplication } = useCreateApplication();
    const { mutateAsync: updateApplication } = useUpdateApplication();
    const { data: Organization } = useGetOrganizations();

    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const { program, setProgram, reset: resetProgram } = useProgramForm();
    const { application, setApplication, reset } = useApplicationForm();
    const { getUserData } = useLoginForm();

    const router = useRouter();
    const { id: UrlParams } = router.query;
    const id = (UrlParams as string)?.split("-")[0];

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            setActiveIndex(prevIndex => (prevIndex === 0 ? (program?.imagesUrl as string[]).length - 1 : prevIndex - 1));
        } else if (direction === 'left') {
            setActiveIndex(prevIndex => (prevIndex === (program?.imagesUrl as string[]).length - 1 ? 0 : prevIndex + 1));
        }
    };

    function getOrganizationById(id: number) {
        return Organization?.find((organization: any) => organization.id === id)
    }


    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
    });

    useEffect(() => {
        if (id) {
            getProgramById(parseInt(id as string)).then((data) => {
                setProgram({ ...data, imagesUrl: (data?.imagesUrl as string).split(","), applicationDocuments: data.applicationDocuments.length > 0 ? data.applicationDocuments.split(",") : [], requiredDocuments: data.requiredDocuments.length > 0 ? data.requiredDocuments.split(",") : [] });
            });
        }
    }, [id]);

    useEffect(() => {
        if ((UrlParams as string)?.split("-")[1] === "edit" && !application.id) {
            resetProgram(); reset()
            router.back();
        }
    }, [(UrlParams as string)?.split("-")[1]]);

    function handleDocumentUpload(e: React.ChangeEvent<HTMLInputElement>, category: string, type: "application" | "required") {
        if (e.target.files) {
            let newDocument = { id: 0, category: category, url: e.target.files[0], statusId: 0, reason: "" };
            if (type === "application") {
                const existingDocumentIndex = application.applicationDocuments.findIndex(doc => doc.category === category);
                if (existingDocumentIndex !== -1) {
                    const updatedDocuments = [...application.applicationDocuments];
                    updatedDocuments[existingDocumentIndex] = { ...updatedDocuments[existingDocumentIndex], url: newDocument.url || updatedDocuments[existingDocumentIndex].url };
                    setApplication({ ...application, applicationDocuments: updatedDocuments });
                } else {
                    setApplication({ ...application, applicationDocuments: [...application.applicationDocuments, newDocument] });
                }

            } else if (type === "required") {
                const existingDocumentIndex = application.requiredDocuments.findIndex(doc => doc.category === category);
                if (existingDocumentIndex !== -1) {
                    const updatedDocuments = [...application.requiredDocuments];
                    updatedDocuments[existingDocumentIndex] = { ...updatedDocuments[existingDocumentIndex], url: newDocument.url || updatedDocuments[existingDocumentIndex].url };
                    setApplication({ ...application, requiredDocuments: updatedDocuments });
                } else {
                    setApplication({ ...application, requiredDocuments: [...application.requiredDocuments, newDocument] });
                }
            }
        }
    }

    function handleSubmit() {
        let user = getUserData();
        let programApplication = { ...application, programId: program.id, studentId: user?.id };
        console.log(programApplication)
        setApplication(programApplication);

        if (application.id) {
            toast.promise(updateApplication(programApplication).finally(() => { resetProgram(); reset(); router.push("/UsersApp") }), {
                pending: "Updating Application...",
                success: "Application Updated",
                error: "Error updating application"
            })

        } else {
            toast.promise(createApplication(programApplication).finally(() => { resetProgram(); reset(); router.push("/UsersApp") }), {
                pending: "Sending Application...",
                success: "Application Sent",
                error: "Error sending application"
            })

        }
    }

    function cancelApplication() {
        let user = getUserData();
        let programApplication = { ...application, programId: program.id, studentId: user?.id, statusId: 6 };
        setApplication(programApplication);

        if (application.id) {
            toast.promise(updateApplication(programApplication).finally(() => { resetProgram(); reset(); router.push("/UsersApp") }), {
                pending: "Removing application...",
                success: "Application removed",
                error: "Error removing your application"
            })

        }
    }

    function checkIfAllRequiredDocumentsAreUploaded() {

        let allDocumentsUploaded = true;

        program.requiredDocuments.forEach((document) => {
            if (!application.requiredDocuments.find((doc) => doc.statusId == 8 && doc.category === document)) {
                allDocumentsUploaded = false;
            }
        }
        )
        return allDocumentsUploaded;


    }

    return (
        <>
            {showModal && <ActionConfirm mainColor='bg-[#16688C]' backGround='bg-[#16688C]' title={"Quit application"} actionMessage={`Are you sure you want to quit your application for the program ${program.name}`} acctionConfirm={() => { cancelApplication(); setShowModal(false); }} acctionReject={() => { setShowModal(false) }} confirmButtonLabel={"Accept"} rejectButtonLabel={"Cancel"} />}

            {program.imagesUrl && <div className='flex flex-col gap-3 w-full items-center p-5 mt-4  h-full'>

                <div className='flex w-full justify-between'>
                    <button type='button' onClick={() => { router.back(); resetProgram(); reset() }} className='text-[16px] underline' >{"< Go Back"}</button>
                    <ExchangeNestLogo className='w-[57px] ml-[-10px] stroke-[#000000] stroke-[2px] ' />
                </div>

                <div className=" relative w-full md:w-[330px] rounded-[20px] pb-[84px] ">
                    <div {...handlers} className="w-full h-[325px] rounded-[15px] bg-cover bg-center relative" style={{ backgroundImage: `url(https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/${(program?.imagesUrl as string[])[activeIndex] || ""})` }}>

                        <div className="w-[50%] absolute inset-0 bg-black opacity-5 left-0 rounded-l-[20px]" onClick={() => { handleSwipe("right") }} />
                        <div className="w-[50%] absolute inset-0 bg-black opacity-5 right-0 rounded-r-[20px]" onClick={() => { handleSwipe("left") }} style={{ left: '50%' }} />

                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 text-white">
                            {(program?.imagesUrl as string[]).map((_, index) => (
                                <div key={index} className={`h-[8px] w-[8px] rounded-full ${index === activeIndex ? 'bg-white' : 'bg-[#cacacac8]'}`}></div>
                            ))}
                        </div>
                    </div>


                    <div className="flex flex-col mt-2 text-[16px]">
                        <h1 className="font-semibold">{program.name}</h1>
                        <h2 className="text-[14px] mb-1">{getOrganizationById(program.organizationId as number)?.name}</h2>

                        <p className="text-[14px] font-light text-[#717171]">{program.description}</p>
                    </div>

                    {program.requiredDocuments.length > 0 && <div>
                        <h1 className="text-[16px] font-semibold my-4">Required Documents</h1>
                        <ul className="flex flex-col gap-2 text-[13px text-[#000000] overflow-x-hidden">
                            {program.requiredDocuments.map((document, index) => (
                                <>

                                    <li key={index} className='flex items-center justify-between'>

                                        <p className='flex items-center'>{document}
                                        </p>

                                        <div className='flex gap-2 items-center'>
                                            <label className='w-fit h-fit ml-1 text-[10px] px-[5px] py-[2px] flex justify-center items-center text-[#ffffff] rounded-[4px] bg-[#52BAAB]'>{application.requiredDocuments.find((doc) => doc.category == document)?.statusId == 8 ? "Accepted" : application.requiredDocuments.find((doc) => doc.category == document)?.statusId == 7 ? "Declined" : "Pending"}</label>
                                            <input id={`fileInput${document}`} className='hidden' type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => { handleDocumentUpload(e, document, "required") }} />
                                            {<label htmlFor={`fileInput${document}`} className={`border-2 border-black py-1 rounded-[4px] cursor-pointer w-[110px] ${application.requiredDocuments.find((doc) => doc.category == document) ? "text-[#ffffff] bg-black " : "UPLOAD"} text-center`}>{application.requiredDocuments.find((doc) => doc.category == document) ? "UPLOADED" : "UPLOAD"}</label>}
                                        </div>

                                    </li>
                                    <p className='text-[13px] mt-[-10px] text-[#444]'>{(application.requiredDocuments.find((doc) => doc.category == document)?.url as File)?.name || (application.requiredDocuments.find((doc) => doc.category == document)?.url as string)?.split("-")[1] || ""}</p>
                                    <p className='text-[13px] mt-[-10px] text-[#444]'>{(application.requiredDocuments.find((doc) => doc.category == document)?.reason)}</p>

                                    <hr className='w-full border ' />

                                </>


                            ))}
                        </ul>
                    </div>}

                    {checkIfAllRequiredDocumentsAreUploaded() && program.applicationDocuments.length > 0 && <div>
                        <h1 className="text-[16px] font-semibold my-4">Application Documents</h1>
                        <ul className="flex flex-col gap-2 text-[13px text-[#000000] overflow-x-hidden">
                            {program.applicationDocuments.map((document, index) => (
                                <>

                                    <li key={index} className='flex items-center justify-between'>
                                        <p className='flex items-center justify-between'>{document}
                                        </p>

                                        <div className='flex gap-2 items-center'>
                                            <label className='w-fit h-fit ml-1 text-[10px] px-[5px] py-[2px] flex justify-center items-center text-[#ffffff] rounded-[4px] bg-[#52BAAB]'>{application.applicationDocuments.find((doc) => doc.category == document)?.statusId == 8 ? "Accepted" : application.applicationDocuments.find((doc) => doc.category == document)?.statusId == 7 ? "Declined" : "Pending"}</label>

                                            <input id={`fileInput${document}`} className='hidden' type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => { handleDocumentUpload(e, document, "application") }} />
                                            {<label htmlFor={`fileInput${document}`} className={`border-2 border-black py-1 rounded-[4px] cursor-pointer w-[110px] ${application.applicationDocuments.find((doc) => doc.category == document) ? "text-[#ffffff] bg-black " : "UPLOAD"} text-center`}>{application.applicationDocuments.find((doc) => doc.category == document) ? "UPLOADED" : "UPLOAD"}</label>}
                                        </div>
                                    </li>

                                    <p className='text-[13px] mt-[-10px] text-[#444]'>{(application.applicationDocuments.find((doc) => doc.category == document)?.url as File)?.name || (application.applicationDocuments.find((doc) => doc.category == document)?.url as string)?.split("-")[1] || ""}</p>
                                    <p className='text-[13px] mt-[-10px] text-[#444]'>{(application.applicationDocuments.find((doc) => doc.category == document)?.reason)}</p>

                                    <hr className='w-full border ' />

                                </>


                            ))}
                        </ul>
                    </div>}

                </div>

            </div>
            }

            <div className='flex w-full fixed bottom-0 '>
                {application.id && <button type='button' onClick={() => { setShowModal(true) }} className={`w-full h-11 text-[#ffffff] text-[12px] font-bold bg-[#16688C] `}>QUIT APPLICATION</button>}
                <button type='button' onClick={() => { handleSubmit() }} className={`w-full h-11 text-[#ffffff] text-[12px] font-bold bg-[#52BAAB] `}>{application.id ? "UPDATE APPLICATION" : "SEND APPLICATION"}</button>
            </div>
        </>

    );
};

export default UserProgram;
