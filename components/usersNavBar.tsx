'use client'
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/public/exchangeNestLogoPlain.svg'
import UserProfile from '@/public/userProfile.svg'
import MessageBubble from '@/public/messageBubble.svg'



import Link from 'next/link';
import ActiveUser from './inputs/ActiveUserDropDown';
import useEventListener from '@/hooks/useEvent';
import useLoginForm from '@/store/singInStore';
import { stringDecrypter } from '@/hooks/auth/methods';
import { user } from '@/interfaces/usersInterface';
import { useUserAuth } from '@/hooks/auth/hooks';
import { useRouter } from 'next/router';

const UserNavBar = () => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [user, setUser] = useState<user>();

    const isExpandedRef = useRef<HTMLDivElement>(null);
    const { userData, getTexts } = useLoginForm();
    const { applicationsLabel, homeLabel, profileLabel } = getTexts("UsersApp")
    const { userAuth: home } = useUserAuth("/UsersApp")
    const { userAuth: Applications } = useUserAuth("/UsersApp/Applications")
    const { userAuth: profile } = useUserAuth("/UsersApp/Profile")


    const router = useRouter()

    useEffect(() => {
        if (userData) {
            setUser(JSON.parse(stringDecrypter(userData as string)) as user)
        }
    }, [userData])

    return (
        <>
            <nav className='fixed bottom-0 left-0 right-0 flex items-center justify-center gap-12 bg-[#ffffff] border-t-2 border-[#DEDEDE] h-16 px-4 z-[99] text-[10px] font-medium'>

                {Applications && <Link className={`flex flex-col items-center justify-center ${router.pathname === "/UsersApp/Applications" ? "text-[#52BAAB]" : "text-[#717171]"}`} href={'/UsersApp/Applications'}>
                    <MessageBubble className={`w-[20px] ${router.pathname === "/UsersApp/Applications" ? "stroke-[#52BAAB]" : "stroke-[#717171]"} `} />
                    {applicationsLabel}
                </Link>}

                {home && <Link className={`flex flex-col items-center justify-center ${router.pathname === "/UsersApp" ? "text-[#52BAAB]" : "text-[#717171]"}`} href={'/UsersApp'}>
                    <Logo className={`w-[40px] ml-[-7px] stroke-[4px] ${router.pathname === "/UsersApp" ? "fill-[#52BAAB] stroke-[#52BAAB]" : "fill-[#717171] stroke-[#717171]"} `} />
                    {homeLabel}
                </Link>}

                {profile && <Link className={`flex flex-col items-center justify-center ${router.pathname === "/UsersApp/Profile" ? "text-[#52BAAB]" : "text-[#717171]"}`} href={'/UsersApp/Profile'}>
                    <UserProfile className={`w-[20px] ${router.pathname === "/UsersApp/Profile" ? "fill-[#52BAAB]" : "fill-[#717171]"}  `} />
                    {profileLabel}
                </Link>}

            </nav>
        </>
    );
};

export default UserNavBar;
