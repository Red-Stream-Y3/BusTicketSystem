import { useState, useEffect } from 'react';
import { Loader, PageHeader, Table } from '../../components';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { getAllBusStops } from '../../services/busStopService';

const BusStops = () => {
    const [busStops, setBusStops] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    useEffect(() => {
        getAllBusStops().then((busStops) => {
            setBusStops(busStops);
            setLoading(false);
        });
    }, []);

    const handleAccept = async (id, type) => {};

    const handleDelete = async (id, type) => {
        if (type === 'bus') {
        } else {
        }
    };

    const confirmDelete = (id, type) => {
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
                handleDelete(id, type);
                Swal.fire({
                    icon: 'success',
                    title: `${type} removed successfully`,
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    // format date function
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        return `${formattedDate} ${formattedTime} `;
    }
    const stopsHeaders = ['Name', 'Latitude', 'Longitude'];
    const stopsData = busStops.map((item) => ({
        _id: item._id,
        name: item.name,
        latitude: item.location.coordinates[0],
        longitude: item.location.coordinates[1],
    }));

    return (
        <div className="my-16">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageHeader title="Bus Stops" buttonText="Add Bus Stop" buttonLink="create" />
                    <Table
                        data={stopsData}
                        pageEntries={5}
                        tableHeaders={stopsHeaders}
                        onDelete={confirmDelete}
                        isActionButtonsHidden={false}
                    />
                </>
            )}
        </div>
    );
};

export default BusStops;
