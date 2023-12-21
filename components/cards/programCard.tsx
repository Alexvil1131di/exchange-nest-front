import React from 'react';

interface CardProps {
    imageUrl: string;
    title: string;
    description: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

const ProgramCard = ({ imageUrl, title, description, onEdit, onDelete }: CardProps) => {
    return (
        <div className="w-full md:w-[452px] h-[178px] bg-white rounded-lg shadow-md shadow-[#C0C0C0] flex">
            <img className="w-full max-w-[204px] h-[178px] rounded object-cover object-center" src={imageUrl} />
            <div className="flex flex-col w-full justify-between items-start gap-2.5 p-5">
                <div className="gap-5">
                    <div className="gap-2">
                        <h1 className="text-zinc-800 text-xl font-medium leading-7">{title}</h1>
                        <p className="opacity-80 text-zinc-800 text-sm leading-tight tracking-tight h-14 overflow-hidden">{description}</p>
                    </div>
                </div>
                <div className="h-[17px] flex justify-between items-center w-full">
                    <span className="opacity-60 text-zinc-800 text-xs leading-none tracking-tight cursor-pointer" onClick={() => { onEdit && onEdit() }}>Edit Program</span>
                    <span className="opacity-60 text-cyan-700 text-xs leading-none tracking-tight cursor-pointer" onClick={() => { onDelete && onDelete() }}>Delete Program</span>
                </div>
            </div>
        </div>
    );
};

export default ProgramCard;