import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Loader } from '../../components';
import { getAllUsers, deleteUser } from '../../services/usersService';
import Swal from 'sweetalert2';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const handleOnDelete = (id) => {
        deleteUser(id);
    };

    const confirmDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleOnDelete(id);
                Swal.fire({
                    icon: 'success',
                    title: 'Employee removed successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        const fetchEmployees = async () => {
            const employees = await getAllUsers();
            setEmployees(employees);
            setIsLoading(false);
            console.log(employees);
        };
        fetchEmployees();
    }, []);

    return (
        <div className="mt-20">
            <PageHeader title="Employees" buttonText="Create Employee" buttonLink="create" />
            {isLoading ? (
                <Loader />
            ) : (
                <Table
                    data={employees}
                    pageEntries={5}
                    tableHeaders={['First Name', 'Last Name', 'Email', 'Role']}
                    onDelete={confirmDelete}
                    isActionButtonsHidden={false}
                />
            )}
        </div>
    );
};

export default Employees;
