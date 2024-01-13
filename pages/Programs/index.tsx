'use client'

import React, { useState } from 'react';
import NavBar from '@/components/navBar';
import InputComponent from '@/components/inputs/InputComponent';
import CustomizableButton from '@/components/buttons/CustomizableButton';
import ProgramCard from '@/components/cards/programCard';
import { useRouter } from 'next/router';


const Programs = () => {
    const router = useRouter()
    const arr = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]

    return (
        <>
            <NavBar />

            <div className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>Applications</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} placeholder='Search your programs' label='Search' width='w-full md:max-w-[300px]' errorMessage={''} onChange={() => { }} />
                        <InputComponent type={'dropdown'} placeholder='Filter by status' label='Status' width='w-full md:max-w-[250px]' errorMessage={''} onChange={() => { }} options={["Activos", "Inactivos"]} />
                    </div>

                    <CustomizableButton text={'CREATE PROGRAM'} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full max-w-[134px] h-[45px]' onClick={() => { }} />

                </div>

                <div className='flex flex-wrap w-full gap-5 justify-center md:justify-start'>
                    {arr.map((item, index) => (
                        <ProgramCard imageUrl='https://c4.wallpaperflare.com/wallpaper/331/854/417/skull-artwork-matei-apostolescu-psychedelic-wallpaper-preview.jpg' title='Programa de Intercambio' description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc, ut sit in sit. ' />
                    ))}

                </div>

            </div>



        </>
    );
};

export default Programs;
