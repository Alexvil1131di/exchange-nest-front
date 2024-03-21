export interface user {
    id?: number;
    imageUrl?: string | File;
    firstName: string;
    lastName: string;
    nic: string;
    email: string;
    password?: string;
    birthDate: string;
    roleText?: string;
    roleId?: number;
    statusId?: number;
    organizationId?: number;
    countryId?: number;
    accessToken?: string;
    language?: "En" | "Es";
}