import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    description: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const UserApplicationCard = ({ imageUrl, title, description, onEdit, onDelete }: CardProps) => {
    return (
        <tr style={{ verticalAlign: 'middle' }} className="  border-[#F1F1F1] h-[80px] shadow-md shadow-[#F1F1F1] rounded-lg text-[#000000] text-[15px] font-medium">
            <td className=' md:w-auto h-[80px]  table-cell align-middle'>
                <div className=' table-cell align-middle px-2' >
                    <img style={{ minWidth: '60px' }} className="w-[60px] h-[60px] object-cover object-center rounded-full" src={imageUrl} alt={`${title} avatar`} />
                </div>
                <div className=' flex-col  table-cell align-middle'>
                    <p className='mb-[-3px]'>{title}</p>
                    <a className='md:hidden text-[10px] font-normal mt-[-3px]' href={`mailto:${description}`}>{description}</a>
                    <p className='md:hidden text-[10px] font-normal mt-[-3px]'>Talk it out with audio</p>
                </div>
            </td>

            <td className='hidden md:table-cell font-normal text-center'>2023-10-12</td>
            <td className='hidden md:table-cell font-normal text-center'><a href={`mailto:${description}`}>{description}</a></td>
            <td className='hidden md:table-cell font-normal text-center'>Talk it out with audio</td>

            <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className=' pr-2'>
                <button className='border-[1px] border-[#000000] text-xs font-bold rounded-3xl h-8 px-4 text-center'>Review Application</button>
            </td>
        </tr>
    );
};

export default UserApplicationCard;