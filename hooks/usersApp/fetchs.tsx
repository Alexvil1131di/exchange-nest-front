import axios from "axios";
import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";
import { applications } from "@/interfaces/usersAppInterface";

export async function getApplications() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const getApplications = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/applications`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return getApplications.data as applications[];
}

export async function postApplication(application: applications) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postApplication = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/applications`, {
        programId: application.programId,
        studentId: application.studentId,
        reason: application.reason,
        statusId: application.statusId,
        applicationDocuments: application.applicationDocuments,
        requiredDocuments: application.requiredDocuments,
    },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postApplication.data as string;
}

export async function putApplication(application: applications) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const putApplication = await axios.put(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/applications`, {
        programId: application.programId,
        studentId: application.studentId,
        reason: application.reason,
        statusId: application.statusId,
        applicationDocuments: application.applicationDocuments,
        requiredDocuments: application.requiredDocuments,
    },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return putApplication.data as string;
}