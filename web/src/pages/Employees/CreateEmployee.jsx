import React, { useState, useEffect } from 'react';
import { Form, PageHeader } from '../../components';
import { createEmployee } from '../../services/employeeService';
import { getAllDepots } from '../../services/depotService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateEmployee = () => {
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        employeeId: '',
        employeeName: '',
        employeeRole: '',
        depotId: '',
    });

    const [depots, setDepots] = useState([]);

    useEffect(() => {
        const fetchDepots = async () => {
            const depots = await getAllDepots();
            setDepots(depots);
        };
        fetchDepots();
    }, []);

    const handleSubmit = async (employee) => {
        try {
            await createEmployee(employee);
            setEmployee({
                employeeId: '',
                employeeName: '',
                employeeRole: '',
                depotId: '',
            });
            navigate('/employees');
        } catch (error) {
            throw error;
        }
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
            }
        });
    };

    const depotOptions = depots.map((depot) => {
        return { name: depot.depotName, value: depot._id };
    });

    const employeeOptions = [
        { name: 'Manager', value: 'Manager' },
        { name: 'Driver', value: 'Driver' },
        { name: 'Inspector', value: 'Inspector' },
    ];

    return (
        <div className="mt-16">
            <PageHeader title="Create Employee" isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <Form
                        fields={[
                            { key: 'employeeId', label: 'Employee ID', type: 'text' },
                            { key: 'employeeName', label: 'Employee Name', type: 'text' },
                            { key: 'employeeRole', label: 'Employee Role', type: 'select', options: employeeOptions },
                            { key: 'employeeDepot', label: 'Depot', type: 'select', options: depotOptions },
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
