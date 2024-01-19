
import { getPrograms } from "./fetchs";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useCreatePrograms() {
    return useMutation({
        mutationFn: async () => {
        }
    })
}

export function useGetPrograms() {
    return useQuery({ queryKey: ['programs'], queryFn: getPrograms })
}