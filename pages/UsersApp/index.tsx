import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UsersProgramCard from '@/components/cards/userProgramCard';

const UsersApp = () => {
    return (
        <div className='flex flex-col gap-3 w-full items-center p-5 '>
            <UsersAppSearchBar />
            <UsersProgramCard />
            <UsersProgramCard />
            <UsersProgramCard />
            <UsersProgramCard />

        </div>
    );
};

export default UsersApp;
