'use client';

import NavBar from '@/components/navBar';
import React from 'react';
import Logo from '@/public/ExchangeNestLogo.svg'
import { useRouter } from 'next/router';
import useLoginForm from '@/store/singInStore';

const UsersApp = () => {

    const router = useRouter()
    const { userData, language, setLanguage, getTexts } = useLoginForm();
    const { landinDescription, HowToLabel, howToDescription, logInButton } = getTexts("navBar")
    return (
        <>
            <NavBar />
            <div className='flex flex-col w-full h-full gap-5 pt-[56px] p-5 md:p-11'>

                <div className='flex flex-col lg:flex-row items-center gap-5 mt-11'>
                    <Logo className='w-full md:max-w-[557px] lg:max-w-[657px] stroke-[3px] fill-[#000] drop-shadow-md' />
                    <div className='flex flex-col gap-2 mx-auto'>
                        <h1 className='text-[42px]'>ExchangeNest</h1>
                        <p className='max-w-[700px] text-[18px] text-justify'>{landinDescription}</p>
                        <button onClick={() => { router.push("/Auth/signUp/Xx") }} type='button' className='bg-[#52BAAB] rounded-[8px] w-fit text-[#ffffff] py-2 px-4'>{logInButton}</button>
                    </div>

                </div>

                <div className='flex flex-col md:flex-row items-center gap-5 p-5 justify-between mt-5'>

                    <div className=''>
                        <h1 className='text-[42px]'>{HowToLabel}</h1>
                        <p className='max-w-[700px] text-[18px] text-justify'>{howToDescription}</p>
                    </div>

                    <div className="bg-[#000000] h-[550px] w-full max-w-[300px] border border-gray-300 rounded-[12px] shadow-md p-1 mx-auto">
                        <div className="h-full border border-gray-300 rounded-lg overflow-hidden">
                            <iframe width="300" height="550" src="https://www.youtube.com/embed/VjcV_s9EyBU?si=l7QOblEtMDQ6h5W8&amp;controls=0" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>
                        </div>
                    </div>

                </div>


            </div>

        </>
    );
};

export default UsersApp;
