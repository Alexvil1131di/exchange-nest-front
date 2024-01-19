import { useQuery } from "@tanstack/react-query";
import { getStatuses, getRoles, getOrganizationTypes } from "./fetchs";

export function useGetStatus() {
    return useQuery({ queryKey: ['status'], queryFn: getStatuses })
}

export function useGetRoles() {
    return useQuery({ queryKey: ['role'], queryFn: getRoles })
}

export function useGetOrganizationTypes() {
    return useQuery({ queryKey: ['organizationType'], queryFn: getOrganizationTypes })
}