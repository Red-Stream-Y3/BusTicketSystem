import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    BsFillHouseFill,
    BsClockFill,
    BsFillPersonFill,
    BsFillBusFrontFill,
    BsMapFill,
    BsSignRailroadFill,
    BsCurrencyDollar,
    BsFillBarChartLineFill,
} from 'react-icons/bs';

const navLinks = [
    { navTitle: 'Dashboard', navLink: 'dashboard', navIcon: BsFillHouseFill },
    { navTitle: 'Schedules', navLink: 'schedules', navIcon: BsClockFill },
    { navTitle: 'Employees', navLink: 'employees', navIcon: BsFillPersonFill },
    { navTitle: 'Buses', navLink: 'buses', navIcon: BsFillBusFrontFill },
    { navTitle: 'Bus Stops', navLink: 'stops', navIcon: BsMapFill },
    { navTitle: 'Routes', navLink: 'routes', navIcon: BsSignRailroadFill },
    { navTitle: 'Fares', navLink: 'fares', navIcon: BsCurrencyDollar },
    { navTitle: 'Reports', navLink: 'reports', navIcon: BsFillBarChartLineFill },
];

const SideNavBar = ({ isSidebarOpen }) => {
    const location = useLocation();

    return (
        <nav
            className={`bg-primary w-64 flex-shrink-0 ${isSidebarOpen ? 'block' : 'hidden'} md:block`}
            style={{ minHeight: '100vh', flexDirection: 'column' }}
        >
            <ul className="mt-16">
                {navLinks.map((link, index) => (
                    <li key={index} className="relative">
                        <Link
                            to={link.navLink}
                            className={`inline-flex items-center justify-center px-10 py-5 w-full text-md font-medium transition-colors duration-150 hover:text-quaternary hover:bg-secondary ${
                                location.pathname === link.navLink.toLocaleLowerCase()
                                    ? 'text-quaternary bg-tertiary'
                                    : 'text-lightbg bg-primary'
                            }`}
                        >
                            {React.createElement(link.navIcon, { className: 'mr-2 text-lg' })}
                            {link.navTitle}
                        </Link>
                        <hr className="border-gray-500" />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

SideNavBar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
};

export default SideNavBar;
