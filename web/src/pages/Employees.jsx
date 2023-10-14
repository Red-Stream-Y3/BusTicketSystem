import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, PageHeader, CreateButton } from '../components';
import { getAllEmployees } from '../services/employeeService';
import { getEmployeesByRole } from '../services/employeeService';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
                <div className="flex justify-center items-center h-96">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-primary"></div>
                </div>
            ) : (
                <Table data={employees} pageEntries={5} tableHeaders={['Employee ID', 'Name', 'Role', 'Depot']} />
            )}
        </div>
    );
};

export default Employees;
