import React, { useState, useEffect } from 'react';
import { Form, PageHeader } from '../../components';
import { editUser, getUserById } from '../../services/usersService';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();


    const [employee, setEmployee] = useState({});
    const user = JSON.parse(localStorage.getItem('userInfo'));

      if (!user) {
          window.location.href = 'http://127.0.0.1:5173/';
      }

    useEffect(() => {
        const fetchEmployee = async () => {
            const employee = await getUserById(id);
            setEmployee(employee);
        };
        fetchEmployee();
    }, [id]);

    const handleSubmit = async (employee) => {
        await editUser(id, employee);
    };

    const confirmSubmit = (employee) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are updating an employee!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(employee);
                Swal.fire({
                    icon: 'success',
                    title: 'Employee updated successfully',
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
            <PageHeader title="Update Employee" isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <Form
                        fields={[
                            { key: 'username', label: 'Username', type: 'text' },
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

export default UpdateEmployee;
