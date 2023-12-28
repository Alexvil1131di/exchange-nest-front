import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { stringEncrypter } from '@/hooks/auth/methods';
import { user } from '@/interfaces/authInterface';


interface LoginForm {
    email: string;
    password: string;
    rememberMe?: boolean
    userData?: user | string;

    setEmail: (newName: string) => void;
    setPassword: (newEmail: string) => void;
    setRememberMe: (newRememberMe?: boolean) => void;
    setUserData: (newUserData: user) => void;
}

const useLoginForm = create(persist<LoginForm>((set, get) => ({
    email: "",
    password: "",
    rememberMe: false,

    setEmail: (newEmail) => { set({ email: stringEncrypter(newEmail as string) }) },

    setPassword: (newPassword) => set({ password: stringEncrypter(newPassword as string) }),

    setRememberMe: (newRememberMe) => set(newRememberMe ? { rememberMe: newRememberMe } : { rememberMe: !get().rememberMe }),

    setUserData: (newUserData) => set({ userData: stringEncrypter(JSON.stringify(newUserData)) }),

}), {
    name: 'email-login',
    storage: createJSONStorage(() => localStorage),
}
));

export default useLoginForm;