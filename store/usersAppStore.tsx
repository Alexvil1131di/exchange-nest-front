import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import { stringEncrypter } from '@/hooks/auth/methods';
import { applications } from '@/interfaces/usersAppInterface';

interface applicationForm {
    application: applications;
    setApplication: (newApplication: applications) => void;
    setProgramId: (newProgramId: number) => void;
    setStudentId: (newStudentId: number) => void;
    setReason: (newReason: string) => void;
    setStatusId: (newStatusId: number) => void;
    setApplicationDocument: (newApplicationDocument: { id?: number; category: string; url: string | File; statusId: number; reason?: string; }) => void;
    setRequiredDocument: (newRequiredDocument: { id?: number; category: string; url: string | File; statusId: number; reason?: string; }) => void;
    reset: () => void;

}

const useApplicationForm = create<applicationForm>((set, get) => ({

    application: {
        programId: 0,
        studentId: 0,
        reason: "",
        statusId: 5,
        applicationDocuments: [],
        requiredDocuments: [],
    },

    setApplication: (newApplication) => set({ application: newApplication }),
    setProgramId: (newProgramId) => set((state) => ({ application: { ...state.application, programId: newProgramId } })),
    setStudentId: (newStudentId) => set((state) => ({ application: { ...state.application, studentId: newStudentId } })),
    setReason: (newReason) => set((state) => ({ application: { ...state.application, reason: newReason } })),
    setStatusId: (newStatusId) => set((state) => ({ application: { ...state.application, statusId: newStatusId } })),
    setApplicationDocument: (newApplicationDocument) => set((state) => ({ application: { ...state.application, applicationDocuments: [...state.application.applicationDocuments, newApplicationDocument] } })),
    setRequiredDocument: (newRequiredDocument) => set((state) => ({ application: { ...state.application, requiredDocuments: [...state.application.requiredDocuments, newRequiredDocument] } })),
    reset: () => set((state) => ({ application: { programId: 0, studentId: 0, reason: "", statusId: 1, applicationDocuments: [], requiredDocuments: [] } })),
}));

export default useApplicationForm;
