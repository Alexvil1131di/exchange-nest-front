
import { useState, useRef } from "react";
import DownArrow from "@/public/DownArrow.svg"
import useEventListener from "@/hooks/useEvent";
import UserSilhouette from "@/public/userSilhouette.svg"
import { userLogOut } from "@/hooks/auth/methods";


interface ActiveUserProps {
    commerceName: string;
    commerceImage: string;
    userEmail: string;
}


const ActiveUser = ({ commerceName, commerceImage, userEmail }: ActiveUserProps) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const isExpandedRef = useRef<HTMLDivElement>(null);

    useEventListener("click", (e) => handleDocumentClick(e), document);

    const handleDocumentClick = (event: any) => {
        if (isExpandedRef.current && !isExpandedRef.current.contains(event.target)) {
            setIsExpanded(false);
        }
    };

    return (
        <>
            <div ref={isExpandedRef} className="relative w-full h-full max-w-[612px]" style={{ position: "relative" }}>

                <div className=" flex gap-[14px] items-center">
                    <button onClick={() => setIsExpanded(!isExpanded)} className="flex gap-1 items-center justify-center">
                        <UserSilhouette className="w-5 h-5 fill-white" alt="" />
                        <DownArrow className={`w-5 h-5 fill-white stroke-white ${isExpanded && "rotate-180"}`} />
                    </button>

                    <div className="text-white hidden lg:inline">
                        <h1 className=" whitespace-nowrap text-[14px] font-semibold">{commerceName || ""}</h1>
                        <h1 className=" whitespace-nowrap text-[10px]">{userEmail || "user@gmail.com"}</h1>
                    </div>
                </div>

                {isExpanded && (
                    <>
                        <div className="origin-top-right right-0 absolute z-[999] mt-4 rounded-md shadow-lg bg-white w-[220px] h-[137] overflow-hidden" style={{ position: "absolute" }}>
                            <div className=" p-4 lg:hidden">
                                <p className=" text-base">{commerceName || "Commerce Name"}</p>
                                <p className=" text-[14px] text-[#444444]">{userEmail || "user@gmail.com"}</p>
                            </div>
                            <hr />
                            <button type="button" className="flex gap-2 items-center py-2 px-4 w-full hover:bg-[#00000010]" onClick={() => { }}>
                                <h1 className="my-[9px] text-[14px] text-[#444444]">Soporte</h1>
                            </button>
                            <hr />
                            <button type="button" className="flex gap-2 items-center py-2 px-4  w-full hover:bg-[#00000010]" onClick={() => { userLogOut() }}>
                                <h1 className="my-[9px] text-[14px] text-[#444444]">LogOut</h1>
                            </button>
                        </div>

                    </>
                )}

            </div>


        </>
    );
};

export default ActiveUser;
