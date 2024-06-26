
import { getPrograms, postPrograms, putPrograms, deleteProgram, getProgramsById } from "./fetchs";
import { checkImageType } from "../images/methods";
import { postImage } from "../images/fetch";
import { useQuery, useMutation } from "@tanstack/react-query";

export function useCreatePrograms() {
    return useMutation({
        mutationFn: async (program: Program) => {
            let imageUrls: string[] = [];

            if (program.imagesUrl) {
                for (let i = 0; i < program.imagesUrl.length; i++) {
                    const image = program.imagesUrl[i];
                    if (checkImageType(image)) {
                        const res = await postImage(image as File);
                        imageUrls[i] = res;
                    } else {
                        imageUrls[i] = image as string;
                    }
                }
            }

            return postPrograms({ ...program, imagesUrl: imageUrls.join(",") });
        }
    })
}

export function useUpdatePrograms() {
    return useMutation({
        mutationFn: async (program: Program) => {
            let imageUrls: string[] = [];

            if (program.imagesUrl) {
                await Promise.all(Array.isArray(program.imagesUrl) ? program.imagesUrl.map(async (image) => {
                    if (checkImageType(image)) {
                        const res = await postImage(image as File);
                        imageUrls.push(res);
                    }
                    else {
                        imageUrls.push(image as string);
                    }
                }) : []
                );
            }

            return putPrograms({ ...program, imagesUrl: imageUrls.join(",") });

        }
    })
}

export function useGetPrograms() {
    return useQuery({ queryKey: ['programs'], queryFn: getPrograms })
}

export function useGetProgramsById() {
    return useMutation({
        mutationFn: getProgramsById,
    })
}

export function useGetProgramsByIdStore(id: number | undefined) {
    return useQuery({ queryKey: ['programs', id], queryFn: () => { return (id ? getProgramsById(id) : undefined) } })
}

export function useDeletePrograms() {
    return useMutation({
        mutationFn: deleteProgram
    })
}