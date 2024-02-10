import { create } from 'zustand';

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    nic: string;
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
    setNic: (newNic: string) => void;
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
    nic: "",
    password: "",
    confirmedPassword: "",

    setFirstName: (newFirstName) => set({ firstName: newFirstName }),
    setLastName: (newLastName) => set({ lastName: newLastName }),
    setCountryId: (newCountryId) => set({ countryId: newCountryId }),
    setRoleId: (newRoleId) => set({ roleId: newRoleId }),
    setStatusId: (newStatusId) => set({ statusId: newStatusId }),
    setOrganizationId: (newOrganizationId) => set({ organizationId: newOrganizationId }),
    setEmail: (newEmail) => set({ email: newEmail }),
    setNic: (newNic) => { if (/^[a-zA-Z0-9]{0,20}$/.test(newNic)) { set({ nic: newNic }); } },
    setPassword: (newPassword) => set({ password: newPassword }),
    setConfirmedPassword: (newConfirmedPassword) => set({ confirmedPassword: newConfirmedPassword }),
    reset: () => set({ firstName: "", lastName: "", nic: "", email: "", countryId: undefined, password: "", confirmedPassword: "", }),

}));


export default useRegisterForm;