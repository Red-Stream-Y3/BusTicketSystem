import { useState } from 'react';
import Swal from 'sweetalert2';
import PageHeader from '../../components/PageHeader';
import { createBusStop } from '../../services/busStopService';
import { useNavigate } from 'react-router-dom';

const AddStop = () => {
    const navigate = useNavigate();
    const [newBusStop, setNewBusStop] = useState({
        name: '',
        latitude: '',
        longitude: '',
    });

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewBusStop((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        setNewBusStop({
            name: '',
            latitude: '',
            longitude: '',
        });
        navigate('/admin/routes/create');
    };

    const handleSubmit = async () => {
        const formattedBusStop = {
            name: newBusStop.name,
            location: {
                type: 'Point',
                coordinates: [parseFloat(newBusStop.longitude), parseFloat(newBusStop.latitude)],
            },
        };

        Swal.fire({
            title: 'Are you sure?',
            text: 'You are creating a bus stop!',
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Add',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await createBusStop(formattedBusStop);
                    Swal.fire({
                        icon: 'success',
                        title: 'Bus stop created successfully',
                        color: '#f8f9fa',
                        background: '#1F2937',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                    navigate('/admin/routes/create');
                    handleCancel();
                } catch (error) {
                    throw error;
                }
            }
        });
    };

    return (
        <div className="my-16">
            <PageHeader title="Add Bus Stop" isHiddenButton={true} />
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
                                    value={newBusStop.name}
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
                                    type="text"
                                    name="latitude"
                                    value={newBusStop.latitude}
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
                                    type="text"
                                    name="longitude"
                                    value={newBusStop.longitude}
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
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStop;
