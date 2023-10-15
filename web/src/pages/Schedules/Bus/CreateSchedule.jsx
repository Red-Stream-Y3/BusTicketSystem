import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, PageHeader } from '../../../components';
import { getAllBusRoutes } from '../../../services/busRouteService';
import { getAllBuses } from '../../../services/busService';
import { getAllEmployees } from '../../../services/employeeService';
import { scheduleBusJourney, getAllBusJourneys } from '../../../services/busJourneyService';
import { getUsers } from '../../../api/user';

const BusScheduleCreate = () => {
    const [busRoutes, setBusRoutes] = useState([]);
    const [buses, setBuses] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        route: '',
        departureTime: '',
        arrivalTime: '',
        bus: '',
        driver: '',
        boardedUsers: [],
        state: 'scheduled',
    });

    useEffect(() => {
        getUsers().then((users) => {
            setUsers(users.data);
        });
        getAllBusRoutes().then((busRoutes) => {
            setBusRoutes(busRoutes);
        });

        getAllBuses().then((buses) => {
            setBuses(buses);
        });

        getAllEmployees().then((employees) => {
            setEmployees(employees);
        });
    }, []);

    const handleSubmit = async () => {
        await scheduleBusJourney(formData);
    };

    const handleAddPassenger = () => {
        const updatedPassengers = [...formData.boardedUsers, ''];
        setFormData({ ...formData, boardedUsers: updatedPassengers });
    };

    const handleRemovePassenger = (index) => {
        const updatedPassengers = [...formData.boardedUsers];
        updatedPassengers.splice(index, 1);
        setFormData({ ...formData, boardedUsers: updatedPassengers });
    };

    const handleChangePassenger = (index, value) => {
        const updatedPassengers = [...formData.boardedUsers];
        updatedPassengers[index] = value;
        setFormData({ ...formData, boardedUsers: updatedPassengers });
    };

    const routeOptions = busRoutes.map((route) => ({ name: route.routeName, value: route._id }));
    const busOptions = buses.map((bus) => ({ name: bus.busNumber, value: bus._id }));
    const employeeOptions = employees
        .filter((employee) => employee.employeeRole === 'Driver')
        .map((employee) => ({ name: employee.employeeName, value: employee._id }));
    // const userOptions = users.map((user) => ({ name: user.firstName, value: user._id }));

    return (
        <div className="my-16">
            <PageHeader title="Create Bus Schedule" isHiddenButton={true} />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-100 p-10 rounded shadow-lg"
                        style={{ width: '600px' }}
                    >
                        <div className="mb-4">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">Route</label>
                            <select
                                name="route"
                                value={formData.route}
                                onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            >
                                <option value="" className="text-quaternary">
                                    Select...
                                </option>
                                {routeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-6">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Departure Time
                            </label>
                            <input
                                type="datetime-local"
                                name="departureTime"
                                value={formData.departureTime}
                                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Arrival Time
                            </label>
                            <input
                                type="datetime-local"
                                name="arrivalTime"
                                value={formData.arrivalTime}
                                onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Bus Number
                            </label>
                            <select
                                name="bus"
                                value={formData.bus}
                                onChange={(e) => setFormData({ ...formData, bus: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            >
                                <option value="" className="text-quaternary">
                                    Select...
                                </option>
                                {busOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="my-4 flex justify-between items-center">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Bordered Passengers
                            </label>
                            <button
                                type="button"
                                onClick={handleAddPassenger}
                                className="px-2 py-1 bg-primary text-white rounded hover:bg-secondary"
                            >
                                <i className="fa-solid fa-plus" />
                            </button>
                        </div>
                        {formData.boardedUsers.map((user, index) => (
                            <div key={index} className="flex items-center mt-1 mb-5">
                                <select
                                    name={`passenger-${index}`}
                                    value={user}
                                    onChange={(e) => handleChangePassenger(index, e.target.value)}
                                    className="p-2 w-full border rounded-md"
                                >
                                    <option value="" className="text-quaternary">
                                        Select...
                                    </option>
                                    {users.map((passenger) => (
                                        <option key={passenger._id} value={passenger._id}>
                                            {passenger.firstName}
                                        </option>
                                    ))}
                                </select>
                                {formData.boardedUsers.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePassenger(index)}
                                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        <i className="fa-solid fa-circle-minus" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <div className="mb-6">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">Driver</label>
                            <select
                                name="driver"
                                value={formData.driver}
                                onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            >
                                <option value="" className="text-quaternary">
                                    Select...
                                </option>
                                {employeeOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-6">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">Status</label>
                            <select
                                name="state"
                                value={formData.state}
                                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            >
                                <option value="scheduled" className="text-quaternary">
                                    Scheduled
                                </option>
                                <option value="delayed">Delayed</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="departed">Departed</option>
                            </select>
                        </div>
                        <div className="flex justify-end space-x-2 mt-10">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                onClick={() => setFormData({ ...formData, route: '' })}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary"
                            >
                                Schedule
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BusScheduleCreate;
