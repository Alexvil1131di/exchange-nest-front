import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";
import axios from "axios";

export async function getPrograms() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/exchange-programs`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as Program[];
}

export async function getProgramsById(id: number) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/exchange-programs/${id}`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as Program;
}

export async function postPrograms(program: Program) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/exchange-programs`,
        {
            name: program.name,
            description: program.description,
            limitApplicationDate: program.limitApplicationDate + "T00:00:00.000Z",
            startDate: program.startDate + "T00:00:00.000Z",
            finishDate: program.finishDate + "T00:00:00.000Z",
            applicationDocuments: program.applicationDocuments.filter((item) => item.length > 0).join(",") || "",
            requiredDocuments: program.requiredDocuments.filter((item) => item.length > 0).join(",") || "",
            imagesUrl: program.imagesUrl,
            organizationId: program.organizationId,
            countryId: program.countryId,
            stateId: 1,
            statusId: program.statusId
        },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as Program[];
}

export async function putPrograms(program: Program) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.put(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/exchange-programs`,
        {
            id: program.id,
            name: program.name,
            description: program.description,
            limitApplicationDate: program.limitApplicationDate + "T00:00:00.000Z",
            startDate: program.startDate + "T00:00:00.000Z",
            finishDate: program.finishDate + "T00:00:00.000Z",
            applicationDocuments: program.applicationDocuments.filter((item) => item.length > 0).join(",") || "",
            requiredDocuments: program.requiredDocuments.filter((item) => item.length > 0).join(",") || "",
            imagesUrl: program.imagesUrl,
            countryId: program.countryId,
            stateId: 1,
            statusId: program.statusId
        },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as Program[];
}

export async function deleteProgram(id: number) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/exchange-programs/${id}`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as Program[];
}

