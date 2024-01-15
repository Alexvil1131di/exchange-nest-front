export interface institutions {
    id?: number;
    name: string;
    imageUrl?: File | string;
    description: string;
    email: string;
    phoneNumber: string;
    address: string;
    organizationTypeId?: number;
    statusId?: number;
    organizationTypeText?: string;
}
