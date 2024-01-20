
import React from 'react'
import ConsecutiveDots from '@/public/ConsecutiveDots.svg'
import Link from 'next/link'

const UsersProgramCard = () => {
    return (
        <div className="h-[510px] w-full rounded-[20px] shadow-lg shadow-[#D9D9D9] p-4 flex flex-col flex-nowrap">
            <div className='w-full h-[325px] rounded-[15px] bg-cover bg-center relative' style={{ backgroundImage: `url("https://yucatan.quadratin.com.mx/www/wp-content/uploads/2022/01/processed-9-1024x768.jpeg")` }}>
                <div className='absolute inset-0 bg-black opacity-5' />
                <ConsecutiveDots className="absolute bottom-3 left-1/2 transform -translate-x-1/2 fill-white" />
            </div>
            <div className='flex flex-col mt-2 text-[16px]'>
                <h1 className='font-semibold'>Program Name</h1>
                <p className='text-[14px] font-light text-[#717171]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.</p>
            </div>
            <div className='mt-auto'>
                <Link className='text-[16px] flex-shrink-0' href="#">Apply Now</Link>
            </div>
        </div>

    )
}

export default UsersProgramCard