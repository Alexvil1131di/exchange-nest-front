import React from 'react';
import Close from "@/public/x.svg"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeButton?: React.ReactNode;
    width?: string;
}

function close() {
    return (<Close className="w-6 h-6 fill-[#0C9281]" />)
}

const Modal = ({ isOpen, onClose, children, closeButton = close(), width = "w-fit" }: ModalProps) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto bg-[#00000093] flex items-center justify-center ">
            <div className={`bg-white rounded-[20px] ${width} mx-auto py-8 px-[25px] md:px-[30px] `}>
                <div className='flex justify-end cursor-pointer' onClick={() => { onClose() }}>
                    {closeButton}
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;