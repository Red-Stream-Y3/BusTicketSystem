import { useState, useEffect } from 'react';
import { Table, Loader, BoxWidget, PageHeader } from '../components';
import { getDepartedJourneys } from '../services/busJourneyService';
import { useGlobalContext } from '../context/ContextProvider';

const Dashboard = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useGlobalContext();

    const [departedJourneys, setDepartedJourneys] = useState([]);

    useEffect(() => {
        const fetchDepartedJourneys = async () => {
            setLoading(true);
            const departedJourneys = await getDepartedJourneys();
            setDepartedJourneys(departedJourneys);
            setLoading(false);
        };
        fetchDepartedJourneys();
    }, []);

    const isAccess = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!user || !isAccess) {
            logout();
            window.location.href = '/';
        }
    }, [isAccess, user]);

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
                <div className="mt-20">
                    <PageHeader title="Live Dashboard" isHiddenButton={true} />
                    {loading ? (
                        <Loader />
                    ) : (
                        <Table
                            data={departedJourneys}
                            pageEntries={6}
                            tableHeaders={[
                                'Route Number',
                                'Route Name',
                                'Bus Number',
                                'Capacity',
                                'Departure Time',
                                'Status',
                            ]}
                            isActionButtonsHidden={true}
                        />
                    )}
                </div>
            )}
        </>
    );
};

export default Dashboard;
