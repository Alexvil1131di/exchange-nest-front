import React from 'react';

interface CardProps {
    imageUrl: string;
    applicantName: string;
    email: string;
    status: string;
    programName: string;
    onClick: () => void;

}

const UserApplicationCard = ({ imageUrl, applicantName, email, programName, status, onClick }: CardProps) => {
    return (
        <tr style={{ verticalAlign: 'middle' }} className="  border-[#F1F1F1] h-[80px] shadow-md shadow-[#F1F1F1] rounded-lg text-[#000000] text-[15px] font-medium">
            <td className=' md:w-auto h-[80px]  table-cell align-middle'>
                <div className=' table-cell align-middle px-2' >
                    <img style={{ minWidth: '60px' }} className="w-[60px] h-[60px] object-cover object-center rounded-full" src={imageUrl} alt={`${applicantName} avatar`} />
                </div>
                <div className=' flex-col w-full table-cell align-middle'>
                    <p className='mb-[-3px] md:text-center pr-[60px]'>{applicantName}</p>
                    <a className='md:hidden text-[10px] font-normal mt-[-3px]' href={`mailto:${email}`}>{email}</a>
                    <p className='md:hidden text-[10px] font-normal mt-[-3px]'>{programName}</p>
                </div>
            </td>

            <td className='hidden md:table-cell font-normal text-center'>{status}</td>
            <td className='hidden md:table-cell font-normal text-center'><a href={`mailto:${email}`}>{email}</a></td>
            <td className='hidden md:table-cell font-normal text-center'>{programName}</td>

            <td style={{ textAlign: 'center', verticalAlign: 'middle' }} className=' pr-2'>
                <button type='button' onClick={() => onClick()} className='border-[1px] border-[#000000] text-xs font-bold rounded-3xl h-8 px-4 text-center'>Review Application</button>
            </td>
        </tr>
    );
};

export default UserApplicationCard;