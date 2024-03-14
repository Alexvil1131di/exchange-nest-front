import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import ConsecutiveDots from '@/public/ConsecutiveDots.svg';
import Link from 'next/link';

interface UsersProgramCardProps {
    name: string;
    images: string[];
    description: string;
    institutionName?: string;
    onClick: () => void;
}

const UsersProgramCard = ({ name, description, images, institutionName = "", onClick }: UsersProgramCardProps) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSwipe = (direction: 'left' | 'right') => {
        if (direction === 'right') {
            setActiveIndex(prevIndex => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
        } else if (direction === 'left') {
            setActiveIndex(prevIndex => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => handleSwipe('left'),
        onSwipedRight: () => handleSwipe('right'),
    });

    return (
        <div className="flex relative flex-col w-full md:w-[330px] h-[510px] rounded-[20px] shadow-lg shadow-[#D9D9D9] p-4">
            <div {...handlers} className="w-full h-[325px] rounded-[15px] bg-cover bg-center relative" style={{ backgroundImage: `url(https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/${images[activeIndex]})` }}>

                <div className="w-[50%] absolute inset-0 bg-black opacity-5 left-0 rounded-l-[20px]" onClick={() => { handleSwipe("right") }} />
                <div className="w-[50%] absolute inset-0 bg-black opacity-5 right-0 rounded-r-[20px]" onClick={() => { handleSwipe("left") }} style={{ left: '50%' }} />

                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 text-white">
                    {images.map((_, index) => (
                        <div key={index} className={`h-[8px] w-[8px] rounded-full ${index === activeIndex ? 'bg-white' : 'bg-[#cacacac8]'}`}></div>
                    ))}
                </div>
            </div>


            <div className="flex flex-col mt-2 text-[16px]">
                <h1 className="font-semibold">{name}</h1>
                <h2 className="text-[14px] mb-1">{institutionName}</h2>

                <p className="text-[14px] font-light text-[#717171]">{description}</p>
            </div>
            <div className="mt-auto">
                <button type="button" className="flex items-center text-[16px] text-[#252525] font-normal underline" onClick={() => onClick()}>
                    {"Apply Now >"}
                </button>
            </div>
        </div>
    );
};

export default UsersProgramCard;
