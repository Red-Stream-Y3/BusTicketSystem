import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { SideNavBar, Loader } from '../components';
import { useGlobalContext } from '../context/ContextProvider';
import { logout } from '../api/user';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Home = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user } = useGlobalContext();

    const isAccess = JSON.parse(localStorage.getItem('userInfo'));
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        if (!user || !isAccess) {
            logout();
            window.location.href = '/';
        }
    }, [isAccess, user]);

    return (
        <>
            {!isAccess ? (
                <Loader />
            ) : (
                <div className="flex overflow-hidden fixed w-full h-full">
                    {/* Sidebar */}
                    <SideNavBar isSidebarOpen={isSidebarOpen} />

                    {/* Main content */}
                    <main className="flex-1 flex flex-col">
                        {/* Button to open sidebar */}
                        <div className="md:hidden flex justify-start h-18 w-8 bg-darkbg rounded-r-md mt-20">
                            <button className="text-white rounded-md" onClick={toggleSidebar}>
                                {isSidebarOpen ? (
                                    <FaAngleLeft className="text-3xl" />
                                ) : (
                                    <FaAngleRight className="text-3xl" />
                                )}
                            </button>
                        </div>
                    </main>

                    {/* Content */}
                    <div className="flex flex-col w-full overflow-x-auto md:overflow-x-hidden">
                        <div className="flex-grow p-6">
                            <Outlet />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
