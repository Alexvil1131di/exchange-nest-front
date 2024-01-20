interface Program {
    id?: number;
    name: string;
    description: string;
    limitApplicationDate: string;
    imagesUrl?: string[] | File[] | string; // commas separated string
    documents?: string; // commas separated string
    startDate: string;
    finishDate: string;
    organizationId?: number;
    countryId?: number;
    stateId?: number;
    statusId?: number;
}
