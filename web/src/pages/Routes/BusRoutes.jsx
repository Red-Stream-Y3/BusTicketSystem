import React, { useState, useEffect } from 'react';
import { Loader, PageHeader, Table } from '../../components';
import Swal from 'sweetalert2';

import { getAllBusRoutes, deleteBusRouteById } from '../../services/busRouteService';

const BusRoutes = () => {
    const [busRoutes, setBusRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const handleOnDelete = async (id) => {
        try {
            await deleteBusRouteById(id);
            setBusRoutes(busRoutes.filter((busRoute) => busRoute._id !== id));
        } catch (error) {
            console.error('Error deleting bus route: ', error);
        }
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
                    title: 'Bus route removed successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    useEffect(() => {
        getAllBusRoutes().then((busRoutes) => {
            setBusRoutes(busRoutes);
            setLoading(false);
        });
    }, []);

    const routesData = busRoutes.map((item) => ({
        _id: item._id,
        'Route Number': item.routeNumber,
        Route: item.routeName,
        'Bus Stops': item.stops.length,
        'Fare (Rs)': item.fareRate,
    }));

    return (
        <div className="my-16">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageHeader title="Bus Routes" buttonText="Add Route" buttonLink="create" />
                    <Table
                        data={routesData}
                        pageEntries={5}
                        tableHeaders={['Route Number', 'Route', 'Bus Stops', 'Fare (Rs)']}
                        onDelete={confirmDelete}
                        isActionButtonsHidden={false}
                    />
                </>
            )}
        </div>
    );
};

export default BusRoutes;
