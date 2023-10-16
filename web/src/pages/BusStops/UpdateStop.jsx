import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PageHeader from '../../components/PageHeader';
import { getBusStopById, updateBusStopById } from '../../services/busStopService';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStop = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const [busStop, setBusStop] = useState({
        name: '',
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        const fetchBusStop = async () => {
            const fetchedBusStop = await getBusStopById(id);
            setBusStop(fetchedBusStop);
        };
        fetchBusStop();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name);
        if (name === 'latitude' || name === 'longitude') {
            setBusStop((prevData) => ({
                ...prevData,
                location: {
                    type: 'Point',
                    coordinates: [
                        name === 'latitude' ? value : prevData.location?.coordinates[0] || '6.9319',
                        name === 'longitude' ? value : prevData.location?.coordinates[1] || '79.8478',
                    ],
                },
            }));
        } else {
            setBusStop((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleCancel = () => {
        navigate('/admin/stops');
    };

    const handleSubmit = async () => {
        const formattedBusStop = {
            name: busStop.name,
            location: {
                type: 'Point',
                coordinates: [parseFloat(busStop.latitude), parseFloat(busStop.longitude)],
            },
        };

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are updating a bus stop!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Update',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await updateBusStopById(id, formattedBusStop);
                    Swal.fire({
                        icon: 'success',
                        title: 'Bus stop updated successfully',
                        color: '#f8f9fa',
                        background: '#1F2937',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate('/admin/stops');
                } catch (error) {
                    throw error;
                }
            }
        });
    };

    return (
        <div className="my-16">
            <PageHeader title="Update Bus Stop" isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <div className="flex justify-center items-center bg-gray-100 rounded-lg">
                        <form
                            className=" p-10 rounded shadow-lg"
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            style={{ width: '600px' }}
                        >
                            <div className="mb-4">
                                <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                    Stop Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={busStop.name}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Za-z0-9 ]+"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                    Latitude
                                </label>
                                <input
                                    name="latitude"
                                    value={busStop.location?.coordinates[0]}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                    Longitude
                                </label>
                                <input
                                    name="longitude"
                                    value={busStop.location?.coordinates[1]}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2 mt-10">
                                <button
                                    type="button"
                                    className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateStop;
