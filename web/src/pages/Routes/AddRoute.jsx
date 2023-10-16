import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components';
import { createBusRoute } from '../../services/busRouteService';
import { getAllBusStops } from '../../services/busStopService';

const AddRoute = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const user = JSON.parse(localStorage.getItem('userInfo'));

    if (!user) {
        window.location.href = 'http://127.0.0.1:5173/';
    }

    const [busRoute, setBusRoute] = useState({
        routeNumber: '',
        routeName: '',
        stops: [],
    });

    const [busStops, setBusStops] = useState([]);

    useEffect(() => {
        getAllBusStops().then((busStops) => {
            setBusStops(busStops);
        });
    }, []);

    const handleSubmit = async () => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            await createBusRoute(busRoute);
            setIsSuccess(true);
            navigate('/admin/routes');
        } catch (error) {
            setIsError(true);
        }

        setIsLoading(false);
    };

    const handleAddStop = () => {
        const updatedStops = [...busRoute.stops, ''];
        setBusRoute({ ...busRoute, stops: updatedStops });
    };

    const handleRemoveStop = (index) => {
        const updatedStops = [...busRoute.stops];
        updatedStops.splice(index, 1);
        setBusRoute({ ...busRoute, stops: updatedStops });
    };

    const handleChangeStop = (index, value) => {
        const updatedStops = [...busRoute.stops];
        updatedStops[index] = value;
        setBusRoute({ ...busRoute, stops: updatedStops });
    };

    return (
        <div className="my-16">
            <PageHeader title="Bus Route" buttonText="Create Stop" buttonLink="/admin/stops/create" />
            <div className="flex justify-center items-center">
                <div className="mt-5">
                    <form
                        onSubmit={handleSubmit}
                        className="bg-gray-100 p-10 rounded shadow-lg"
                        style={{ width: '600px' }}
                    >
                        <div className="mb-4">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Route Number
                            </label>
                            <input
                                type="text"
                                name="routeNumber"
                                value={busRoute.routeNumber}
                                onChange={(e) => setBusRoute({ ...busRoute, routeNumber: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Route Name
                            </label>
                            <input
                                type="text"
                                name="routeName"
                                value={busRoute.routeName}
                                onChange={(e) => setBusRoute({ ...busRoute, routeName: e.target.value })}
                                className="mt-1 p-2 w-full border rounded-md"
                                required
                            />
                        </div>
                        <div className="my-4 flex justify-between items-center">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                Bus Stops
                            </label>
                            <button
                                type="button"
                                onClick={handleAddStop}
                                className="px-2 py-1 bg-primary text-white rounded hover:bg-secondary"
                            >
                                <i className="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        {busRoute.stops.map((stop, index) => (
                            <div key={index} className="flex items-center mt-1">
                                <select
                                    name={`stop-${index}`}
                                    value={stop}
                                    onChange={(e) => handleChangeStop(index, e.target.value)}
                                    className="p-2 w-full border rounded-md"
                                >
                                    <option value="" className="text-quaternary">
                                        Select...
                                    </option>
                                    {busStops.map((busStop) => (
                                        <option key={busStop._id} value={busStop._id}>
                                            {busStop.name}
                                        </option>
                                    ))}
                                </select>
                                {busRoute.stops.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveStop(index)}
                                        className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        <i className="fa-solid fa-circle-minus"></i>
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-end space-x-2 mt-10">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                onClick={() => setBusRoute({ routeNumber: '', routeName: '', stops: [] })}
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
    );
};

export default AddRoute;
