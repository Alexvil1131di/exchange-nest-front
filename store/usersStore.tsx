import { create } from 'zustand';
import { user } from '@/interfaces/usersInterface';

interface usersForm {
    user: user;
    setFirstName: (newFirstName: string) => void;
    setLastName: (newLastName: string) => void;
    setImage: (newImage: string | File) => void;
    setCountryId: (newCountryId: number) => void;
    setNic: (newNic: string) => void;
    setRoleId: (newRoleId: number) => void;
    setStatusId: (newStatusId: number) => void;
    setOrganizationId: (newOrganizationId: number) => void;
    setBirthDate: (newBirthDate: string) => void;
    setEmail: (newEmail: string) => void;
    setPassword: (newPassword: string) => void;
    setUser: (newUser: user) => void;
    reset: () => void;
}

const useUserForm = create<usersForm>((set, get) => ({
    user: {
        firstName: "",
        lastName: "",
        nic: "",
        email: "",
        password: "",
        birthDate: "",
    },

    setFirstName: (newFirstName) => set((state) => ({ user: { ...state.user, firstName: newFirstName } })),
    setLastName: (newLastName) => set((state) => ({ user: { ...state.user, lastName: newLastName } })),
    setImage: (newImage) => set((state) => ({ user: { ...state.user, imageUrl: newImage } })),
    setCountryId: (newCountryId) => set((state) => ({ user: { ...state.user, countryId: newCountryId } })),
    setNic: (newNic) => set((state) => ({ user: { ...state.user, nic: newNic } })),
    setBirthDate: (newBirthDate) => set((state) => ({ user: { ...state.user, birthDate: newBirthDate } })),
    setRoleId: (newRoleId) => set((state) => ({ user: { ...state.user, roleId: newRoleId } })),
    setStatusId: (newStatusId) => set((state) => ({ user: { ...state.user, statusId: newStatusId } })),
    setOrganizationId: (newOrganizationId) => set((state) => ({ user: { ...state.user, organizationId: newOrganizationId } })),
    setEmail: (newEmail) => set((state) => ({ user: { ...state.user, email: newEmail } })),
    setPassword: (newPassword) => set((state) => ({ user: { ...state.user, password: newPassword } })),
    setUser: (newUser) => set({ user: newUser }),
    reset: () => set((state) => ({ user: { firstName: "", lastName: "", nic: "", email: "", password: "", birthDate: "" } })),
}));

export default useUserForm;