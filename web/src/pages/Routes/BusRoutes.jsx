import { useState, useEffect } from 'react';
import { Loader, PageHeader, Table } from '../../components';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { getAllBusRoutes } from '../../services/busRouteService';

const BusRoutes = () => {
    const [busRoutes, setBusRoutes] = useState([]);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        getAllBusRoutes().then((busRoutes) => {
            setBusRoutes(busRoutes);
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
    const routesHeaders = ['Route Number', 'Route', 'Bus Stops', 'Fare (Rs)'];
    const routesData = busRoutes.map((item) => ({
        'Route Number': item.routeNumber,
        Route: item.routeName,
        'Bus Stops': item.stops.length,
        'Fare (Rs)': item.fareRate,
    }));

    return (
        <div className="mt-16">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <PageHeader title="Bus Routes" buttonText="Add Route" buttonLink="create" />
                    <Table data={routesData} pageEntries={5} tableHeaders={routesHeaders} />
                </>
            )}
        </div>
    );
};

export default BusRoutes;
