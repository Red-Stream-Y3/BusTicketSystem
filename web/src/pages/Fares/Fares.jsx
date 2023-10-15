import React, { useState, useEffect } from 'react';
import { Form, PageHeader, Loader } from '../../components';
import { getFareById, updateFareById } from '../../services/fareService';
import Swal from 'sweetalert2';

const Fares = () => {
    const [fare, setFare] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const id = '652aa3db13470991d964f167';

    useEffect(() => {
        const fetchFare = async () => {
            const fare = await getFareById(id);
            setFare(fare);
            setIsLoading(false);
        };
        fetchFare();
    }, [id]);

    const handleSubmit = async (fare) => {
        try {
            await updateFareById(id, fare);
            setFare(fare);
        } catch (error) {
            throw error;
        }
    };

    const confirmSubmit = (fare) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are updating a fare!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update',
        }).then((result) => {
            if (result.isConfirmed) {
                handleSubmit(fare);
                Swal.fire({
                    icon: 'success',
                    title: 'Fare updated successfully',
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
                window.location.reload();
            }
        });
    };

    return (
        <div className="mt-16">
            <PageHeader title="Update Fare Rate" isHiddenButton={true} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex justify-center items-center">
                    <div className="mt-5">
                        <Form
                            fields={[
                                { key: 'fareName', label: 'Fare name', type: 'text' },
                                { key: 'fareAmount', label: 'Fare rate', type: 'text' },
                            ]}
                            onSubmit={confirmSubmit}
                            initialData={fare}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Fares;
