import React, { useState } from "react";
import Styles from "@/styles/Login.module.css";

interface CheckBoxWithLabelProps {
    label: string;
    id: string;
    checked: boolean;
    width?: string;
    height?: string;
    onChange: () => void;
}

const CheckBoxWithLabel = ({ label, id, checked, width = "w-6", height = "h-6", onChange }: CheckBoxWithLabelProps) => {
    return (
        <label htmlFor={id} className={`flex items-center`}>
            <input type="checkbox" id={id} className={Styles.checkbox + ` ${width} ${height} text-[14px]`} checked={checked} onChange={onChange} />
            {label}
        </label>
    );
};

export default CheckBoxWithLabel;
