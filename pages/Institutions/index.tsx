'use client'

import React, { useState } from 'react';
import NavBar from '@/components/navBar';
import InputComponent from '@/components/inputs/InputComponent';
import CustomizableButton from '@/components/buttons/CustomizableButton';
import EditIcon from '@/public/editIcon.svg';
import TrashCan from '@/public/trashCan.svg';
import CustomTable from '@/components/tables/Table';
import { TableRow, TableCell } from '@mui/material';
import CommerceInfo from '@/components/modals/ComerceInfo';
import useInstitutionForm from '@/store/institutionsStore';
import { toast } from 'react-toastify'
import { useGetOrganizations, useCreateOrganization, useDeleteOrganization, useUpdateOrganization } from '@/hooks/Institutions/hooks';

const Institution = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [checkedIds, setCheckedIds] = useState<number[]>([]); // [1,2,3] 
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { data: institutionArray, refetch } = useGetOrganizations()
    const { mutateAsync: createOrganization } = useCreateOrganization();
    const { mutateAsync: putOrganization } = useUpdateOrganization();
    const { mutateAsync: deleteOrganization } = useDeleteOrganization();
    const { institution, setInsitution, reset } = useInstitutionForm();

    const mockData = [
        {
            id: 1,
            date: "2021-10-10",
            name: "John Doe",
            description: "Web Developer",
            email: "john.doe@example.com",
            phoneNumber: "555-1234",
            address: "123 Main St, Cityville, Country",
            organizationTypeText: "Tech Company"
        },
        {
            id: 2,
            date: "2021-10-10",
            name: "Jane Smith",
            description: "Marketing Specialist",
            email: "jane.smith@example.com",
            phoneNumber: "555-5678",
            address: "456 Oak St, Townsville, Country",
            organizationTypeText: "Marketing Agency"
        },
        {
            id: 3,
            date: "2021-10-10",
            name: "Bob Johnson",
            description: "Product Manager",
            email: "bob.johnson@example.com",
            phoneNumber: "555-9876",
            address: "789 Pine St, Villageland, Country",
            organizationTypeText: "Product Company"
        }
    ];

    const columns = [
        { id: 'checkBox', label: "", align: 'start', maxWidth: '127px' },
        { id: 'date', label: 'Date', align: 'start', maxWidth: '127px' },
        { id: 'institution', label: 'Institution Name', align: 'start', maxWidth: '127px' },
        { id: 'email', label: 'Email', align: 'start', maxWidth: '127px' },
        { id: 'phone', label: 'Phone Number', align: 'start', maxWidth: '127px' },
        { id: 'status', label: 'Status ', align: 'start', maxWidth: '127px' },

    ];

    const handleSubmit = () => {

        if (institution.id) {
            toast.promise(putOrganization(institution), {
                pending: 'Updating institution...',
                success: 'Institution updated successfully',
                error: 'Error updating institution'
            }).then(() => { refetch(); setOpenModal(false); reset() }).catch(() => { })
        }
        else {
            toast.promise(createOrganization(institution), {
                pending: 'Creating institution...',
                success: 'Institution created successfully',
                error: 'Error creating institution the email is already in use'
            }).then(() => { refetch(); setOpenModal(false); reset() }).catch(() => { })
        }
    }

    const handleDelete = () => {
        if (checkedIds.length > 0) {
            toast.promise(deleteOrganization(checkedIds), {
                pending: 'Deleting institutions...',
                success: 'Institutions deleted successfully',
                error: 'Error deleting institution'
            }).then(() => { refetch(); setCheckedIds([]) }).catch(() => { })
        }
        else {
            toast.error('You must select at least one institution to delete')
        }
    }

    const handleEdit = () => {
        if (checkedIds.length > 1 || checkedIds.length < 1) {
            toast.error('You can only edit one institution at a time')
        }
        else {
            const institution = institutionArray?.find((dat) => dat.id === checkedIds[0]);
            if (institution) {
                setInsitution(institution);
                setOpenModal(true);
            }
        }

    }

    const filterData = (data, searchText = '', status = '') => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }

        const filteredData = data.filter(item => {
            const textMatch = searchText.trim() === '' || Object.values(item).some(value => {
                if (typeof value === 'string') {
                    const normalizedValue = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normalizedSearchText = searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedValue.includes(normalizedSearchText);
                }
                return false;
            });

            const statusMatch = status.trim() === '' || Object.values(item).some(value => {
                if (typeof value === 'string') {
                    const normalizedValue = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normalizedStatus = status.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedValue.includes(normalizedStatus);
                }
                return false;
            });

            return textMatch && statusMatch;
        });

        return filteredData;
    }

    function addToUniqueArray(value: number) {
        const index = checkedIds.indexOf(value);
        let _checkedIds = [...checkedIds];
        if (index === -1) {
            _checkedIds.push(value);
        } else {
            _checkedIds.splice(index, 1);
        }
        setCheckedIds(_checkedIds);
    }

    function tableRows() {

        return filterData(institutionArray, searchText, statusFilter).map((row, index) => {
            return (
                <>
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} className="">
                        <TableCell sx={{ textAlign: "center", maxWidth: "127px", fontWeight: '500', borderLeft: 'none' }}>
                            <input className="w-5 h-5" type="checkbox" onClick={() => addToUniqueArray(row.id)} checked={checkedIds.includes(row.id)} />
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            {row.date}
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            {row.name}
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            <a href={`mailto:${row.email}`}>{row.email}</a>
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            {row.phoneNumber}
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            {row.organizationTypeText}
                        </TableCell>

                    </TableRow>

                </>

            );
        })

    }

    return (
        <>
            <NavBar />

            <div className='flex flex-col gap-8 p-6 mt-14'>
                <h1 className='text-[20px] font-medium'>Institutions administrator</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} label='Search' width='w-full md:max-w-[300px]' errorMessage={''} onChange={(e) => { setSearchText(e.target.value) }} />
                        <InputComponent type={'dropdown'} label='Search' value={statusFilter} width='w-full md:max-w-[250px]' errorMessage={''} onChange={setStatusFilter} options={institutionArray?.map((dat) => dat.organizationTypeText) as string[]} />
                    </div>

                    <div className=' flex gap-4'>
                        <CustomizableButton text={'CREATE INSTITUTIONS'} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:w-[180px]  h-[45px]' onClick={() => { setOpenModal(true) }} />
                        <CustomizableButton text={'EDIT'} bgColor='bg-[#ffffff]' beforeImage={<EditIcon className={" w-5 h-5 fill-[#52BAAB]"} />} textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='px-8 h-[45px]' onClick={() => { handleEdit() }} />
                    </div>

                    <CustomizableButton text={'DELETE'} bgColor='bg-[#16688C]' beforeImage={<TrashCan className={" w-5 h-5 fill-[#ffffff]"} />} textColor='text-[#ffffff] ' maxSize='px-8 h-[45px]' onClick={() => { handleDelete() }} />

                </div>

                <CustomTable columns={columns} rows={tableRows()} page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} length={filterData(institutionArray, searchText, statusFilter).length} />
                {openModal && <CommerceInfo closeModal={() => { setOpenModal(false), reset() }} headerMessage={`${institution.id ? "Update" : "Create"}  Institution`} onSubmit={() => { handleSubmit() }} />}

            </div>
        </>
    );
};

export default Institution;
