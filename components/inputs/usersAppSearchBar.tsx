import React from 'react'
import Magnifyinglass from '@/public/Magnifyinglass.svg'
import ExchangeNestLogo from '@/public/exchangeNestLogoPlain.svg'
import useLoginForm from '@/store/singInStore';

const UsersAppSearchBar = ({ value, onChange }) => {
    const { getTexts } = useLoginForm();
    const { SearchBarPlaceholder } = getTexts("UsersApp")

    return (
        <div className="h-[60px] w-full border border-[#2196F3] rounded-[30px] flex items-center justify-between px-5">
            <Magnifyinglass className={' w-4 h-4 '} />
            <input type="text" className='w-full px-3' value={value} onChange={onChange} placeholder={SearchBarPlaceholder} />
            <ExchangeNestLogo className='w-[57px] ml-[-10px] stroke-[#000000] stroke-[2px] ' />
        </div>
    )
}

export default UsersAppSearchBar