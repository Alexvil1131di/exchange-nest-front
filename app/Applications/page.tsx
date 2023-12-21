'use client'

import React from 'react';
import NavBar from '@/components/navBar';
import InputComponent from '@/components/inputs/InputComponent';
import CustomizableButton from '@/components/buttons/CustomizableButton';
import ProgramCard from '@/components/cards/programCard';
import UserApplicationCard from '@/components/cards/userApplicationCard';

const arr = ["", "", "", "", "", "", "", "", "", "", "", "", "", ""]

const Application = () => {
    return (
        <>
            <NavBar />

            <div className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>Applications</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} label='Search' width='w-full md:max-w-[300px]' errorMessage={''} onChange={() => { }} />
                        <InputComponent type={'dropdown'} label='Search' width='w-full md:max-w-[250px]' errorMessage={''} onChange={() => { }} options={["Activos", "Inactivos"]} />
                    </div>

                    <CustomizableButton text={'CREATE USERS'} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full max-w-[134px] h-[45px]' onClick={() => { }} />

                </div>

                <div className='flex flex-col gap-5 justify-center md:justify-start'>
                    <table className="w-full text-[#000000] text-[15px] font-medium">
                        <thead >
                            <tr >
                                <th >Applicant Name</th>
                                <th className='hidden md:table-cell'>Application Date</th>
                                <th className='hidden md:table-cell'>Email</th>
                                <th className='hidden md:table-cell'>Program</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>

                            {arr.map((item, index) => (
                                <UserApplicationCard imageUrl='https://c4.wallpaperflare.com/wallpaper/331/854/417/skull-artwork-matei-apostolescu-psychedelic-wallpaper-preview.jpg' title='Programa ' description='Lorem ipsum dolor sit amet,' />
                            ))}

                        </tbody>
                    </table>
                </div>





            </div >



        </>
    );
};

export default Application;
