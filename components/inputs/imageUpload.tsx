import React, { useEffect, useState } from "react";
import CustomizableButton from "../buttons/CustomizableButton";
import X from "@/public/x.svg"
const ImageUpload = ({ image, description, errorMessage, imageOnChange, maxWidth, height, uniqueKey, maxSize, showButton = true, multiImage = false }) => {
    const [profileImage, setProfileImage] = useState<string>('');
    const [imageArray, setImageArray] = useState<string[]>([]);
    const [error, setError] = useState<boolean>(false);


    const handleImageChange = (file: File | undefined) => {
        if (file && file.size > maxSize) {
            setError(true);
            console.log("error")
        } else {
            setError(false);
        }
    };

    const handleImageRemove = (e, index: number) => {

        console.log(e)
        e.stopPropagation()
        let newImageArray = [...image];
        newImageArray.splice(index, 1);
        setImageArray(newImageArray);
        imageOnChange(newImageArray);
    }

    useEffect(() => {
        if (multiImage && image?.length < 6) {
            setImageArray(image.map((img, index) => {
                if (img && img !== null && typeof img === "object") {
                    return URL.createObjectURL(img);
                } else if (img) {
                    return "https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/" + img;
                } else {
                    return "";
                }
            }));
        } else {
            if (image && image !== null && typeof image === "object") {
                setProfileImage(URL.createObjectURL(image));
            } else if (image?.length > 0) {
                setProfileImage("https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/" + image);
            } else {
                setProfileImage("");
            }
        }
    }, [image]);

    console.log(image)


    return (
        <>
            <div className="flex md:flex-col gap-3 items-center justify-between w-full ">

                <label className={`relative w-full flex items-center justify-center rounded-[20px] bg-white border-dashed ${maxWidth + " " + height} ${image && ('bg-cover')} bg-center bg-no-repeat shadow-sm border-2 border-[#0C9281] cursor-pointer`}
                    style={{ backgroundImage: `url(${profileImage})` }}
                    htmlFor={uniqueKey} id={"upload " + uniqueKey} >

                    {imageArray.length < 1 && !profileImage ? <div className=" text-center">
                        <p className="text-[10px] font-semibold text-[#444444]">
                            {description}
                        </p>
                        <p className="text-[10px] text-[#444444]">
                            Tamaño Máx 5Mb
                        </p>
                    </div> : ""}

                    {imageArray.length > 0 && <div className="relative flex flex-wrap gap-2">
                        {imageArray.map((img, index) => (
                            <div className="relative w-[100px]  h-[100px] bg-cover bg-center bg-no-repeat rounded-[20px]" style={{ backgroundImage: `url(${img})` }} key={index} >
                                <button type="button" className="absolute top-1 right-1 w-6 h-6  rounded-full bg-[#0000005e] p-[5px]" onClick={(e) => { e.stopPropagation(); handleImageRemove(e, index) }} ><X className=" fill-white" /></button>
                            </div>
                        ))}
                    </div>}


                </label>


                <input className="w-auto hidden" id={uniqueKey} type="file" accept=".jpg, .jpeg, .png, .webp, .svg" onChange={(e) => { multiImage && image.length < 6 ? imageOnChange([...image, e.target.files?.[0]]) : imageOnChange(e.target.files?.[0]); handleImageChange(e.target.files?.[0]) }} />

                {showButton && <CustomizableButton type="label" text={'Upload Image'} htmlFor={uniqueKey} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:w-[180px]  h-[35px]' onClick={() => { }} />}

            </div>

            {error && <p className=" text-sm text-[#ff0000]">
                {errorMessage}
            </p>}
        </>

    );
};

export default ImageUpload