import React, { useEffect, useState } from "react";
import InputComponent from "../inputs/InputComponent";

interface ActionConfirmProps {
    title: string;
    actionMessage: string;
    value: string;
    onChange: (e) => void;
    acctionConfirm: () => void;
    acctionReject: () => void;
    confirmButtonLabel?: string;
    rejectButtonLabel?: string;
    mainColor?: string;
    backGround?: string;
}


const ResetPasswordModal = ({ title, actionMessage, value, onChange, acctionConfirm, acctionReject, confirmButtonLabel = "SEND PASSWORD RESET EMAIL", rejectButtonLabel = 'CANCEL', mainColor = "bg-[#52BAAB]", backGround = "bg-[#0000002b]" }: ActionConfirmProps) => {

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000a6] z-[99]`}>
                <div className="bg-white rounded-[8px] w-full max-w-lg flex flex-col gap-6">
                    <div className="flex items-center w-full bg-[#52BAAB] h-[56px] rounded-t-[8px]">
                        <h2 className="ml-6 text-[15px] font-bold text-white">{title}</h2>
                    </div>
                    <p className="text-[#444444] text-[15px] mx-6">{actionMessage}</p>
                    <InputComponent label="Email" required={true} placeholder="Enter your email" type="email" name="email" value={value} hasAnError={false}
                        width="w-full h-[46px] px-2" onChange={onChange} errorMessage={"An error has occurred, please fill in the appropriate field."} />

                    <div className="flex justify-end mb-4 mx-4 gap-4 text-[14px]">
                        {rejectButtonLabel && <button
                            className=" text-[#52BAAB] border border-[#52BAAB] font-bold py-2 px-4 rounded "
                            onClick={acctionReject}
                        >
                            {rejectButtonLabel}
                        </button>}
                        <button
                            className={`${mainColor} text-white font-bold py-2 px-4 rounded`}
                            onClick={acctionConfirm}
                        >
                            {confirmButtonLabel}
                        </button>
                    </div>
                </div>
            </div>

        </>
    );
};

export default ResetPasswordModal;
