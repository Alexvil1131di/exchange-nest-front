'use client'
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/public/exchangeNestLogoPlain.svg'
import Link from 'next/link';
import ActiveUser from './inputs/ActiveUserDropDown';
import useEventListener from '@/hooks/useEvent';
import useLoginForm from '@/store/singInStore';
import { stringDecrypter } from '@/hooks/auth/methods';
import { user } from '@/interfaces/authInterface';

const NavBar = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState<user>();

    const isExpandedRef = useRef<HTMLDivElement>(null);
    const { userData } = useLoginForm();

    if (typeof document !== "undefined") {
        useEventListener("click", (e) => handleDocumentClick(e), document);
    }

    const handleDocumentClick = (event: any) => {
        if (isExpandedRef.current && !isExpandedRef.current.contains(event.target)) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        if (userData) {
            setUser(JSON.parse(stringDecrypter(userData as string)) as user)
        }
    }
        , [userData])

    return (
        <>
            <nav ref={isExpandedRef} className='fixed flex items-center top-0 left-0 right-0 bg-[#52BAAB] h-14 px-4 shadow-md gap-16 shadow-[#a1a1a1] rounded-b-[8px] z-[99]'>

                <Logo className='w-[57px] ml-[-10px] fill-white stroke-[3px] cursor-pointer md:cursor-default' onClick={() => { setIsExpanded(!isExpanded) }} />

                <div className=' flex w-full h-full justify-end md:justify-center items-center'>

                    <div className={`absolute z-10 ${isExpanded ? "flex" : "hidden"} md:flex top-[58px] left-0 w-full md:items-center bg-[#949494] md:bg-transparent flex-col md:flex-row h-fit md:static flex md:h-full md:gap-16 font-bold text-[16px] text-white`}
                        onClick={() => { setIsExpanded(false) }}>
                        <Link className='w-full md:w-fit p-2' href={'/'}>Home</Link>
                        <Link className='w-full md:w-fit p-2' href={'/Programs'}>Programs</Link>
                        <Link className='w-full md:w-fit p-2' href={'/Applications'}>Applications</Link>
                    </div>

                    <div className='flex items-center justify-center'>
                        <ActiveUser commerceName={user?.firstName as string} commerceImage={"/logo.svg"} userEmail={user?.email as string} />
                    </div>

                </div>


            </nav>
        </>
    );
};

export default NavBar;
