import NothingToSee from "@/public/notResults.svg";
import useLoginForm from "@/store/singInStore";

const NothingToSeeHere = () => {

    const { getTexts } = useLoginForm();
    const { NothingtoShow } = getTexts("navBar")

    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="w-full max-w-[480px]">
                <NothingToSee />
            </div>
            <p className="text-[24px] font-semibold">{NothingtoShow}</p>
        </div>
    );
}

export default NothingToSeeHere;