import { loginForm, user, userData } from "@/interfaces/authInterface";
import axios from "axios";

export async function userLogin(user: loginForm) {
    const userLoginFetch = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/auth/signin`, {
        email: user.email,
        password: user.password
    });

    return userLoginFetch.data as user
}

export async function userRegister(user: userData) {
    const userLoginFetch = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/auth/signup`, {
        firstName: user.firstName,
        lastName: user.lastName,
        nic: user.nic,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
        roleId: user.roleId,
        statusId: user.statusId,
        organizationId: user.organizationId,
        countryId: user.countryId
    });
    console.log(user)
    return userLoginFetch
}

export async function sendChangePasswordEmail(email: string) {
    const changePassword = await axios.post(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/auth/forgot-password`, {
        email,
        url: `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/Auth/Password/`
    });
    return changePassword
}

export async function changePassword(data: { token: string, newPassword: string }) {
    const changePassword = await axios.put(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/auth/change-password`, {
        token: data.token,
        newPassword: data.newPassword
    });
    return changePassword
}