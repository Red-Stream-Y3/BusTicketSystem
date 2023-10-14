import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const SideNavBar = () => {
    const [isOpened, setIsOpened] = useState(false);

    const toggleSideNavBar = () => {
        setIsOpened(!isOpened);
    };

    const navItems = [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Schedules', href: '/schedules' },
        { name: 'Employees', href: '/employees' },
        { name: 'Buses', href: '/buses' },
        { name: 'Bus Stops', href: '/busstops' },
        { name: 'Routes', href: '/routes' },
        { name: 'Fares', href: '/fares' },
        { name: 'Reports', href: '/reports' },
    ];

    return (
        <>
            <div className="flex flex-col h-screen w-72 bg-primary text-white justify-center items-center">
                <div className="flex flex-col items-start">
                    {navItems.map((item, index) => (
                        <Link
                            key={index}
                            to={item.href}
                            className="text-lg py-5 w-full hover:text-tertiary hover:bg-quaternary p-2 rounded"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default SideNavBar;
