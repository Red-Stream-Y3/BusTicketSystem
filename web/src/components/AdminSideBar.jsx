import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const AdminSideBar = ({ isSidebarOpen }) => {
    const [activeLink, setActiveLink] = useState('dashboard');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <nav
            className={`bg-darkbg w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}
            style={{
                minHeight: '100vh',
                flexDirection: 'column',
            }}
        >
            <div className="sidebar-links">
                <ul className="text-gray-500 text-sm font-medium">
                    <li>
                        <NavLink
                            to="/dashboard"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'dashboard' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('dashboard')}
                        >
                            <i className="fa-solid fa-house pr-5"></i>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/schedules"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'schedules' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('schedules')}
                        >
                            <i className="fa-solid fa-clock pr-2"></i>
                            <span className="ml-4">Schedules</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/employees"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'employees' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('employees')}
                        >
                            <i className="fa-sharp fa-solid fa-user-tie pr-2"></i>
                            <span className="ml-4">Employees</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/buses"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'buses' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('buses')}
                        >
                            <i className="fa-solid fa-bus-simple pr-2"></i>
                            <span className="ml-4">Buses</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/stops"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'stops' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('stops')}
                        >
                            <i className="fa-solid fa-location-dot pr-2"></i>
                            <span className="ml-4">Bus Stops</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/routes"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'routes' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('routes')}
                        >
                            <i className="fa-solid fa-route pr-1"></i>
                            <span className="ml-4">Routes</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/fares"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'fares' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('fares')}
                        >
                            <i className="fa-solid fa-money-check-dollar pr-1"></i>
                            <span className="ml-4">Fares</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/reports"
                            className={`flex items-center py-5 px-4 text-lg text-gray-100 ${
                                activeLink === 'reports' ? 'bg-primarydark' : 'bg-darkbg hover:bg-secondary'
                            } border-y-2 border-black`}
                            onClick={() => handleLinkClick('reports')}
                        >
                            <i className="fa-solid fa-chart-simple pr-2"></i>
                            <span className="ml-4">Reports</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

AdminSideBar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
};

export default AdminSideBar;
