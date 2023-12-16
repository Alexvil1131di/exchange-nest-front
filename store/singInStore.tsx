import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { stringEncrypter } from '@/hooks/auth/methods';


interface LoginForm {
    email: string;
    password: string;
    rememberMe?: boolean

    setEmail: (newName: string) => void;
    setPassword: (newEmail: string) => void;
    setRememberMe: (newRememberMe?: boolean) => void;
}

const useLoginForm = create(persist<LoginForm>((set, get) => ({
    email: "",
    password: "",
    rememberMe: false,

    setEmail: (newEmail) => { set({ email: stringEncrypter(newEmail as string) }) },

    setPassword: (newPassword) => set({ password: stringEncrypter(newPassword as string) }),

    setRememberMe: (newRememberMe) => set(newRememberMe ? { rememberMe: newRememberMe } : { rememberMe: !get().rememberMe }),

}), {
    name: 'email-login',
    storage: createJSONStorage(() => localStorage),
}
));

export default useLoginForm;