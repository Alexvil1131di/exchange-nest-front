import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { stringEncrypter } from '@/hooks/auth/methods';


interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    roleId?: number,
    statusId?: number,
    organizationId?: number,
    countryId?: number,
    password: string;
    confirmedPassword: string;

    setFirstName: (newFirstName: string) => void;
    setLastName: (newLastName: string) => void;
    setCountryId: (newCountryId: number) => void;
    setRoleId: (newRoleId: number) => void;
    setStatusId: (newStatusId: number) => void;
    setOrganizationId: (newOrganizationId: number) => void;
    setEmail: (newEmail: string) => void;
    setPassword: (newPassword: string) => void;
    setConfirmedPassword: (newConfirmedPassword: string) => void;
    reset: () => void;
}

const useRegisterForm = create<RegisterForm>((set, get) => ({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",

    setFirstName: (newFirstName) => set({ firstName: newFirstName }),
    setLastName: (newLastName) => set({ lastName: newLastName }),
    setCountryId: (newCountryId) => set({ countryId: newCountryId }),
    setRoleId: (newRoleId) => set({ roleId: newRoleId }),
    setStatusId: (newStatusId) => set({ statusId: newStatusId }),
    setOrganizationId: (newOrganizationId) => set({ organizationId: newOrganizationId }),
    setEmail: (newEmail) => set({ email: newEmail }),
    setPassword: (newPassword) => set({ password: newPassword }),
    setConfirmedPassword: (newConfirmedPassword) => set({ confirmedPassword: newConfirmedPassword }),
    reset: () => set({ firstName: "", lastName: "", email: "", countryId: undefined, password: "", confirmedPassword: "", }),

}));


export default useRegisterForm;