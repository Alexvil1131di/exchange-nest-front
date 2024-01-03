import { institutions } from "@/interfaces/institutionsInterface";
import { postUser, getUsers, deleteUsers, putUser } from "./fetchs";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useCreateUser() {
    return useMutation({
        mutationFn: postUser,
    })
}

export function useGetUsers() {
    return useQuery({ queryKey: ['users'], queryFn: getUsers })
}

export function useUpdateUser() {
    return useMutation({
        mutationFn: putUser,
    })
}

export function useDeleteUser() {
    return useMutation({
        mutationFn: async (idArray: number[]) => { idArray.map((id) => { setTimeout(async () => { deleteUsers(id) }, 500); }) },
    })
}