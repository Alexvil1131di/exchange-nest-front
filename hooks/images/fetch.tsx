import axios from "axios";
import Cookies from "js-cookie";
import { stringDecrypter } from "../auth/methods";

export async function postImage(image: File) {
    const token = Cookies.get("token");
    const decryptedToken = stringDecrypter(token as string)

    let imgName = new Date().getTime()
    let formData = new FormData();
    formData.append('file', image);

    console.log(image.type)

    const response = await axios.post(
        `https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/ExchangeNestImages/Images/${imgName}.${image.type.split("/")[1]}`, formData,
        {
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZXBpcGF3bHh5aGhxanZieXFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDY0MTc3NCwiZXhwIjoyMDIwMjE3Nzc0fQ.5VUseV8EUGQO9R_7IOowxsr72WxPJFRGChVrftn0ng8`,
            },
        }
    );

    return response.data.Key.replace(/ /g, '%20') || "";

}