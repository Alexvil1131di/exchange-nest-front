import UsersAppSearchBar from '@/components/inputs/usersAppSearchBar';
import React from 'react';
import UserAppApplicationCard from '@/components/cards/userAppApplicationCard';
import UserNavBar from '@/components/usersNavBar';
import { useGetApplications } from '@/hooks/usersApp/hooks';
import { useGetPrograms } from '@/hooks/programs/hooks';
import { useGetStatus } from '@/hooks/genericData/hooks';
import { getStatusNameById } from '@/hooks/genericData/methods';
import { useRouter } from 'next/router';
import useApplicationForm from '@/store/usersAppStore';

const UsersApp = () => {

    const { data: applications, } = useGetApplications();
    const { data: program, } = useGetPrograms();
    const { data: status, } = useGetStatus();
    const { application, setApplication, reset } = useApplicationForm();

    function getProgramById(id: number | undefined) {
        return program?.find((program) => program.id === id);
    }

    function manageApplications() {
        let cleanApplications = applications?.filter((application) => application.statusId !== 6);
        return cleanApplications;
    }

    const router = useRouter();

    console.log(status)

    return (
        <>
            <div className='flex flex-col w-full p-4 mt-4 mb-16'>

                <h1 className='text-[30px] font-bold text-[#000000] mb-[40px]'>My Applications</h1>

                <div className='mb-3'>
                    <h2 className='text-[14px] font-bold mb-3'>Recent Applications</h2>
                    <div className="flex">
                        <hr className="w-[150px] border-[1px] border-[#000000]" />
                        <hr className="flex-1 border-[1px] border-[#DEDEDE]" />
                    </div>
                </div>

                {manageApplications()?.map((application, index) => (
                    <UserAppApplicationCard key={index} imageUrl={`https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/${(getProgramById(application.programId)?.imagesUrl as string)?.split(",")[0]}`} status={getStatusNameById(application.statusId, status) as string}
                        name={getProgramById(application?.programId)?.name as string} onClick={() => { setApplication(application); router.push(`/UsersApp/${application.programId}-edit/userProgram`) }} />
                ))}

            </div>

            <UserNavBar />
        </>

    );
};

export default UsersApp;
