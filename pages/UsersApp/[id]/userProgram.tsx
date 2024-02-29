import useProgramForm from '@/store/programsStore';
import React, { useEffect, useState } from 'react';
import { useGetPrograms, useGetProgramsById } from '@/hooks/programs/hooks';
import { useSwipeable } from 'react-swipeable';

import Link from 'next/link';
import { useRouter } from 'next/router';
import ExchangeNestLogo from '@/public/exchangeNestLogoPlain.svg'

import useApplicationForm from '@/store/usersAppStore';
import useLoginForm from '@/store/singInStore';
import { useCreateApplication } from '@/hooks/usersApp/hooks';

const UserProgram = () => {

    const { mutateAsync: getProgramById } = useGetProgramsById();
    const { mutateAsync: createApplication } = useCreateApplication();

    const [activeIndex, setActiveIndex] = useState(0);
    const { program, setProgram, reset: resetProgram } = useProgramForm();
    const { application, setApplication, reset } = useApplicationForm();
    const { getUserData } = useLoginForm();

    const router = useRouter();
    const { id } = router.query;

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            setActiveIndex(prevIndex => (prevIndex === 0 ? (program?.imagesUrl as string[]).length - 1 : prevIndex - 1));
        } else if (direction === 'left') {
            setActiveIndex(prevIndex => (prevIndex === (program?.imagesUrl as string[]).length - 1 ? 0 : prevIndex + 1));
        }
    };

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

    function handleDocumentUpload(e: React.ChangeEvent<HTMLInputElement>, category: string, type: "application" | "required") {
        if (e.target.files) {
            let newDocument = { id: 0, category: category, url: e.target.files[0] };
            if (type === "application") {
                const existingDocumentIndex = application.applicationDocuments.findIndex(doc => doc.category === category);
                if (existingDocumentIndex !== -1) {
                    const updatedDocuments = [...application.applicationDocuments];
                    updatedDocuments[existingDocumentIndex] = newDocument;
                    setApplication({ ...application, applicationDocuments: updatedDocuments });
                } else {
                    setApplication({ ...application, applicationDocuments: [...application.applicationDocuments, newDocument] });
                }

            } else if (type === "required") {
                const existingDocumentIndex = application.requiredDocuments.findIndex(doc => doc.category === category);
                if (existingDocumentIndex !== -1) {
                    const updatedDocuments = [...application.requiredDocuments];
                    updatedDocuments[existingDocumentIndex] = newDocument;
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
        setApplication(programApplication);
        createApplication(programApplication);
    }

    return (
        <div className='mb-16'>
            {program.imagesUrl && <div className='flex flex-col gap-3 h-full w-full items-center p-5 mt-4 '>

                <div className='flex w-full justify-between'>
                    <Link onClick={() => { resetProgram() }} className='text-[16px] underline' href={"/UsersApp"}>{"< Go Back"}</Link>
                    <ExchangeNestLogo className='w-[57px] ml-[-10px] stroke-[#000000] stroke-[2px] ' />
                </div>

                <div className=" relative w-full md:w-[330px] rounded-[20px]  ">
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
                        <p className="text-[14px] font-light text-[#717171]">{program.description}</p>
                    </div>

                    {program.applicationDocuments.length > 0 && <div>
                        <h1 className="text-[16px] font-semibold my-4">Application Documents</h1>
                        <ul className="flex flex-col gap-2 text-[13px text-[#000000]">
                            {program.applicationDocuments.map((document, index) => (
                                <>

                                    <li key={index} className='flex items-center justify-between'>
                                        <p>{document}</p>
                                        <div className='flex gap-2 items-center'>
                                            <label className='w-9 h-9 flex justify-center items-center text-[#ffffff] rounded-[4px] bg-[#52BAAB]'>P</label>
                                            <input id={`fileInput${document}`} className='hidden' type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => { handleDocumentUpload(e, document, "application") }} />
                                            {<label htmlFor={`fileInput${document}`} className={`border-2 border-black py-1 rounded-[4px] cursor-pointer w-[110px] ${application.applicationDocuments.find((doc) => doc.category == document) ? "text-[#ffffff] bg-black " : "UPLOAD"} text-center`}>{application.applicationDocuments.find((doc) => doc.category == document) ? "UPLOADED" : "UPLOAD"}</label>}                                        </div>
                                    </li>
                                    <p className='text-[13px] self-end mt-[-10px] text-[#444]'>{(application.applicationDocuments.find((doc) => doc.category == document)?.url as File)?.name || ""}</p>

                                    <hr className='w-full border ' />

                                </>


                            ))}
                        </ul>
                    </div>}

                    {program.requiredDocuments.length > 0 && <div>
                        <h1 className="text-[16px] font-semibold my-4">Required Documents</h1>
                        <ul className="flex flex-col gap-2 text-[13px text-[#000000]">
                            {program.requiredDocuments.map((document, index) => (
                                <>

                                    <li key={index} className='flex items-center justify-between'>
                                        <p>{document}</p>
                                        <div className='flex gap-2 items-center'>
                                            <label className='w-9 h-9 flex justify-center items-center text-[#ffffff] rounded-[4px] bg-[#52BAAB]'>P</label>
                                            <input id={`fileInput${document}`} className='hidden' type="file" accept=".pdf,.doc,.docx,.xls,.xlsx" onChange={(e) => { handleDocumentUpload(e, document, "required") }} />
                                            {<label htmlFor={`fileInput${document}`} className={`border-2 border-black py-1 rounded-[4px] cursor-pointer w-[110px] ${application.requiredDocuments.find((doc) => doc.category == document) ? "text-[#ffffff] bg-black " : "UPLOAD"} text-center`}>{application.requiredDocuments.find((doc) => doc.category == document) ? "UPLOADED" : "UPLOAD"}</label>}
                                        </div>
                                    </li>
                                    <p className='text-[13px] self-end mt-[-10px] text-[#444]'>{(application.requiredDocuments.find((doc) => doc.category == document)?.url as File)?.name || ""}</p>

                                    <hr className='w-full border ' />

                                </>


                            ))}
                        </ul>
                    </div>}

                </div>

            </div>
            }

            <button type='button' onClick={() => { handleSubmit() }} className='w-full h-11 bottom-0 text-[#ffffff] text-[12px] font-bold bg-[#52BAAB] fixed'>SEND APPLICATION</button>
        </div>

    );
};

export default UserProgram;
