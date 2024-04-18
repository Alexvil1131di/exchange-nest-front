import React from 'react';

interface UserApplicationCardProps {
    imageUrl: string;
    status: string;
    name: string;
    onClick: () => void;
}

const UserAppApplicationCard = ({ imageUrl, status, name, onClick }: UserApplicationCardProps) => {
    return (
        <div className='flex flex-col w-full p-4 gap-3 cursor-pointer' onClick={() => { onClick() }}>
            <div className='flex items-center gap-3'>
                <div className='w-[60px] h-[60px] rounded-full bg-cover bg-center relative' style={{ backgroundImage: `url("${imageUrl}")` }} />

                <div className='text-[12px]'>
                    <p className='text-[14px] text-[#000000] font-bold'>{name}</p>
                    <p className='text-[#717171]' >{status} </p>
                </div>
            </div>

            <hr className='w-full border-[1px] border-[#DEDEDE]' />
        </div>

    );
};

export default UserAppApplicationCard;
