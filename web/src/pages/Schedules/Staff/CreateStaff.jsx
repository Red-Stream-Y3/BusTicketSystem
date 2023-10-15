import React, { useState, useEffect } from 'react';
import { Form, PageHeader } from '../../../components';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createStaffSchedule } from '../../../services/staffScheduleService';
import { getAllEmployees } from '../../../services/employeeService';

const CreateStaff = () => {
    const navigate = useNavigate();
    const [staffSchedules, setStaffSchedules] = useState({
        staff: '',
        shiftStart: '',
        shiftEnd: '',
    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const employees = await getAllEmployees();
            setEmployees(employees);
        };
        fetchEmployees();
    }, []);

    const handleSubmit = async (staff) => {
        try {
            await createStaffSchedule(staff);
            setStaffSchedules({
                staff: '',
                shiftStart: '',
                shiftEnd: '',
            });
            navigate('/admin/schedules');
        } catch (error) {
            throw error;
        }
    };

    const confirmSubmit = (employee) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are creating an staff schedule!',
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
                    title: 'Schedule created successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    const employeeOptions = employees.map((employee) => {
        return {
            name: `${employee.employeeName} - ${employee.employeeRole}`,
            value: employee._id,
        };
    });

    return (
        <div className="mt-16">
            <PageHeader title="Schedule Staff " isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <Form
                        fields={[
                            {
                                key: 'staff',
                                label: 'Name',
                                type: 'select',
                                value: staffSchedules.staff,
                                options: employeeOptions,
                                onChange: (e) =>
                                    setStaffSchedules((prevData) => ({ ...prevData, staff: e.target.value })),
                            },
                            {
                                key: 'shiftStart',
                                label: 'Shift Start',
                                type: 'datetime-local',
                                value: staffSchedules.shiftStart,
                                onChange: (e) =>
                                    setStaffSchedules((prevData) => ({ ...prevData, shiftStart: e.target.value })),
                            },
                            {
                                key: 'shiftEnd',
                                label: 'Shift End',
                                type: 'datetime-local',
                                value: staffSchedules.shiftEnd,
                                onChange: (e) =>
                                    setStaffSchedules((prevData) => ({ ...prevData, shiftEnd: e.target.value })),
                            },
                        ]}
                        initialData={staffSchedules}
                        onSubmit={confirmSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateStaff;
