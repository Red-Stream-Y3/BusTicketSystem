import React, { useState, useEffect } from 'react';
import { Table, PageHeader, Loader } from '../components';
import { getAllBuses, deleteBusById } from '../services/busService';
import Swal from 'sweetalert2';

const Buses = () => {
    const [buses, setBuses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleOnDelete = (id) => {
        deleteBusById(id).then(() => {
            setBuses(buses.filter((bus) => bus.id !== id));
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
                    title: 'Bus removed successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
                window.location.reload();
            }
        });
    };

    useEffect(() => {
        getAllBuses().then((buses) => {
            setBuses(buses);
            setIsLoading(false);
        });
    }, []);

    return (
        <div className="mt-16">
            <PageHeader title="Buses" buttonText="Create Bus" buttonLink="/buses/create" />
            {isLoading ? (
                <Loader />
            ) : (
                <Table
                    data={buses}
                    pageEntries={5}
                    tableHeaders={['Object ID', 'License Plate', 'Type', 'Capacity', 'Route Number', 'Route Name']}
                    onDelete={confirmDelete}
                    isActionButtonsHidden={false}
                />
            )}
        </div>
    );
};

export default Buses;
