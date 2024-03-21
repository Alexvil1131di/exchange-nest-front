import { create } from 'zustand';

interface RegisterForm {
    id?: number
    profileImg: string | File | undefined;
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
    setProfileImg: (newProfileImg: string | File | undefined) => void;
    setLastName: (newLastName: string) => void;
    setCountryId: (newCountryId: number) => void;
    setRoleId: (newRoleId: number) => void;
    setNic: (newNic: string) => void;
    setStatusId: (newStatusId: number) => void;
    setOrganizationId: (newOrganizationId: number) => void;
    setEmail: (newEmail: string) => void;
    setPassword: (newPassword: string) => void;
    setConfirmedPassword: (newConfirmedPassword: string) => void;
    setAll: (id: number, newFirstName: string, newLastName: string, newCountryId: number, newRoleId: number, newStatusId: number, newOrganizationId: number, newEmail: string, newNic: string, newProfileImg: string | File | undefined | undefined) => void;
    reset: () => void;
}

const useRegisterForm = create<RegisterForm>((set, get) => ({
    profileImg: "",
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    password: "",
    confirmedPassword: "",

    setFirstName: (newFirstName) => set({ firstName: newFirstName }),
    setProfileImg: (newProfileImg) => set({ profileImg: newProfileImg }),
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
    setAll: (id, newFirstName, newLastName, newCountryId, newRoleId, newStatusId, newOrganizationId, newEmail, newNic) => set({ id: id, firstName: newFirstName, lastName: newLastName, countryId: newCountryId, roleId: newRoleId, statusId: newStatusId, organizationId: newOrganizationId, email: newEmail, nic: newNic, })

}));


export default useRegisterForm;