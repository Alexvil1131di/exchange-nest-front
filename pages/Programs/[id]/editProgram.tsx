import NavBar from "@/components/navBar";
import InputComponent from "@/components/inputs/InputComponent";
import ImageUpload from "@/components/inputs/imageUpload";
import React, { useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TrashCan from "@/public/trashCan.svg"
import CustomizableButton from "@/components/buttons/CustomizableButton";
import Dots from "@/public/DotsGrid.svg"

const DndItem = ({ id, text, index, moveItem }) => {
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
            <input type="text" value={text} className="w-full h-full text-[23px] font-bold" />
            <TrashCan className="w-14 h-14 p-4 fill-white rounded-xl  cursor-pointer bg-[#16688C]" />
        </div>
    );
};

const EditProgram = () => {
    const mock = [{ id: 1, text: "Document1" }, { id: 2, text: "Document2" }, { id: 3, text: "Document3" }, { id: 4, text: "Document4" }, { id: 5, text: "Document5" }]

    const [imageArray, setImageArray] = useState([]);
    const [list, setList] = useState(mock);


    const moveItem = (fromIndex, toIndex) => {
        const newList = [...list];
        const item = newList[fromIndex];

        newList.splice(fromIndex, 1);
        newList.splice(toIndex, 0, item);

        setList(newList);
    };


    return (
        <>
            <NavBar />

            <div className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>Exchange Programs</h1>
                <div className="flex flex-col w-full p-6 pt-12 gap-4">

                    <div className="flex flex-col md:flex-row w-full max-h-[644px] gap-3  ">
                        <div className="flex flex-col gap-6 items-end w-full ">


                            <InputComponent type={'text'} value={""} required={true} label='Name' width='w-full ' errorMessage={''} onChange={(e) => { }} />

                            <InputComponent type={'dropdown'} value={""} required={true} label='Country' width='w-full' options={["1"]} errorMessage={''} onChange={(e) => { }} />

                            <InputComponent type={'dropdown'} value={""} required={true} label='Status' width='w-full' errorMessage={''} options={["1"]} onChange={(e) => { }} />

                        </div>

                        <div className="flex flex-col gap-6 items-end w-full ">

                            <InputComponent type={'date'} value={""} required={true} label='Finish Date' width='w-full' errorMessage={''} onChange={(e) => { }} />

                            <InputComponent type={'date'} value={""} required={true} label='Finish Date' width='w-full' errorMessage={''} onChange={(e) => { }} />

                            <InputComponent type={'date'} value={""} required={true} label='Limit application Date' width='w-full ' errorMessage={''} onChange={(e) => { }} />

                        </div>

                    </div>

                    <InputComponent type={'text'} value={""} required={true} label='Google Maps Link' width='w-full ' errorMessage={''} onChange={(e) => { }} />

                    <InputComponent type={'textarea'} value={""} required={true} height='h-[80px]' label='Description' width='w-full ' errorMessage={''} onChange={(e) => { }} />

                    <ImageUpload image={imageArray} multiImage showButton={false} description={"Click to browse or drag and drop your pictures"} errorMessage={"El tamaño del logo debe ser inferior a los 2mb"} imageOnChange={setImageArray} height={"h-[160px]"} uniqueKey={"commerceImage"} maxWidth={""} maxSize={200000000} />

                </div>

                <div className="flex justify-between w-full px-10">
                    <div className="flex flex-col gap-2">
                        <CustomizableButton text={'ADD APPLICATION DOCUMENTS'} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] ' maxSize='w-full max-w-[250px] h-[45px] mb-4' onClick={() => { }} />

                        <DndProvider backend={HTML5Backend}>
                            {list.map((item, i) => (
                                <DndItem key={item.id} index={i} id={item?.id} text={item.text} moveItem={moveItem} />
                            ))}
                        </DndProvider>
                    </div>

                    <div className="flex flex-col gap-2">
                        <CustomizableButton text={'ADD REQUIRED DOCUMENTS'} bgColor='bg-[#52BAAB]' textColor='text-[#ffffff] ' maxSize='w-full max-w-[250px] h-[45px] mb-4' onClick={() => { }} />

                        <DndProvider backend={HTML5Backend}>
                            {list.map((item, i) => (
                                <DndItem key={item.id} index={i} id={item?.id} text={item.text} moveItem={moveItem} />
                            ))}
                        </DndProvider>
                    </div>
                </div>



            </div>
        </>
    );
}

export default EditProgram;