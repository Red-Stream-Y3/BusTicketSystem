import React, { useState, useEffect } from 'react';
import { Form, PageHeader } from '../components';
import { createBus } from '../services/busService';
import { getAllBusRoutes } from '../services/busRouterService';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CreateBus = () => {
    const navigate = useNavigate();
    const [bus, setBus] = useState({
        licensePlate: '',
        type: '',
        capacity: '',
        routeId: '',
    });

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const data = await getAllBusRoutes();
            setRoutes(data);
        };
        fetchRoutes();
    }, []);

    console.log(routes);

    const handleSubmit = async (bus) => {
        try {
            await createBus(bus);
            setBus({
                licensePlate: '',
                type: '',
                capacity: '',
                routeId: '',
            });
            navigate('/buses');
        } catch (error) {
            throw error;
        }
    };

    const confirmSubmit = (bus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are creating a bus!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Create',
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(bus);
                Swal.fire({
                    icon: 'success',
                    title: 'Bus created successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    const routeOptions = routes.map((route) => ({ name: route.routeName, value: route._id }));

    return (
        <div className="mt-16">
            <PageHeader title="Create Bus" />
            <Form
                fields={[
                    { key: 'busNumber', label: 'License Plate', type: 'text' },
                    { key: 'busType', label: 'Type', type: 'text' },
                    { key: 'busCapacity', label: 'Capacity', type: 'text' },
                    {
                        key: 'busRoute',
                        label: 'Route',
                        type: 'select',
                        options: routeOptions,
                    },
                ]}
                onSubmit={confirmSubmit}
            />
        </div>
    );
};

export default CreateBus;
