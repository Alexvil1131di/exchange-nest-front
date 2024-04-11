
import { useState, useRef } from "react";
import DownArrow from "@/public/DownArrow.svg"
import useEventListener from "@/hooks/useEvent";
import UserSilhouette from "@/public/userSilhouette.svg"
import { userLogOut } from "@/hooks/auth/methods";
import useLoginForm from "@/store/singInStore";
import Link from "next/link";


interface ActiveUserProps {
    commerceName: string;
    commerceImage: string;
    userEmail: string;
    color?: string;
}


const ActiveUser = ({ commerceName, commerceImage, userEmail, color = "#ffffff" }: ActiveUserProps) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const isExpandedRef = useRef<HTMLDivElement>(null);

    useEventListener("click", (e) => handleDocumentClick(e));
    const { getTexts } = useLoginForm();
    const { supportLabel, logoutLabel } = getTexts("navBar")

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
                        <UserSilhouette className={`w-5 h-5 fill-[${color}]`} alt="" />
                        <DownArrow className={`w-5 h-5 fill-[${color}] stroke-[${color}] ${isExpanded && "rotate-180"}`} />
                    </button>

                    <div className={`text-[${color}] hidden lg:inline`}>
                        <h1 className=" whitespace-nowrap text-[14px] font-semibold">{commerceName || ""}</h1>
                        <h1 className=" whitespace-nowrap text-[10px]">{userEmail || "user@gmail.com"}</h1>
                    </div>
                </div>

                {isExpanded && (
                    <>
                        <div className="origin-top-right right-0 absolute z-[9999] mt-4 rounded-md shadow-lg bg-white w-[220px] h-[137] overflow-hidden" style={{ position: "absolute" }}>
                            <div className=" p-4 lg:hidden">
                                <p className=" text-base">{commerceName || "Commerce Name"}</p>
                                <p className=" text-[14px] text-[#444444]">{userEmail || "user@gmail.com"}</p>
                            </div>
                            <hr />
                            <Link className="flex gap-2 items-center py-2 px-4 w-full hover:bg-[#00000010]" href={"/"}>
                                <h1 className="my-[9px] text-[14px] text-[#444444]">{supportLabel}</h1>
                            </Link>
                            <hr />
                            <button type="button" className="flex gap-2 items-center py-2 px-4  w-full hover:bg-[#00000010]" onClick={() => { userLogOut() }}>
                                <h1 className="my-[9px] text-[14px] text-[#444444]">{logoutLabel}</h1>
                            </button>
                        </div>

                    </>
                )}

            </div>


        </>
    );
};

export default ActiveUser;
