import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, PageHeader } from '../components';
import { createEmployee } from '../services/employeeService';
import { getAllDepots } from '../services/depotService';

const CreateEmployee = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

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
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            await createEmployee(employee);
            setIsSuccess(true);
        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
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
                            { name: 'Employee ID', type: 'text' },
                            { name: 'Employee Name', type: 'text' },
                            { name: 'Employee Role', type: 'select', options: employeeOptions },
                            { name: 'Depot Name', type: 'select', options: depotOptions },
                        ]}
                        initialData={employee}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateEmployee;
