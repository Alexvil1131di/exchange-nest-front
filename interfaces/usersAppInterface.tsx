export interface applications {
    id?: number;
    programId?: number;
    studentId?: number;
    reason?: string;
    statusId: number;
    applicationDocuments: {
        id?: number;
        category: string;
        url: string | File;
    }[];
    requiredDocuments: {
        id?: number;
        category: string;
        url: string | File;
    }[];
}