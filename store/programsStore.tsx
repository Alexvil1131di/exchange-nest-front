import { create } from 'zustand';

interface programsForm {
    program: Program;
    setProgram: (newProgram: Program) => void;
    setName: (newName: string) => void;
    setImage: (newImage: string) => void;
    setDescription: (newDescription: string) => void;
    setLimitApplicationDate: (newLimitApplicationDate: string) => void;
    addApplicationDocuments: () => void;
    addRequiredDocuments: () => void;
    deleteApplicationDocuments: (index: number) => void;
    deleteRequiredDocuments: (index: number) => void;
    setApplicationDocuments: (value: string, index: number) => void;
    setRequiredDocuments: (value: string, index: number) => void;
    setStartDate: (newStartDate: string) => void;
    setFinishDate: (newFinishDate: string) => void;
    setOrganizationId: (newOrganizationId: number) => void;
    setCountryId: (newCountryId: number) => void;
    setStateId: (newStateId: number) => void;
    setStatusId: (newStatusId: number) => void;
    reset: () => void;
}

const useProgramForm = create<programsForm>((set, get) => ({
    program: {
        name: "",
        description: "",
        limitApplicationDate: "2024-04-30T00:00:00.000Z",
        applicationDocuments: [],
        requiredDocuments: [],
        documents: "",
        startDate: "",
        finishDate: "",
        imageUrl: [""]

    },

    setProgram: (newProgram) => set({ program: newProgram }),
    setName: (newName) => set((state) => ({ program: { ...state.program, name: newName } })),
    setImage: (newImage) => set((state) => ({ program: { ...state.program, imagesUrl: newImage } })),
    setDescription: (newDescription) => set((state) => ({ program: { ...state.program, description: newDescription } })),
    setLimitApplicationDate: (newLimitApplicationDate) => set((state) => ({ program: { ...state.program, limitApplicationDate: newLimitApplicationDate } })),
    setDocuments: (newDocuments) => set((state) => ({ program: { ...state.program, documents: newDocuments } })),
    setApplicationDocuments: (value, index) => set((state) => ({ program: { ...state.program, applicationDocuments: state.program.applicationDocuments.map((item, i) => i === index ? value : item) } })),
    setRequiredDocuments: (value, index) => set((state) => ({ program: { ...state.program, requiredDocuments: state.program.requiredDocuments.map((item, i) => i === index ? value : item) } })),
    addApplicationDocuments: () => set((state) => ({ program: { ...state.program, applicationDocuments: [...state.program.applicationDocuments, ""] } })),
    addRequiredDocuments: () => set((state) => ({ program: { ...state.program, requiredDocuments: [...state.program.requiredDocuments, ""] } })),
    deleteApplicationDocuments: (index) => set((state) => ({ program: { ...state.program, applicationDocuments: state.program.applicationDocuments.filter((item, i) => i !== index) } })),
    deleteRequiredDocuments: (index) => set((state) => ({ program: { ...state.program, requiredDocuments: state.program.requiredDocuments.filter((item, i) => i !== index) } })),
    setStartDate: (newStartDate) => set((state) => ({ program: { ...state.program, startDate: newStartDate } })),
    setFinishDate: (newFinishDate) => set((state) => ({ program: { ...state.program, finishDate: newFinishDate } })),
    setOrganizationId: (newOrganizationId) => set((state) => ({ program: { ...state.program, organizationId: newOrganizationId } })),
    setCountryId: (newCountryId) => set((state) => ({ program: { ...state.program, countryId: newCountryId } })),
    setStateId: (newStateId) => set((state) => ({ program: { ...state.program, stateId: newStateId } })),
    setStatusId: (newStatusId) => set((state) => ({ program: { ...state.program, statusId: newStatusId } })),
    reset: () => set((state) => ({ program: { name: "", description: "", limitApplicationDate: "", requiredDocuments: [""], applicationDocuments: [""], startDate: "", finishDate: "", organizationId: 0, countryId: 0, stateId: 0, statusId: 0 } })),
}));

export default useProgramForm;