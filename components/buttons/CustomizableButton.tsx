import React from 'react';

interface CustomizableButtonProps {
    beforeImage?: any;
    afterImage?: any;
    type?: string;
    text: string;
    textColor?: string;
    bgColor?: string;
    maxSize?: string;
    htmlFor?: string;
    onClick: () => void;
}

const CustomizableButton = ({ htmlFor, beforeImage = undefined, afterImage = undefined, text, textColor = "text-[#ffffff]", bgColor = 'bg-[#52BAAB]', maxSize = 'h-12', onClick, type = "button" }: CustomizableButtonProps) => {
    if (type === "button" || type === "submit") {
        return (
            <button type={type} onClick={onClick} className={`flex items-center text-[14px] cursor-pointer font-semibold justify-center gap-2 space-x-2 rounded-[4px] ${textColor} shadow-md shadow-[#888888] ${bgColor} w-full ${maxSize}`}>
                {beforeImage}
                {text}
                {afterImage}
            </button>
        );
    } else {
        return (
            <label typeof={type} htmlFor={htmlFor} onClick={onClick} className={`flex items-center text-[14px] cursor-pointer font-semibold justify-center gap-2 space-x-2 rounded-[4px] ${textColor} shadow-md shadow-[#888888] bg-[#${bgColor}] w-full ${maxSize}`}>
                {beforeImage}
                {text}
                {afterImage}
            </label>
        );
    }
};

export default CustomizableButton;