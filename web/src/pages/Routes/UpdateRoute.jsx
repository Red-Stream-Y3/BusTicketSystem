import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, PageHeader } from '../../components';
import { getBusRouteById, updateBusRouteById } from '../../services/busRouteService';

const UpdateRoute = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the route ID from the URL parameter.

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [busRoute, setBusRoute] = useState({
        routeNumber: '',
        routeName: '',
        stops: [],
    });

    useEffect(() => {
        setIsLoading(true);
        setIsError(false);

        getBusRouteById(id)
            .then((route) => {
                setBusRoute(route);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
                console.error('Error fetching route details:', error);
            });
    }, [id]);

    const handleSubmit = async () => {
        setIsLoading(true);
        setIsError(false);
        setIsSuccess(false);

        try {
            await updateBusRouteById(id, busRoute);
            setIsSuccess(true);
            navigate('/admin/routes');
        } catch (error) {
            setIsError(true);
            console.error('Error updating route details:', error);
        }

        setIsLoading(false);
    };

    return (
        <div className="my-16">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <PageHeader title="Edit Route" isHiddenButton={true} />
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
                                {/* Add stops editing fields here */}
                                <div className="flex justify-end space-x-2 mt-10">
                                    <button
                                        type="button"
                                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                        onClick={() => navigate('/admin/routes')}
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
                </>
            )}
        </div>
    );
};

export default UpdateRoute;
