import React, { useState } from 'react';
import CreateButton from './CreateButton';
import { Link } from 'react-router-dom';

const Table = ({ data, pageEntries, tableHeaders, onDelete, isActionButtonsHidden }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const itemsPerPage = pageEntries;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data
        .filter((item) =>
            Object.values(item).some((value) => value.toString().toLowerCase().includes(searchQuery.toLowerCase())),
        )
        .filter((item) => {
            if (!selectedDate) return true;
            const itemDate = new Date(item.date).setHours(0, 0, 0, 0);
            return itemDate === selectedDate.getTime();
        })
        .slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the number of empty rows to fill the table
    const emptyRows = itemsPerPage - currentItems.length;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleDateChange = (e) => {
        const selected = new Date(e.target.value);
        if (isNaN(selected.getTime())) {
            setSelectedDate(null);
        } else {
            setSelectedDate(new Date(selected.setHours(0, 0, 0, 0)));
        }
        setCurrentPage(1);
    };

    return (
        <div className="bg-white shadow-md rounded-lg my-6 pb-4 overflow-x-auto mx-6">
            <div className="flex justify-between p-4">
                <div className="rounded-md bg-gray-100 p-2 w-1/3">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={handleSearch}
                        className="bg-transparent outline-none w-full"
                    />
                </div>
                {/* <div className="flex items-center rounded-md bg-gray-100 p-2 w-1/3 justify-end">
                    <input type="date" onChange={handleDateChange} className="bg-transparent outline-none w-full" />
                </div> */}
            </div>

            <table className="min-w-max w-full table-auto">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {tableHeaders.map((header, index) => (
                            <th key={index} className="py-3 px-6 text-center">
                                {header}
                            </th>
                        ))}
                        {!isActionButtonsHidden && <th className="py-3 px-6 text-center">Actions</th>}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light capitalize">
                    {currentItems.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            {Object.values(item).map((value, index) => (
                                <td key={index} className="py-3 px-6 text-center">
                                    {value}
                                </td>
                            ))}
                            {!isActionButtonsHidden && (
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        <Link to={`${item._id}`}>
                                            <CreateButton buttonTitle="Edit" />
                                        </Link>
                                        <div onClick={onDelete ? () => onDelete(item._id) : null}>
                                            <CreateButton buttonTitle="Delete" />
                                        </div>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}

                    {Array.from({ length: emptyRows }, (_, index) => (
                        <tr key={index + currentItems.length} className="border-b border-gray-200 hover:bg-gray-100">
                            {tableHeaders.map((_, index) => (
                                <td key={index} className="py-5 px-6 text-center">
                                    &#x2800;
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="mt-4 flex items-center justify-center space-x-2">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 rounded focus:outline-none w-10 text-center ${
                            currentPage === index + 1
                                ? 'bg-primary text-white'
                                : 'bg-secondary text-quaternary hover:bg-primary hover:text-white'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Table;
