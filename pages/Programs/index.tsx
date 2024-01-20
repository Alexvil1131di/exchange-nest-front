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


const Programs = () => {
    const router = useRouter()
    const { data: Programs, refetch } = useGetPrograms()
    const { mutateAsync: deleteProgram } = useDeletePrograms()
    const { program, reset, setProgram } = useProgramForm()

    const [showModal, setShowModal] = useState(false)

    const fixedPrograms = Programs?.map((item) => ({ ...item, imagesUrl: (item?.imagesUrl as string)?.split(","), limitApplicationDate: item?.limitApplicationDate?.split("T")[0], startDate: item?.startDate?.split("T")[0], finishDate: item?.finishDate?.split("T")[0] }))
    console.log(fixedPrograms)
    return (
        <>
            <NavBar />
            {showModal && <ActionConfirm title={"Delete Program"} actionMessage={`Are you sure you want to delete the program ${program.name}`} acctionConfirm={() => { deleteProgram(program.id as number); setShowModal(false); refetch() }} acctionReject={() => { reset(); setShowModal(false) }} confirmButtonLabel={"Delete"} rejectButtonLabel={"Cancel"} />}
            <div className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>Applications</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} placeholder='Search your programs' label='Search' width='w-full md:max-w-[300px]' errorMessage={''} onChange={() => { }} />
                        <InputComponent type={'dropdown'} placeholder='Filter by status' label='Status' width='w-full md:max-w-[250px]' errorMessage={''} onChange={() => { }} options={["Activos", "Inactivos"]} />
                    </div>

                    <CustomizableButton text={'CREATE PROGRAM'} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:max-w-[184px] h-[45px]' onClick={() => { router.push("/Programs/create/editProgram") }} />

                </div>

                <div className='flex flex-wrap w-full gap-5 justify-center md:justify-start'>
                    {fixedPrograms?.map((item, index) => (
                        <ProgramCard
                            key={index}
                            imageUrl={`https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/${item?.imagesUrl[0]}`}
                            title={item?.name}
                            description={item.description}
                            onEdit={() => { setProgram(item), router.push(`/Programs/${item.id}/editProgram`) }}
                            onDelete={() => { setProgram(item), setShowModal(true) }}
                        />
                    ))}

                </div>

            </div>



        </>
    );
};

export default Programs;
