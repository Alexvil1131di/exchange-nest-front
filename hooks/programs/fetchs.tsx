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