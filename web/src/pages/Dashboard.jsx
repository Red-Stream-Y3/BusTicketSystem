import { useState, useEffect } from 'react';
import { BoxWidget, Loader } from '../components';
import { useGlobalContext } from '../context/ContextProvider';
import { logout } from '../api/user';

const Dashboard = () => {
    // const { user } = useGlobalContext();
    const isAccess = true;
    const [loading, setLoading] = useState(false);

    // const fetchSite = async () => {
    //     // const visits = await getSiteVisits(user.token);
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
                <>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mt-8 px-4 md:px-10">
                        <div className="w-full">
                            DashBoard
                            {/* <BoxWidget heading={'Traffic'} value={formatVisits} icon={'fa-solid fa-arrow-trend-up'} /> */}
                        </div>
                    </div>

                    {/* <LineChart siteVisits={siteVisits} loading={loading} /> */}
                </>
            )}
        </>
    );
};

export default Dashboard;
