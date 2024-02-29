import { user } from "@/interfaces/usersInterface";
import { postApplication, putApplication } from "./fetchs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { checkImageType } from "../images/methods";
import { postFiles } from "../images/fetch";
import { applications } from "@/interfaces/usersAppInterface";

export function useCreateApplication() {
    return useMutation({
        mutationFn: async (application: applications) => {

            let applicationDocuments = await Promise.all(
                application.applicationDocuments.map(async (doc) => {
                    checkImageType(doc.url) ? postFiles(doc.url as File).then((file) => doc.url = file) : doc.url || ""
                    return doc
                }
                )
            )

            let requiredDocuments = await Promise.all(
                application.requiredDocuments.map(async (doc) => {
                    checkImageType(doc.url) ? postFiles(doc.url as File).then((file) => doc.url = file) : doc.url || ""
                    return doc
                }
                )
            )

            postApplication({ ...application, applicationDocuments, requiredDocuments })

        }
    })
}