'use client'

import React, { useState } from 'react';
import NavBar from '@/components/navBar';
import InputComponent from '@/components/inputs/InputComponent';
import CustomizableButton from '@/components/buttons/CustomizableButton';
import EditIcon from '@/public/editIcon.svg';
import TrashCan from '@/public/trashCan.svg';
import CustomTable from '@/components/tables/Table';
import { TableRow, TableCell } from '@mui/material';
import UserModal from '@/components/modals/usersModal';
import { toast } from 'react-toastify'
import { useCreateUser, useGetUsers, useDeleteUser, useUpdateUser } from '@/hooks/users/hooks';
import useUserForm from '@/store/usersStore';
import { getStatusIdByName, getStatusNameById } from "@/hooks/status/methods";
import { useGetStatus } from '@/hooks/status/hooks';


const User = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchText, setSearchText] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [checkedIds, setCheckedIds] = useState<number[]>([]); // [1,2,3] 
    const [openModal, setOpenModal] = useState<boolean>(false);

    const { data: usersArray, refetch } = useGetUsers()
    const { mutateAsync: createUser } = useCreateUser();
    const { mutateAsync: updateUsers } = useUpdateUser();
    const { mutateAsync: deleteUsers } = useDeleteUser();
    const { user, setUser, reset } = useUserForm();
    const { data: statuses } = useGetStatus();

    const institutionStatus = statuses?.slice(0, 2).map((status) => status.description)

    const columns = [
        { id: 'checkBox', label: "", align: 'start', maxWidth: '127px' },
        { id: 'User', label: 'User Name', align: 'start', maxWidth: '127px' },
        { id: 'email', label: 'Email', align: 'start', maxWidth: '127px' },
        { id: 'phone', label: 'Id or Passport Number', align: 'start', maxWidth: '127px' },
        { id: 'status', label: 'Status ', align: 'start', maxWidth: '127px' },

    ];

    const handleSubmit = () => {

        if (user.id) {
            toast.promise(updateUsers(user), {
                pending: 'Updating user...',
                success: 'User updated successfully',
                error: 'Error updating user'
            }).then(() => { refetch(); setOpenModal(false); reset() }).catch(() => { })
        }
        else {
            toast.promise(createUser(user), {
                pending: 'Creating user...',
                success: 'User created successfully',
                error: 'Error creating an user, the email is already in use'
            }).then(() => { refetch(); setOpenModal(false); reset() }).catch(() => { })
        }
    }

    const handleDelete = () => {
        if (checkedIds.length > 0) {
            toast.promise(deleteUsers(checkedIds), {
                pending: 'Deleting users...',
                success: 'Users deleted successfully',
                error: 'Error deleting user'
            }).then(() => { refetch(); setCheckedIds([]) }).catch(() => { })
        }
        else {
            toast.error('You must select at least one user to delete')
        }
    }

    const handleEdit = () => {
        if (checkedIds.length > 1 || checkedIds.length < 1) {
            toast.error('You can only edit one user at a time')
        }
        else {
            const user = usersArray?.find((dat) => dat.id === checkedIds[0]);
            if (user) {
                setUser(user);
                setOpenModal(true);
            }
        }

    }

    const filterData = (data, searchText = '', status = '') => {
        if (!data || !Array.isArray(data) || data.length === 0) {
            return [];
        }

        let filteredData = data.filter(item => {
            const textMatch = searchText.trim() === '' || Object.values(item).some(value => {
                if (typeof value === 'string') {
                    const normalizedValue = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const normalizedSearchText = searchText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    return normalizedValue.includes(normalizedSearchText);
                }
                return false;
            });

            return textMatch;
        });

        filteredData = filteredData.filter(item => item.statusId === getStatusIdByName(status, statuses) || status === '');

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

        return filterData(usersArray, searchText, statusFilter).map((row, index) => {
            return (
                <>
                    <TableRow hover role="checkbox" tabIndex={-1} key={index} className="">
                        <TableCell sx={{ textAlign: "center", maxWidth: "127px", fontWeight: '500', borderLeft: 'none' }}>
                            <input className="w-5 h-5" type="checkbox" onClick={() => addToUniqueArray(row.id)} checked={checkedIds.includes(row.id)} />
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            {row.firstName + " " + row.lastName}
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            <a href={`mailto:${row.email}`}>{row.email}</a>
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5' }}>
                            {row.nic}
                        </TableCell>

                        <TableCell sx={{ overflow: 'hidden', textAlign: "start", maxWidth: "127px", fontWeight: '500', borderLeft: '1px solid #E5E5E5', color: `${getStatusNameById(row.statusId, statuses) == "Active" ? "#52baab" : "red"}` }}>
                            {getStatusNameById(row.statusId, statuses)}
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
                <h1 className='text-[20px] font-medium'>User administrator</h1>

                <div className='flex flex-col md:flex-row md:justify-between justify-center items-center gap-5 '>


                    <div className='flex gap-4 w-full flex-col md:flex-row'>
                        <InputComponent type={'search'} label='Search' width='w-full md:max-w-[300px]' errorMessage={''} onChange={(e) => { setSearchText(e.target.value) }} />
                        <InputComponent type={'dropdown'} label='Search' value={statusFilter} width='w-full md:max-w-[250px]' errorMessage={''} onChange={setStatusFilter} options={institutionStatus} />
                    </div>

                    <div className=' flex gap-4'>
                        <CustomizableButton text={'CREATE USER'} bgColor='bg-[#ffffff]' textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='w-full md:w-[180px]  h-[45px]' onClick={() => { setOpenModal(true) }} />
                        <CustomizableButton text={'EDIT'} bgColor='bg-[#ffffff]' beforeImage={<EditIcon className={" w-5 h-5 fill-[#52BAAB]"} />} textColor='text-[#52BAAB] border-2 border-[#52BAAB]' maxSize='px-8 h-[45px]' onClick={() => { handleEdit() }} />
                    </div>

                    <CustomizableButton text={'DELETE'} bgColor='bg-[#16688C]' beforeImage={<TrashCan className={" w-5 h-5 fill-[#ffffff]"} />} textColor='text-[#ffffff] ' maxSize='px-8 h-[45px]' onClick={() => { handleDelete() }} />

                </div>

                <CustomTable title='Registered Users' description={`Total of registered Users:  ${filterData(usersArray, searchText, statusFilter).length}`} columns={columns} rows={tableRows()} page={page} rowsPerPage={rowsPerPage} setPage={setPage} setRowsPerPage={setRowsPerPage} length={filterData(usersArray, searchText, statusFilter).length} />
                {openModal && <UserModal closeModal={() => { setOpenModal(false), reset() }} headerMessage={`${user.id ? "Update" : "Create"}  user`} onSubmit={() => { handleSubmit() }} />}

            </div>
        </>
    );
};

export default User;
