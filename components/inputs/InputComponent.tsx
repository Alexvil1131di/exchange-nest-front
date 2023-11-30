import TooltipContainer from "../tooltips/tooltipContainer";

interface InputComponentProps {
    label?: string;
    placeholder?: string;
    type: "date" | "email" | "number" | "password" | "search" | "tel" | "text" | "time" | "url" | "week" | "month";
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
}


function InputComponent(
    {
        label,
        placeholder,
        type,
        required = false,
        name,
        value,
        hasAnError,
        errorMessage,
        onChange,
        height = "h-[56px]",
        width = "w-[100%]",
        bgColor = "#F4FFFF",
        border = `border-b-[3px] border-[#52BAAB]`

    }: InputComponentProps) {


    function input() {
        return (
            <TooltipContainer tooltipMessage={errorMessage} isActive={hasAnError} width={width}>
                <div className={`relative ${hasAnError ? "border-b-[3px] border-[#FF0000]" : border}  ${height} ${width} rounded-[4px] `} style={{ background: bgColor }}>
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
                    <label className={`absolute text-[14px] top-[-10px] px-1 left-[16px] z-0`} htmlFor={name}>{label}
                        <hr className="absolute w-full top-[51%] left-0 z-[-1]" style={{ border: bgColor }} />
                        <span className={`${!required && "hidden"}`}>*</span>
                    </label>
                </div>
            </TooltipContainer>
        )
    }



    return (
        input()
    );
}



export default InputComponent;
