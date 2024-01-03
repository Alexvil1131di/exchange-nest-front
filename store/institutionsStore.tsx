import { create } from 'zustand';
import { institutions } from '@/interfaces/institutionsInterface';
import { persist, createJSONStorage } from 'zustand/middleware'
import { stringEncrypter } from '@/hooks/auth/methods';

interface organizationForm {
    institution: institutions;
    setInsitution: (newInstitution: institutions) => void;
    setName: (newName: string) => void;
    setImage: (newImage: string) => void;
    setDescription: (newDescription: string) => void;
    setEmail: (newEmail: string) => void;
    setPhoneNumber: (newPhoneNumber: string) => void;
    setAddress: (newAddress: string) => void;
    setOrganizationTypeId: (newOrganizationTypeId: number) => void;
    setStatusId: (newStatusId: number) => void;
    reset: () => void;
}

const useInstitutionForm = create<organizationForm>((set, get) => ({
    institution: {
        name: "",
        description: "",
        email: "",
        phoneNumber: "",
        address: "",

    },

    setInsitution: (newInstitution) => set({ institution: newInstitution }),
    setName: (newName) => set((state) => ({ institution: { ...state.institution, name: newName } })),
    setImage: (newImage) => set((state) => ({ institution: { ...state.institution, image: newImage } })),
    setDescription: (newDescription) => set((state) => ({ institution: { ...state.institution, description: newDescription } })),
    setEmail: (newEmail) => set((state) => ({ institution: { ...state.institution, email: newEmail } })),
    setPhoneNumber: (newPhoneNumber) => set((state) => ({ institution: { ...state.institution, phoneNumber: newPhoneNumber } })),
    setAddress: (newAddress) => set((state) => ({ institution: { ...state.institution, address: newAddress } })),
    setOrganizationTypeId: (newOrganizationTypeId) => set((state) => ({ institution: { ...state.institution, organizationTypeId: newOrganizationTypeId } })),
    setStatusId: (newStatusId) => set((state) => ({ institution: { ...state.institution, statusId: newStatusId } })),
    reset: () => set((state) => ({ institution: { name: "", description: "", email: "", phoneNumber: "", address: "" } })),
}));

export default useInstitutionForm;
