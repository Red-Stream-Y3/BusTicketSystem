import React, { useState, useEffect } from 'react';
import { Form, PageHeader } from '../../components';
import { createUser } from '../../services/usersService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateEmployee = () => {
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({});
    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const handleSubmit = async (employee) => {
        await createUser(employee);
    };

    const confirmSubmit = (employee) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are creating an employee!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Create',
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(employee);
                Swal.fire({
                    icon: 'success',
                    title: 'Employee created successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
                navigate('/admin/employees');
            }
        });
    };

    const employeeOptions = [
        { name: 'Manager', value: 'manager' },
        { name: 'Driver', value: 'driver' },
        { name: 'Inspector', value: 'inspector' },
    ];

    return (
        <div className="mt-20">
            <PageHeader title="Create Employee" isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <Form
                        fields={[
                            { key: 'username', label: 'Username', type: 'text' },
                            { key: 'password', label: 'Password', type: 'password' },
                            { key: 'firstName', label: 'First Name', type: 'text' },
                            { key: 'lastName', label: 'Last Name', type: 'text' },
                            { key: 'email', label: 'Email', type: 'email' },
                            { key: 'phone', label: 'Phone', type: 'text' },
                            { key: 'role', label: 'Role', type: 'select', options: employeeOptions },
                        ]}
                        initialData={employee}
                        onSubmit={confirmSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
