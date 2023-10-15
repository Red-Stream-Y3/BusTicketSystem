import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, Loader } from '../components';
import { getAllEmployees, deleteEmployee } from '../services/employeeService';
import Swal from 'sweetalert2';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOnDelete = (id) => {
        deleteEmployee(id).then(() => {
            setEmployees(employees.filter((employee) => employee.id !== id));
        });
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
            }
        });
    };

    useEffect(() => {
        getAllEmployees().then((employees) => {
            setEmployees(employees);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="mt-16">
            <PageHeader title="Employees" buttonText="Create Employees" buttonLink="/employees/create" />
            {isLoading ? (
                <Loader />
            ) : (
                <Table
                    data={employees}
                    pageEntries={5}
                    tableHeaders={['Object ID', 'Employee ID', 'Name', 'Role', 'Depot']}
                    onDelete={confirmDelete}
                    isActionButtonsHidden={false}
                />
            )}
        </div>
    );
};

export default Employees;
