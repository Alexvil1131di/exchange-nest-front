import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UserAppApplicationCard from '@/components/cards/userAppApplicationCard';
import UserNavBar from '@/components/usersNavBar';

const UsersApp = () => {
    return (
        <>
            <div className='flex flex-col w-full p-4 mt-4 mb-16'>

                <h1 className='text-[30px] font-bold text-[#000000] mb-[40px]'>My Applications</h1>

                <div className='mb-3'>
                    <h2 className='text-[14px] font-bold mb-3'>Recent Applications</h2>
                    <div className="flex">
                        <hr className="w-[150px] border-[1px] border-[#000000]" />
                        <hr className="flex-1 border-[1px] border-[#DEDEDE]" />
                    </div>


                </div>


                <UserAppApplicationCard />
                <UserAppApplicationCard />
                <UserAppApplicationCard />

            </div>

            <UserNavBar />
        </>

    );
};

export default UsersApp;
