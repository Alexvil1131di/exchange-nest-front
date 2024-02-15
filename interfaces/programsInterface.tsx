interface Program {
    id?: number;
    name: string;
    description: string;
    limitApplicationDate: string;
    imagesUrl?: string[] | File[] | string; // commas separated string
    applicationDocuments: any | string[],
    requiredDocuments: any | string[],
    startDate: string;
    finishDate: string;
    organizationId?: number;
    countryId?: number;
    stateId?: number;
    statusId?: number;
}
