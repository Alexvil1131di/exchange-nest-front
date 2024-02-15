import axios from "axios";
import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";
import { user } from "@/interfaces/usersInterface";

export async function postUser(user: user) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postUser = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/auth/signup`, {
        firstName: user.firstName,
        lastName: user.lastName,
        nic: user.nic,
        imageUrl: user.imageUrl,
        email: user.email,
        password: user.password,
        birthDate: "2024-01-03T14:27:55.851Z",
        roleId: user.roleId,
        statusId: user.statusId,
        organizationId: user.organizationId,
        countryId: user.countryId,
    },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postUser.data as string;
}

export async function getUsers() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const getUsers = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/user`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return getUsers.data as user[];
}

export async function putUser(user: user) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const putUser = await axios.put(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/user`, {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        nic: user.nic,
        email: user.email,
        password: user.password,
        birthDate: "2024-01-03T14:27:55.851Z",
        organizationId: user.organizationId,
        statusId: user.statusId,
        roleId: user.roleId,
        countryId: user.countryId,

    },
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return putUser.data as string;
}

export async function deleteUsers(id: number) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const deleteOrganization = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/user/${id}`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return deleteOrganization.data as string;
}