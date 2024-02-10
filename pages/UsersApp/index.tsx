import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UsersProgramCard from '@/components/cards/userProgramCard';
import UserNavBar from '@/components/usersNavBar';

const UsersApp = () => {
    return (
        <>
            <div className='flex flex-col gap-3 w-full items-center p-5 mt-4 mb-16'>
                <UsersAppSearchBar />

                <div className='flex flex-col flex-wrap flex-shrink-0 gap-3 md:flex-row md:gap-16 w-full items-center'>
                    <UsersProgramCard />
                    <UsersProgramCard />
                    <UsersProgramCard />
                    <UsersProgramCard />
                </div>
            </div>

            <UserNavBar />
        </>

    );
};

export default UsersApp;
