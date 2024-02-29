import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UsersProgramCard from '@/components/cards/userProgramCard';
import UserNavBar from '@/components/usersNavBar';
import { useGetPrograms } from '@/hooks/programs/hooks';
import useProgramForm from '@/store/programsStore';
import { useRouter } from 'next/router';
import useApplicationForm from '@/store/usersAppStore';


const UsersApp = () => {

    const { data: programs, isLoading } = useGetPrograms();
    const [search, setSearch] = React.useState('')
    const { program, setProgram } = useProgramForm();
    const router = useRouter();
    const { application, setApplication, reset } = useApplicationForm();


    function filterPrograms() {
        return programs?.filter((program: any) => {
            return program.name.toLowerCase().includes(search.toLowerCase());
        })
    }

    // function setSelectedProgram(program: Program) {
    //     setProgram({ ...program, imagesUrl: (program?.imagesUrl as string).split(","), applicationDocuments: program.applicationDocuments.length > 0 ? program.applicationDocuments.split(",") : [], requiredDocuments: program.requiredDocuments.length > 0 ? program.requiredDocuments.split(",") : [] });
    // }

    return (
        <>
            <div className='flex flex-col gap-3 w-full items-center p-5 mt-4 mb-16'>
                <UsersAppSearchBar value={search} onChange={(e) => { setSearch(e.target.value) }} />

                <div className='flex flex-col flex-wrap flex-shrink-0 gap-3 md:flex-row md:gap-16 w-full items-center' >
                    {filterPrograms()?.map((program) => (
                        <UsersProgramCard key={program.id} name={program.name} images={(program?.imagesUrl as string).split(",")} description={program.description} onClick={() => { reset(); router.push(`/UsersApp/${program.id}/userProgram`) }} />
                    ))
                    }

                </div>

                {filterPrograms()?.length === 0 && !isLoading &&

                    <div className='flex flex-col items-center gap-3'>
                        <h1 className='text-[20px] font-medium'>No programs found</h1>
                    </div>

                }

            </div>

            <UserNavBar />
        </>

    );
};

export default UsersApp;
