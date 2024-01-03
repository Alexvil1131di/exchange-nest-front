import React, { useEffect, useState } from "react";
import UploadFile from "@/public/uploadFile.svg"
import CustomizableButton from "../buttons/CustomizableButton";

const ImageUpload = ({ image, description, errorMessage, imageOnChange, maxWidth, height, uniqueKey, maxSize }) => {
    const [profileImage, setProfileImage] = useState<string>('');
    const [error, setError] = useState<boolean>(false);


    const handleImageChange = (file: File | undefined) => {
        if (file && file.size > maxSize) {
            setError(true);
            console.log("error")
        } else {
            setError(false);
        }
    };

    useEffect(() => {
        if (image && image !== null && typeof image == "object") {
            console.log(image)
            setProfileImage(URL.createObjectURL(image))
        }
        else if (image?.length > 0) {
            setProfileImage(process.env.NEXT_PUBLIC_BASE_SERVER_URL + image)
        }
        else {
            setProfileImage("")
        }
    }, [image]);

    return (
        <>
            <div className="flex md:flex-col gap-3 items-center justify-between w-full ">



                <label className={`w-full flex items-center justify-center rounded-[20px] bg-white ${maxWidth + " " + height} ${image && ('bg-cover')} bg-center bg-no-repeat shadow-sm border-2 border-[#0C9281] border-dashed cursor-pointer`}
                    style={{ backgroundImage: `url(${profileImage})` }}
                    htmlFor={uniqueKey} id={"upload " + uniqueKey}>

                    {!profileImage && <div className=" text-center">
                        <p className="text-[10px] font-semibold text-[#444444]">
                            {description}
                        </p>
                        <p className="text-[10px] text-[#444444]">
                            Tamaño Máx 5Mb
                        </p>
                    </div>}

                </label>


                <input className="w-auto hidden" id={uniqueKey} type="file" accept=".jpg, .jpeg, .png, .webp, .svg" onChange={(e) => { imageOnChange(e.target.files?.[0]); handleImageChange(e.target.files?.[0]) }} />

                <CustomizableButton type="label" text={'Upload Image'} htmlFor={uniqueKey} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:w-[180px]  h-[35px]' onClick={() => { }} />


            </div>

            {error && <p className=" text-sm text-[#ff0000]">
                {errorMessage}
            </p>}
        </>

    );
};

export default ImageUpload