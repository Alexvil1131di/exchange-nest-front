import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { stringEncrypter, stringDecrypter } from '@/hooks/auth/methods';
import { user } from '@/interfaces/usersInterface';


interface pagesMessages {
    email: string;
    password: string;
    rememberMe?: boolean
    userData?: user | string;
    roleText?: string;
    organizationId?: number;
    statusId?: number;
    language: "En" | "Es" | undefined;

}

const useLoginForm = create(persist<pagesMessages>((set, get) => ({
    email: "",
    password: "",
    rememberMe: false,
    language: "En",






}), {
    name: 'pagesCopys',
    storage: createJSONStorage(() => localStorage),
}
));

export default useLoginForm;