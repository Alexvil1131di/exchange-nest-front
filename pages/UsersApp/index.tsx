import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UsersProgramCard from '@/components/cards/userProgramCard';
import UserNavBar from '@/components/usersNavBar';
import { useGetPrograms } from '@/hooks/programs/hooks';
import useProgramForm from '@/store/programsStore';
import { useRouter } from 'next/router';
import useApplicationForm from '@/store/usersAppStore';
import { useGetApplications } from '@/hooks/usersApp/hooks';
import { useGetOrganizations } from '@/hooks/Institutions/hooks';
import useLoginForm from '@/store/singInStore';
import NothingToSeeHere from '@/components/cards/nothingToSee';


const UsersApp = () => {

    const { data: programs, isLoading } = useGetPrograms();
    const { data: applications } = useGetApplications();
    const { data: Organization } = useGetOrganizations();

    const [search, setSearch] = React.useState('')
    const router = useRouter();
    const { reset } = useApplicationForm();

    function getOrganizationById(id: number) {
        return Organization?.find((organization: any) => organization.id === id)
    }

    function filterPrograms() {
        let applicatedPrograms = applications?.filter((application: any) => application.statusId !== 6).map((application: any) => application.programId)
        let filteredPtograms = programs?.filter((program: any) => program.name.toLowerCase().includes(search.toLowerCase()) && !applicatedPrograms?.includes(program.id))

        return filteredPtograms || []

    }

    return (
        <>
            <div className='flex flex-col gap-3 w-full h-full items-center p-5 mt-4 pb-[84px]'>
                <div className='flex flex-col w-full whitespace-nowrap items-center gap-4'>
                    <p className='text-[20px] font-medium'>Exchange Nest</p>
                    <UsersAppSearchBar value={search} onChange={(e) => { setSearch(e.target.value) }} />
                </div>

                <div className='flex flex-col flex-wrap gap-3 md:flex-row md:gap-16 w-full items-center pb-[84px]' >
                    {filterPrograms()?.map((program) => (
                        <UsersProgramCard key={program.id} institutionName={getOrganizationById(program.organizationId as number)?.name} name={program.name} images={(program?.imagesUrl as string).split(",")} description={program.description} onClick={() => { reset(); router.push(`/UsersApp/${program.id}/userProgram`) }} />
                    ))
                    }

                </div>

                {filterPrograms()?.length < 1 && !isLoading &&
                    <NothingToSeeHere />
                }

            </div>
            <UserNavBar />

        </>

    );
};

export default UsersApp;
