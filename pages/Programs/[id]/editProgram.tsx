import NavBar from "@/components/navBar";
import InputComponent from "@/components/inputs/InputComponent";
import ImageUpload from "@/components/inputs/imageUpload";
import React, { useRef, useState, memo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TrashCan from "@/public/trashCan.svg"
import CustomizableButton from "@/components/buttons/CustomizableButton";
import Dots from "@/public/DotsGrid.svg"
import useProgramForm from "@/store/programsStore";
import { toast } from "react-toastify";
import { useGetStatus, useGetCountries } from "@/hooks/genericData/hooks";
import { getStatusIdByName, getStatusNameById } from "@/hooks/genericData/methods";
import useLoginForm from "@/store/singInStore";
import { useCreatePrograms, useUpdatePrograms } from "@/hooks/programs/hooks";
import { useRouter } from "next/router";


const EditProgram = () => {

    const { program, setProgram, setName, setImage, setDescription, setRequiredDocuments, setApplicationDocuments, setLimitApplicationDate, addApplicationDocuments, addRequiredDocuments, deleteApplicationDocuments, deleteRequiredDocuments, setStartDate, setFinishDate, setOrganizationId, setCountryId, setStateId, setStatusId, reset } = useProgramForm();
    const { data: status } = useGetStatus()
    const { getUserData, getTexts } = useLoginForm()
    const { data: countries } = useGetCountries()
    const { mutateAsync: createProgram } = useCreatePrograms()
    const { mutateAsync: updateProgram } = useUpdatePrograms()
    const { tittle, nameLabel, namePlaceholder, countryLabel, countryPlaceholder,
        StatusLabel, statusPlaceholder, descriptionLabel, descriptionPlaceholder, limitDateLabel,
        limitDatePlaceholder, StartDateLabel, StartDatePlaceholder, FinishDateLabel, FinishDatePlaceholder,
        requiredDocumentsDescription, requiredDocumentsLabel, applicationDocumentDescription,
        applicationDocumentLabel, createButton, editButton } = getTexts("editProgram")

    const [errorShown, setErrorShown] = useState(false);

    const statusOptions = status?.slice(0, 2).map((item) => item.description)
    const countryOptions = countries?.map((item) => item.description)

    const router = useRouter()
    const id = router.query.id
    const programToRender = program

    // const moveItem = (fromIndex, toIndex) => {
    //     const newList = [...list];
    //     const item = newList[fromIndex];

    //     newList.splice(fromIndex, 1);
    //     newList.splice(toIndex, 0, item);

    //     setList(newList);
    // };

    function checkDateAvailability(toSetField: string, setDate) {
        console.log(setDate)


        if (toSetField == "StartDate") {
            const endDate = program.finishDate
            const newStartDate = new Date(setDate).getTime();
            const newEndDate = new Date(endDate).getTime()

            if (!endDate || newStartDate <= newEndDate || !setDate) {
                return setStartDate(setDate);
            }
            else if (setDate !== undefined && !errorShown) { setErrorShown(true); toast.error("Start date must be before finish date") }


        }

        else if (toSetField == "FinishDate") {
            const startDate = program.startDate
            const newStartDate = new Date(startDate).getTime();
            const newEndDate = new Date(setDate).getTime()

            if (!startDate || newStartDate <= newEndDate || !setDate) {
                return setFinishDate(setDate);
            }
            else if (setDate !== undefined && !errorShown) { setErrorShown(true); toast.error("Finish date must be after start date") }
        }

        setTimeout(() => { setErrorShown(false) }, 500)

    }

    function setStatus(stat: string) {
        setStatusId(getStatusIdByName(stat, status) as number)
        setOrganizationId(getUserData()?.organizationId as number)
    }

    function setCountry(country: string) {
        setCountryId(getStatusIdByName(country, countries) as number)
    }

    function handleSubmit() {

        if (id == "create") {
            toast.promise(createProgram(program), {
                pending: 'Creating program...',
                success: 'Program created successfully',
                error: 'Error creating program'
            }).then(() => { reset(); router.push("/Programs") })
        }
        else {
            toast.promise(updateProgram(program), {
                pending: 'Updating institution...',
                success: 'Institution updated successfully',
                error: 'Error updating institution'
            }).then(() => { reset(); router.push("/Programs") })

        }

    }

    const DndItem = ({ id, text, index, moveItem, onChange }) => {
        const ref = useRef<HTMLDivElement>(null);
        const [{ isDragging }, drag] = useDrag({
            item: { type: 'item', id, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            type: 'item',
        });

        const [, drop] = useDrop({
            accept: 'item',
            hover(item, monitor) {
                if (!ref.current) {
                    return;
                }

                const dragIndex = (item as any).index;
                const hoverIndex = index;

                if (dragIndex === hoverIndex) {
                    return;
                }

                const hoverBoundingRect = ref.current?.getBoundingClientRect(); // Use optional chaining to access getBoundingClientRect

                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();

                if (!clientOffset) return;

                const hoverClientY = clientOffset?.y - hoverBoundingRect.top;

                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }

                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }

                moveItem(dragIndex, hoverIndex);
                (item as any).index = hoverIndex;
            },
        });

        drag(drop(ref));


        return (
            <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }} className=" w-[513px] px-[7px] h-[70px] border border-[#52BAAB] rounded-[10px] flex justify-between items-center">
                <Dots className="w-8 h-8 fill-black" />
                <input type="text" value={text} className="w-full h-full text-[23px] font-bold" onChange={(e) => { onChange(e.target.value, index) }} />
                <TrashCan className="w-14 h-14 p-4 fill-white rounded-xl  cursor-pointer bg-[#16688C]" />
            </div>
        );
    };

    console.log(program.imagesUrl)



    return (
        <>
            <NavBar />

            <form className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>{tittle}</h1>
                <div className="flex flex-col w-full p-6 pt-12 gap-4">

                    <div className="flex flex-col md:flex-row w-full max-h-[644px] gap-3  ">
                        <div className="flex flex-col gap-6 items-end w-full ">


                            <InputComponent type={'text'} value={program.name} required={true} label={nameLabel} placeholder={namePlaceholder} width='w-full ' errorMessage={''} onChange={(e) => { setName(e.target.value) }} />

                            <InputComponent type={'dropdown'} value={getStatusNameById(program.countryId, countries)} required={true} label={countryLabel} placeholder={countryPlaceholder} width='w-full' options={countryOptions} errorMessage={''} onChange={setCountry} />

                            <InputComponent type={'dropdown'} value={getStatusNameById(program.statusId, status)} required={true} label={StatusLabel} placeholder={statusPlaceholder} width='w-full' errorMessage={''} options={statusOptions} onChange={setStatus} />

                        </div>

                        <div className="flex flex-col gap-6 items-end w-full ">

                            <InputComponent type={'date'} value={program.startDate} required={true} label={StartDateLabel} placeholder={StartDatePlaceholder} width='w-full' errorMessage={''} minDate={program.limitApplicationDate} onChange={(e) => { checkDateAvailability("StartDate", (e.target.value)) }} />

                            <InputComponent type={'date'} value={program.finishDate} required={true} label={FinishDateLabel} placeholder={FinishDatePlaceholder} width='w-full' errorMessage={''} minDate={program.startDate} onChange={(e) => { checkDateAvailability("FinishDate", (e.target.value)) }} />


                        </div>

                    </div>

                    {/* <InputComponent type={'text'} value={""} required={true} label='Google Maps Link' width='w-full ' errorMessage={''} onChange={(e) => { }} /> */}

                    <InputComponent type={'textarea'} value={program.description} required={true} height='h-[80px]' label={descriptionLabel} placeholder={descriptionPlaceholder} width='w-full ' errorMessage={''} onChange={(e) => { setDescription(e.target.value) }} />

                    <ImageUpload image={program?.imagesUrl || []} multiImage showButton={false} description={"Click to browse or drag and drop your pictures"} errorMessage={"El tamaño del logo debe ser inferior a los 2mb"} imageOnChange={setImage} height={"h-fit min-h-[160px]"} uniqueKey={"commerceImage"} maxWidth={""} maxSize={200000000} />

                </div>

                <div className="flex flex-col justify-between lg:flex-row w-full px-10 gap-2">

                    <div className="flex flex-col gap-2">
                        <p>{requiredDocumentsDescription}</p>

                        <CustomizableButton text={requiredDocumentsLabel} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] ' maxSize='w-full max-w-[250px] h-[45px] mb-4' onClick={() => { addRequiredDocuments() }} />
                        {
                            programToRender.requiredDocuments.map((item, index) => (
                                <div key={index} className=" w-full max-w-[513px] p-[7px] h-[70px] border border-[#52BAAB] rounded-[10px] flex justify-between items-center">
                                    <Dots className="w-8 h-8 fill-black" />
                                    <input type="text" value={item} className="w-full h-full bg-[#00000012] rounded-[10px] px-2 mr-2 text-[23px] font-bold" onChange={(e) => { setRequiredDocuments(e.target.value, index) }} />
                                    <TrashCan className="w-14 h-14 p-4 fill-white rounded-xl  cursor-pointer bg-[#16688C]" onClick={() => { deleteRequiredDocuments(index) }} />
                                </div>))
                        }
                        {/* <DndProvider backend={HTML5Backend}>
                            {list.map((item, i) => (
                                <DndItem key={item.id} index={i} id={item?.id} text={item.text} moveItem={moveItem} onChange={setRequiredDocuments} />
                            ))}
                        </DndProvider> */}
                    </div>

                    <div className="flex flex-col gap-2">
                        <p>{applicationDocumentDescription}</p>

                        <CustomizableButton text={applicationDocumentLabel} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] ' maxSize='w-full max-w-[250px] h-[45px] mb-4' onClick={() => { addApplicationDocuments() }} />

                        {
                            programToRender.applicationDocuments.map((item, index) => (
                                <div key={index} className=" w-full max-w-[513px] p-[7px] h-[70px] border border-[#52BAAB] rounded-[10px] flex justify-between items-center">
                                    <Dots className="w-8 h-8 fill-black" />
                                    <input type="text" value={item} className="w-full h-full bg-[#00000012] rounded-[10px] px-2 mr-2 text-[23px] font-bold" onChange={(e) => { setApplicationDocuments(e.target.value, index) }} />
                                    <TrashCan className="w-14 h-14 p-4 fill-white rounded-xl  cursor-pointer bg-[#16688C]" onClick={() => { deleteApplicationDocuments(index) }} />
                                </div>))
                        }

                        {/* <DndProvider backend={HTML5Backend}>
                            {programToRender.applicationDocuments.map((item, i) => (
                                <DndItem key={i} index={i} id={i} text={item} moveItem={moveItem} onChange={setApplicationDocuments} />
                            ))}
                        </DndProvider> */}
                    </div>

                </div>

                <div className="w-full flex justify-end px-10">
                    <CustomizableButton text={parseInt(id as string) ? editButton : createButton} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] ' maxSize='w-full max-w-[250px] h-[45px] mb-4' onClick={() => { handleSubmit() }} />
                </div>


            </form>
        </>
    );
}

export default EditProgram;