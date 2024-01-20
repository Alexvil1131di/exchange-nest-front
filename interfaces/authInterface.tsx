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
    roleId: number | undefined;
    statusId: number | undefined;
    organizationId: number | undefined;
    countryId: number | undefined;
    token: string;

}
