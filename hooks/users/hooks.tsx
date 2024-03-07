import { user } from "@/interfaces/usersInterface";
import { postUser, getUsers, deleteUsers, putUser, getUserById } from "./fetchs";
import { useQuery, useMutation } from "@tanstack/react-query";
import { checkImageType } from "../images/methods";
import { postImage } from "../images/fetch";

export function useCreateUser() {
    return useMutation({
        mutationFn: async (user: user) => {
            checkImageType(user?.imageUrl) ? postImage(user?.imageUrl as File).then((img) => { postUser({ ...user, imageUrl: img }) }) : postUser(user)

        }
    })
}

export function useGetUsers() {
    return useQuery({ queryKey: ['users'], queryFn: getUsers })
}

export function useUpdateUser() {
    return useMutation({
        mutationFn: async (user: user) => {
            checkImageType(user?.imageUrl) ? postImage(user?.imageUrl as File).then(async (img) => { await putUser({ ...user, imageUrl: img }) }) : await putUser(user);
        }
    })
}

export function useDeleteUser() {
    return useMutation({
        mutationFn: async (idArray: number[]) => { idArray.map((id) => { setTimeout(async () => { deleteUsers(id) }, 500); }) },
    })
}

export function useGetUserById() {
    return useMutation({
        mutationFn: getUserById,
    })
}

export function useGetUserByIdStore(id: number | undefined) {
    return useQuery({ queryKey: ['userById', id], queryFn: () => { return (id ? getUserById(id) : undefined) } })
}