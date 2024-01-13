import { useQuery } from "@tanstack/react-query";
import { getStatuses } from "./fetchs";

export function useGetStatus() {
    return useQuery({ queryKey: ['status'], queryFn: getStatuses })
}