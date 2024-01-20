import { useQuery } from "@tanstack/react-query";
import { getStatuses, getRoles, getCountries, getOrganizationTypes } from "./fetchs";

export function useGetStatus() {
    return useQuery({ queryKey: ['status'], queryFn: getStatuses })
}

export function useGetRoles() {
    return useQuery({ queryKey: ['role'], queryFn: getRoles })
}

export function useGetOrganizationTypes() {
    return useQuery({ queryKey: ['organizationType'], queryFn: getOrganizationTypes })
}

export function useGetCountries() {
    return useQuery({ queryKey: ['country'], queryFn: getCountries })
}