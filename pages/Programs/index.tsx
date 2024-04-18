'use client'

import React, { useState } from 'react';
import NavBar from '@/components/navBar';
import InputComponent from '@/components/inputs/InputComponent';
import CustomizableButton from '@/components/buttons/CustomizableButton';
import ProgramCard from '@/components/cards/programCard';
import { useRouter } from 'next/router';
import { useDeletePrograms, useGetPrograms } from '@/hooks/programs/hooks';
import useProgramForm from '@/store/programsStore';
import ActionConfirm from '@/components/modals/actionConfirmModal';
import useLoginForm from '@/store/singInStore';
import NothingToSeeHere from '@/components/cards/nothingToSee';


const Programs = () => {
    const router = useRouter()
    const { data: Programs, refetch } = useGetPrograms()
    const { mutateAsync: deleteProgram } = useDeletePrograms()
    const { program, reset, setProgram } = useProgramForm()
    const { getTexts } = useLoginForm();
    const { tittle, SearchLabel, SearchPlaceholder, deleteCardTitle, deleteCarDescription, deleteButton, cancelButton, CreateButton } = getTexts("Programs")

    const [showModal, setShowModal] = useState(false)

    const fixedPrograms = Programs?.map((item) => ({ ...item, imagesUrl: (item?.imagesUrl as string)?.split(","), limitApplicationDate: item?.limitApplicationDate?.split("T")[0], startDate: item?.startDate?.split("T")[0], finishDate: item?.finishDate?.split("T")[0] }))

    return (
        <>
            <NavBar />
            {showModal && <ActionConfirm title={deleteCardTitle} actionMessage={`${deleteCarDescription} ${program.name}`} acctionConfirm={() => { deleteProgram(program.id as number); setShowModal(false); setTimeout(() => { refetch() }, 2000); }} acctionReject={() => { reset(); setShowModal(false) }} confirmButtonLabel={deleteButton} rejectButtonLabel={cancelButton} />}
            <div className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>{tittle}</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} placeholder={SearchPlaceholder} label={SearchLabel} width='w-full md:max-w-[300px]' errorMessage={''} onChange={() => { }} />
                        {/* <InputComponent type={'dropdown'} placeholder={statusPlaceholder} label={statusLabel} width='w-full md:max-w-[250px]' errorMessage={''} onChange={() => { }} options={["Activos", "Inactivos"]} /> */}
                    </div>

                    <CustomizableButton text={CreateButton} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:max-w-[184px] h-[45px]' onClick={() => { reset(); router.push("/Programs/create/editProgram") }} />

                </div>

                <div className='flex flex-wrap w-full gap-5 justify-center md:justify-start'>


                    {

                        fixedPrograms && fixedPrograms?.length > 0 ?
                            fixedPrograms?.map((item, index) => (

                                <ProgramCard
                                    key={index}
                                    imageUrl={`https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/${item?.imagesUrl[0]}`}
                                    title={item?.name}
                                    description={item.description}
                                    onEdit={() => { setProgram({ ...item, applicationDocuments: item.applicationDocuments.split(","), requiredDocuments: item.requiredDocuments.split(",") }), router.push(`/Programs/${item.id}/editProgram`) }}
                                    onDelete={() => { setProgram({ ...item, applicationDocuments: item.applicationDocuments.split(","), requiredDocuments: item.requiredDocuments.split(",") }), setShowModal(true) }}
                                />
                            ))
                            : <NothingToSeeHere />
                    }

                </div>

            </div>



        </>
    );
};

export default Programs;
