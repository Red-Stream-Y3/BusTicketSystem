import React, { useState, useEffect } from 'react';
import { Form, PageHeader } from '../../components';
import { updateBusById, getBusById } from '../../services/busService';
import { getAllBusRoutes } from '../../services/busRouteService';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const UpdateBus = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bus, setBus] = useState({
        licensePlate: '',
        type: '',
        capacity: '',
        routeId: '',
    });

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const data = await getAllBusRoutes();
            setRoutes(data);
        };
        fetchRoutes();
    }, []);

    useEffect(() => {
        const fetchBus = async () => {
            const bus = await getBusById(id);
            setBus(bus);
        };
        fetchBus();
    }, [id]);

    const handleSubmit = async (bus) => {
        try {
            console.log('before update', bus);
            await updateBusById(id, bus);
            console.log('after update', bus);
            setBus(bus);
            navigate('/admin/buses');
        } catch (error) {
            throw error;
        }
    };

    const confirmSubmit = (bus) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are updating a bus!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(bus);
                Swal.fire({
                    icon: 'success',
                    title: 'Bus updated successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    const routeOptions = routes.map((route) => {
        return { name: route.routeName, value: route._id };
    });

    console.log('routeOptions', routeOptions);

    const typeOptions = [
        { name: 'AC', value: 'AC' },
        { name: 'Non-AC', value: 'Non-AC' },
    ];

    return (
        <div className="my-16">
            <PageHeader title="Update Bus" isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <Form
                        fields={[
                            { key: 'busNumber', label: 'License Plate', type: 'text' },
                            { key: 'busType', label: 'Type', type: 'select', options: typeOptions },
                            { key: 'busCapacity', label: 'Capacity', type: 'text' },
                            {
                                key: 'busRoute',
                                label: 'Route',
                                type: 'select',
                                options: routeOptions,
                            },
                        ]}
                        initialData={bus}
                        onSubmit={confirmSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default UpdateBus;
