
export function getStatusIdByName(status: string, statuses: { id: number, description: string }[] | undefined) {
    return statuses?.find((statusObject) => statusObject.description == status)?.id
}

export function getStatusNameById(id: number | undefined, statuses: { id: number, description: string }[] | undefined) {
    return statuses?.find((statusObject) => statusObject.id === id)?.description
}