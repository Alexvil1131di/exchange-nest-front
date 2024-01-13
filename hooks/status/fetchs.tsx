import { institutions } from "@/interfaces/institutionsInterface";
import axios from "axios";
import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";


export async function getStatuses() {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string);

    const postOrganization = await axios.get(`${process.env.NEXT_PUBLIC_BASE_SERVER_URL}/api/genericData/statuses`,
        {
            headers: {
                Authorization: `Bearer ${decryptedToken}`,
            },
        });

    return postOrganization.data as { id: number, description: string }[];
}