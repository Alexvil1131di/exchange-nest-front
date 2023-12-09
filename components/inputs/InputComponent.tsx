import { useEffect, useRef, useState } from "react";
import TooltipContainer from "../tooltips/tooltipContainer";
import DownArrow from "@/public/DownArrow.svg"

interface InputComponentProps {
    label?: string;
    placeholder?: string;
    type: "date" | "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week" | "month" | "dropdown";
    required?: boolean;
    name?: string;
    value?: string;
    hasAnError?: boolean;
    errorMessage: string;
    height?: string;
    width?: string;
    bgColor?: string;
    border?: string;
    onChange: (e: any) => void;
    options?: string[]; // New property for dropdown options
}

function InputComponent(
    {
        label, placeholder, type, required = false, name, value, hasAnError, errorMessage,
        onChange,
        height = "h-[56px]",
        width = "w-[100%]",
        bgColor = "#F4FFFF",
        border = `border-b-[3px] border-[#52BAAB]`,
        options = [] // Default value for dropdown options

    }: InputComponentProps) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(value);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.addEventListener("click", close);
        return () => {
            document.removeEventListener("click", close);
        };
    }, []);

    function close(e: MouseEvent) {
        if (e && e.target === ref.current) {
            setIsOpen(false);
        }
    }

    function selectOption(option: string) {
        setSelectedOption(option);
        setIsOpen(false);
    }

    function dropdown() {
        return (
            <div className={`relative dropdown ${isOpen ? 'open' : ''} w-full h-full cursor-pointer`} ref={ref} onClick={() => setIsOpen(!isOpen)} >
                <div className="w-full h-full flex items-center justify-between rounded-[4px] text-[12px] px-[16px] " >
                    <p>{selectedOption}</p>
                    <DownArrow className={`w-[24px] h-[24px] stroke-[1.5px] ${isOpen && " rotate-180"} `} />
                </div>

                {isOpen && (
                    <div className={`absolute options w-full h-fit max-h-[200px] overflow-scroll mt-2 z-[99] flex flex-col border-[1px] border-[#52BAAB] rounded-[4px] shadow-sm`} style={{ background: bgColor }}>
                        {options.map((option, index) => (
                            <>
                                <div className="w-full p-2 cursor-pointer" key={index} onClick={() => selectOption(option)}>
                                    {option}
                                </div>
                                <hr className="border-[#52BAAB]" />
                            </>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    function input() {
        return (
            <input
                style={{ background: bgColor }}
                className={`w-full h-full rounded-[4px] text-[12px] px-[16px] `}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required
            />
        )

    }

    return (
        <TooltipContainer tooltipMessage={errorMessage} isActive={hasAnError} width={width}>
            <div className={`relative ${hasAnError ? "border-b-[3px] border-[#FF0000]" : border}  ${height} ${width} rounded-[4px] `} style={{ background: bgColor }}>
                {type === "dropdown" ? (
                    dropdown()
                ) : (
                    input()
                )}
                <label className={`absolute text-[14px] top-[-10px] px-1 left-[16px] z-0`} htmlFor={name}>{label}
                    <hr className="absolute w-full top-[51%] left-0 z-[-1]" style={{ border: bgColor }} />
                    <span className={`${!required && "hidden"} ml-1 text-[#ff3939]`}>*</span>
                </label>
            </div>
        </TooltipContainer>);
}

export default InputComponent;