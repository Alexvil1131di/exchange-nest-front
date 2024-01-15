export function checkImageType(image: File | string | undefined) {
    return image !== null && typeof image == "object"
}