import { useState, useEffect } from 'react';
import { Loader, Table } from '../components';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { getAllBusJourneys } from '../services/busJourneyService';
import { Link } from 'react-router-dom';

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [staffSchedules, setStaffSchedules] = useState([]);
    const [value, setValue] = useState('');
    const [tableFilter, setTableFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scheduleTable, setScheduleTable] = useState(false);

    // const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        getAllBusJourneys().then((schedules) => {
            setSchedules(schedules);
            setLoading(false);
            setScheduleTable(true);
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

    const bHeaders = ['Route', 'Departure', 'Arrival', 'Bus', 'Driver', 'Passengers', 'Status'];
    const bData = schedules.map((item) => ({
        'Route Name': `${item.route.routeNumber} ${item.route.routeName}`,
        'Departure Time': formatDate(item.departureTime),
        'Arrival Time': formatDate(item.arrivalTime),
        'Bus Number': item.bus.busNumber,
        'Driver Name': item.driver.employeeName,
        'Boarded Passengers': item.boardedUsers.length,
        Status: item.state,
    }));

    return (
        <div className="mt-16">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="flex justify-between items-center mb-6 mx-20">
                        <h1 className="text-2xl font-semibold">Bus Schedules</h1>
                        <div>
                            <Link
                                to="/busschedule/create"
                                className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded"
                            >
                                Create Schedule
                            </Link>
                        </div>
                    </div>
                    {scheduleTable ? (
                        <Table data={bData} pageEntries={5} tableHeaders={bHeaders} />
                    ) : (
                        <Table
                            data={staffSchedules}
                            pageEntries={5}
                            tableHeaders={['Date', 'Time', 'Bus ID', 'Driver ID', 'Conductor ID', 'Route ID']}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default Schedules;
