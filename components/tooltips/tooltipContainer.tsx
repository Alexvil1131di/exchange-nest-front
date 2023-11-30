

import React, { ReactNode, useEffect, useState } from 'react';

type TooltipContainerProps = {
    children: ReactNode;
    tooltipMessage: string;
    isActive?: boolean;
    width?: string;
    onChange?: () => void;
};

const TooltipContainer = ({ children, tooltipMessage, isActive = false, onChange, width }: TooltipContainerProps) => {
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        setIsHovering(true);
        setTimeout(() => {
            setIsHovering(false);
        }, 4000);
    }, [isActive]);

    return (
        <div className={`relative ${width}`} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            {children}
            <div
                className={`absolute w-fit mb-3 text-center bottom-full left-1/2 transform -translate-x-1/2 px-2 py-1 bg-[#666666] text-white text-xs rounded-md pointer-events-none transition-opacity duration-200 opacity-0 ${isHovering && isActive && ' lg:opacity-100'
                    }`}
            >
                {tooltipMessage}
                <svg
                    className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 text-[#666666]"
                    x="0px"
                    y="0px"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                >
                    <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
                </svg>
            </div>
        </div>
    );
};

export default TooltipContainer;

