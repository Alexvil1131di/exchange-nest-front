'use client'

import React, { use, useState } from 'react';
import NavBar from '@/components/navBar';
import InputComponent from '@/components/inputs/InputComponent';
import CustomizableButton from '@/components/buttons/CustomizableButton';
import ProgramCard from '@/components/cards/programCard';
import UserApplicationCard from '@/components/cards/userApplicationCard';
import { useRouter } from 'next/router';
import { useGetPrograms } from '@/hooks/programs/hooks';
import { useGetApplications } from '@/hooks/usersApp/hooks';
import { useGetUsers } from '@/hooks/users/hooks';
import { useGetStatus } from '@/hooks/genericData/hooks';
import { getStatusNameById, getStatusIdByName } from '@/hooks/genericData/methods';

const Application = () => {

    const { data: programs, isLoading } = useGetPrograms();
    const { data: applications } = useGetApplications();
    const { data: usersArray, refetch } = useGetUsers()
    const { data: status } = useGetStatus()

    const statusArray = status?.map((status) => status.description)
    const programsArray = programs?.map((program) => program.name)

    const [search, setSearch] = useState('')
    const [programName, setProgramName] = useState('')
    const [statusName, setStatusName] = useState('')


    const router = useRouter();

    function getProgramById(id: number) {
        return programs?.find((program) => program.id === id)
    }

    function getUserById(id: number) {
        return usersArray?.find((user) => user.id === id)
    }

    function filteredApplications() {

        let filteredApplications = applications

        if (search) {
            let userID = usersArray?.filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()))
            filteredApplications = filteredApplications?.filter((application) => userID?.find((user) => user.id === application.studentId))
        }

        if (programName) {
            let programId = programs?.find((program) => program.name === programName)?.id
            filteredApplications = filteredApplications?.filter((application) => application.programId === programId)
        }

        if (statusName) {
            let statusId = getStatusIdByName(statusName, status)
            filteredApplications = filteredApplications?.filter((application) => application.statusId === statusId)
        }

        return filteredApplications
    }

    return (
        <>
            <NavBar />

            <div className='flex flex-col gap-8 p-4 mt-14'>
                <h1 className='text-[20px] font-medium'>Applications</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} label='Search' width='w-full md:max-w-[300px]' value={search} errorMessage={''} onChange={(e) => { setSearch(e.target.value) }} />
                        <InputComponent type={'dropdown'} label='Status' width='w-full md:max-w-[250px]' value={statusName} errorMessage={''} onChange={(e) => { setStatusName(e) }} options={statusArray} />
                        <InputComponent type={'dropdown'} label='Program' width='w-full md:max-w-[250px]' value={programName} errorMessage={''} onChange={(e) => { setProgramName(e) }} options={programsArray} />
                    </div>


                </div>

                <div className='flex flex-col gap-5 justify-center md:justify-start'>
                    <table className="w-full text-[#000000] text-[15px] font-medium">
                        <thead >
                            <tr >
                                <th >Applicant Name</th>
                                <th className='hidden md:table-cell'>Status</th>
                                <th className='hidden md:table-cell'>Email</th>
                                <th className='hidden md:table-cell'>Program</th>
                                <th>Review</th>
                            </tr>
                        </thead>
                        <tbody>

                            {filteredApplications() ? filteredApplications()?.map((application, index) => (
                                <UserApplicationCard key={index} imageUrl={getUserById(application.studentId as number)?.imageUrl ? `https://qrepipawlxyhhqjvbyqs.supabase.co/storage/v1/object/public/${getUserById(application.studentId as number)?.imageUrl}` : "/userProfile.svg"} applicantName={getUserById(application.studentId as number)?.firstName as string} email={getUserById(application.studentId as number)?.email as string} programName={getProgramById(application.programId as number)?.name as string} status={getStatusNameById(application.statusId, status) as string} onClick={() => { router.push(`/Applications/${application.id}/reviewApplication`) }} />
                            ))

                                : <></>
                            }

                        </tbody>
                    </table>
                </div>





            </div >



        </>
    );
};

export default Application;
