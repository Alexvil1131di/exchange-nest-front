import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';


export default function CustomTable({ columns, rows, page, rowsPerPage, setPage, setRowsPerPage, length }) {

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className='w-full'>
            <div className='w-full flex flex-col justify-center p-4'>
                <p className='text-[20px]'>Registered Institutions</p>
                <p className='text-[14px] text-[#666666]'>Total of institutions: {length}</p>

            </div>

            <TableContainer className='max-h-[440px]'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow >
                            {columns.map((column, index) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ maxWidth: column.maxWidth }}
                                    sx={{
                                        borderLeft: index !== 0 ? '1px solid #E5E5E5' : 'none',
                                        borderBlockStart: '1px solid #E5E5E5',
                                        color: '#000000',
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100, { value: length, label: 'All' }]}
                component="div"
                count={length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                }}

            />
        </Paper>
    );
}
