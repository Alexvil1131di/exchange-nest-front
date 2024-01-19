import { institutions } from "@/interfaces/institutionsInterface";
import axios from "axios";
import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";


export async function getStatuses() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const getStatus = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/genericData/statuses`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return getStatus.data as { id: number, description: string }[];
}

export async function getRoles() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const getRoles = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/genericData/roles`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return getRoles.data as { id: number, description: string }[];
}

export async function getOrganizationTypes() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const getOrganizationTypes = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/genericData/organization-types`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return getOrganizationTypes.data as { id: number, description: string }[];
}
