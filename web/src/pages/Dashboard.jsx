import { useState, useEffect } from 'react';
import { BoxWidget, Loader } from '../components';
import { useGlobalContext } from '../context/ContextProvider';
import { logout } from '../api/user';

const Dashboard = () => {
    // const { user } = useGlobalContext();
    const isAccess = true;
    const [loading, setLoading] = useState(false);

    // const fetchSite = async () => {
    //     setLoading(false);
    // };

    // useEffect(() => {
    //     if (!user || !isAccess) {
    //         logout();
    //         window.location.href = '/login';
    //     }
    //     fetchSite();
    // }, [isAccess, user]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader />
            </div>
        );
    }
    return (
        <>
            {isAccess && loading ? (
                <Loader />
            ) : (
                <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-white rounded-xl overflow-x-auto">
                    DashBoard
                </div>
            )}
        </>
    );
};

export default Dashboard;
