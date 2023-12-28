export interface loginForm {
    email: string,
    password: string
}

export interface userData {
    firstName: string;
    lastName: string;
    nic: string;
    email: string;
    password: string;
    birthDate: string;
    roleId: number;
    statusId: number;
    organizationId: number;
    countryId: number;
}

export interface user {
    id: number;
    firstName: string;
    lastName: string;
    nic: string;
    email: string;
    birthDate: string;
    roleText: string;
    statusId: number;
    organizationId: number;
    countryId: number;
    accessToken: string;
}