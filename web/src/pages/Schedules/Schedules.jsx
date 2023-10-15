import { useState, useEffect } from 'react';
import { Loader, PageHeader, Table } from '../../components';
import Swal from 'sweetalert2';

import { getAllBusJourneys, deleteBusJourneyById } from '../../services/busJourneyService';
import { getAllStaffSchedules, deleteStaffScheduleById } from '../../services/staffScheduleService';

const Schedules = () => {
    const [schedules, setSchedules] = useState([]);
    const [staffSchedules, setStaffSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scheduleTable, setScheduleTable] = useState(false);

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    useEffect(() => {
        getAllBusJourneys().then((schedules) => {
            setSchedules(schedules);
            setLoading(false);
            setScheduleTable(true);
        });
        getAllStaffSchedules().then((staffSchedules) => {
            setStaffSchedules(staffSchedules);
            setLoading(false);
        });
    }, []);

    const handleAccept = async (id, type) => {};

    const handleDelete = async (id) => {
        try {
            await deleteBusJourneyById(id);
            setSchedules(schedules.filter((schedule) => schedule._id !== id));
        } catch (error) {
            console.error('Error deleting schedule: ', error);
        }
    };

    const handleOnDelete = async (id) => {
        try {
            await deleteStaffScheduleById(id);
            setStaffSchedules(staffSchedules.filter((schedule) => schedule._id !== id));
        } catch (error) {
            console.error('Error deleting schedule: ', error);
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
                handleDelete(id);
                Swal.fire({
                    icon: 'success',
                    title: `Schedule removed successfully`,
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };
    const confirmDel = (id) => {
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
                console.log(id);
                Swal.fire({
                    icon: 'success',
                    title: `Schedule removed successfully`,
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
        _id: item._id,
        'Route Name': `${item.route.routeNumber} ${item.route.routeName}`,
        'Departure Time': item.departureTime ? formatDate(item.departureTime) : 'Not departed',
        'Arrival Time': item.arrivalTime ? formatDate(item.arrivalTime) : 'Not arrived',
        'Bus Number': item.bus.busNumber,
        'Driver Name': item.driver.employeeName,
        'Boarded Passengers': item.boardedUsers.length,
        Status: item.state,
    }));

    const staffHeaders = ['Name', 'Role', 'Shift Start', 'Shift End'];
    const staffData = staffSchedules.map((item) => ({
        _id: item._id,
        'Employee Name': item.staff.employeeName,
        Role: item.staff.employeeRole,
        'Shift Start': formatDate(item.shiftStart),
        'Shift End': formatDate(item.shiftEnd),
    }));

    return (
        <div className="my-16">
            {loading ? (
                <Loader />
            ) : (
                <>
                    {scheduleTable ? (
                        <>
                            <PageHeader title="Bus Schedules" buttonText="Schedule" buttonLink="bus-schedules" />
                            <Table data={bData} pageEntries={6} tableHeaders={bHeaders} onDelete={confirmDelete} />
                            <div className="mt-6 sm:flex sm:items-center sm:justify-between px-5">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-6" />
                                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                                    <button
                                        onClick={() => setScheduleTable(false)}
                                        className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-quaternary dark:text-gray-200 dark:border-gray-700 dark:hover:bg-darkbg"
                                    >
                                        Staff Schedules
                                        <i className="fas fa-chevron-right" />
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <PageHeader
                                title="Staff Schedules"
                                buttonText="Staff Schedule"
                                buttonLink="/admin/schedules/staff"
                            />
                            <Table
                                data={staffData}
                                pageEntries={6}
                                tableHeaders={staffHeaders}
                                onDelete={confirmDel}
                                edit={'staff'}
                            />
                            <div className="mt-6 sm:flex sm:items-center sm:justify-between px-5">
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-6" />
                                <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
                                    <button
                                        onClick={() => setScheduleTable(true)}
                                        className="flex items-center justify-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-quaternary dark:text-gray-200 dark:border-gray-700 dark:hover:bg-darkbg"
                                    >
                                        <i className="fa-solid fa-circle-chevron-left" />
                                        Bus Schedules
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Schedules;
