
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/public/exchangeNestLogoPlain.svg'
import Link from 'next/link';
import ActiveUser from './inputs/ActiveUserDropDown';
import useEventListener from '@/hooks/useEvent';
import useLoginForm from '@/store/singInStore';
import { stringDecrypter } from '@/hooks/auth/methods';
import { user } from '@/interfaces/usersInterface';
import { useUserAuth } from '@/hooks/auth/hooks';
import { useRouter } from 'next/router';
import InputComponent from './inputs/InputComponent';

const NavBar = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState<user>();

    const isExpandedRef = useRef<HTMLDivElement>(null);
    const { userData, language, setLanguage } = useLoginForm();

    const { userAuth: Programs } = useUserAuth("/Programs")
    const { userAuth: Applications } = useUserAuth("/Applications")
    const { userAuth: Institutions } = useUserAuth("/Institutions")
    const { userAuth: Users } = useUserAuth("/Users")

    const { getTexts } = useLoginForm();
    const { homeLabel, programsLabel, applicationLabel, institutionsLabel, userLabel } = getTexts("navBar")


    const router = useRouter();
    useEventListener("click", (e) => handleDocumentClick(e));

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
                        <Link className={`w-full md:w-fit p-2 ${router.pathname === "/" ? "underline" : ""}`} href={'/'}>{homeLabel}</Link>
                        {Programs && <Link className={`w-full md:w-fit p-2 ${router.pathname.includes("/Programs") ? "underline" : ""}`} href={'/Programs'}>{programsLabel}</Link>}
                        {Applications && <Link className={`w-full md:w-fit p-2 ${router.pathname.includes("/Applications") ? "underline" : ""}`} href={'/Applications'}>{applicationLabel}</Link>}
                        {Institutions && <Link className={`w-full md:w-fit p-2 ${router.pathname.includes("/Institutions") ? "underline" : ""}`} href={'/Institutions'}>{institutionsLabel}</Link>}
                        {Users && <Link className={`w-full md:w-fit p-2 ${router.pathname.includes("/Users") ? "underline" : ""}`} href={'/Users'}>{userLabel}</Link>}

                    </div>

                    <div className='flex items-center justify-center'>
                        <InputComponent unCheck={false} bgColor="" type={'dropdown'} label='' width='w-fit text-[#ffffff]' value={user ? language : ""} errorMessage={''} onChange={(value) => { setLanguage(value) }} options={["En", "Es"]} />
                        <ActiveUser commerceName={user?.firstName as string} commerceImage={"/logo.svg"} userEmail={user?.email as string} />
                    </div>

                </div>


            </nav>
        </>
    );
};

export default NavBar;
