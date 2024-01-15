import { institutions } from "@/interfaces/institutionsInterface";
import { checkImageType } from "../images/methods";
import { postOrganization, getOrganizations, deleteOrganization, putOrganization } from "./fetchs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { postImage } from "../images/fetch";

export function useCreateOrganization() {
    return useMutation({
        mutationFn: async (institution: institutions) => {
            checkImageType(institution?.imageUrl) ? postImage(institution?.imageUrl as File).then((img) => { postOrganization({ ...institution, imageUrl: img }) }) : postOrganization(institution)

        }
    })
}

export function useGetOrganizations() {
    return useQuery({ queryKey: ['institution'], queryFn: getOrganizations })
}

export function useUpdateOrganization() {
    return useMutation({
        mutationFn: async (institution: institutions) => {
            checkImageType(institution?.imageUrl) ? postImage(institution?.imageUrl as File).then((img) => { putOrganization({ ...institution, imageUrl: img }) }) : putOrganization(institution)

        }
    })
}

export function useDeleteOrganization() {
    return useMutation({
        mutationFn: async (idArray: number[]) => { idArray.map((id) => { setTimeout(async () => { deleteOrganization(id) }, 500); }) },
    })
} postOrganization