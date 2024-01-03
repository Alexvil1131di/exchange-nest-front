import { institutions } from "@/interfaces/institutionsInterface";
import { postOrganization, getOrganizations, deleteOrganization, putOrganization } from "./fetchs";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useCreateOrganization() {
    return useMutation({
        mutationFn: postOrganization,
    })
}

export function useGetOrganizations() {
    return useQuery({ queryKey: ['institution'], queryFn: getOrganizations })
}

export function useUpdateOrganization() {
    return useMutation({
        mutationFn: putOrganization,
    })
}

export function useDeleteOrganization() {
    return useMutation({
        mutationFn: async (idArray: number[]) => { idArray.map((id) => { setTimeout(async () => { deleteOrganization(id) }, 500); }) },
    })
}