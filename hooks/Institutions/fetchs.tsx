import axios from "axios";
import { institutions } from "@/interfaces/institutionsInterface";
import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";

export async function postOrganization(institution: institutions) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/organization`, {
        name: institution.name,
        description: institution.description,
        email: institution.email,
        phoneNumber: institution.phoneNumber,
        imageUrl: institution.imageUrl,
        address: institution.address,
        organizationTypeId: institution.organizationTypeId,
        statusId: institution.statusId
    },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as string;
}

export async function getOrganizations() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/organization`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as institutions[];
}

export async function putOrganization(institution: institutions) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const putOrganization = await axios.put(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/organization`, {
        id: institution.id,
        name: institution.name,
        description: institution.description,
        email: institution.email,
        imageUrl: institution.imageUrl,
        phoneNumber: institution.phoneNumber,
        address: institution.address,
        organizationTypeId: institution.organizationTypeId,
        statusId: institution.statusId

    },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return putOrganization.data as string;
}

export async function deleteOrganization(id: number) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const deleteOrganization = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/organization/${id}`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return deleteOrganization.data as string;
}