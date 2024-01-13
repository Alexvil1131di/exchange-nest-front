
export function getStatusIdByName(status: string, statuses: { id: number, description: string }[] | undefined, setStatus?: Function) {
    let StatusId = statuses?.find((statusObject) => statusObject.description == status)?.id
    setStatus && setStatus(StatusId as number)
}

export function getStatusNameById(id: number, statuses: { id: number, description: string }[] | undefined) {
    return statuses?.find((statusObject) => statusObject.id === id)?.description
}