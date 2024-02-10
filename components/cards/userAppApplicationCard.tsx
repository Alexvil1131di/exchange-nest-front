import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UsersProgramCard from '@/components/cards/userProgramCard';
import UserNavBar from '@/components/usersNavBar';

const UserAppApplicationCard = () => {
    return (
        <div className='flex flex-col w-full p-4 gap-3 cursor-pointer'>
            <div className='flex items-center gap-3'>
                <div className='w-[60px] h-[60px] rounded-full bg-cover bg-center relative' style={{ backgroundImage: `url("https://yucatan.quadratin.com.mx/www/wp-content/uploads/2022/01/processed-9-1024x768.jpeg")` }} />

                <div className='text-[12px]'>
                    <p className='text-[14px] text-[#000000] font-bold'>Harlingen, Netherlands </p>
                    <p className='text-[#717171]' >Pending Feb 13 - 14, 2023</p>
                </div>
            </div>

            <hr className='w-full border-[1px] border-[#DEDEDE]' />
        </div>

    );
};

export default UserAppApplicationCard;
