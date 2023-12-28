import React, { useEffect, useState } from "react";


const ActionConfirm = ({ title, actionMessage, acctionConfirm, acctionReject, confirmButtonLabel, rejectButtonLabel = '', mainColor = "bg-[#FF0000]", backGround = "bg-[#0000002b]" }) => {

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-[#000000a6] z-[99]`}>
                <div className="bg-white rounded-[8px] w-full max-w-md flex flex-col gap-4">
                    <div className="flex items-center w-full bg-[#0C9281] h-[56px] rounded-t-[8px]">
                        <h2 className="ml-6 text-[15px] font-bold text-white">{title}</h2>
                    </div>
                    <p className="text-[#444444] text-[15px] mx-6">{actionMessage}</p>
                    <hr className="border-[#0C9281]" />
                    <div className="flex justify-end mb-4 mx-4 gap-4 text-[14px]">
                        {rejectButtonLabel && <button
                            className=" text-[#0C9281] border border-[#0C9281] font-bold py-2 px-4 rounded "
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

export default ActionConfirm;
