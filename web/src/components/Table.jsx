import React, { useState } from 'react';

const Table = ({ data, pageEntries, tableHeaders }) => {
    console.log(data);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = pageEntries;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate the number of empty rows to fill the table
    const emptyRows = itemsPerPage - currentItems.length;

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="bg-white shadow-md rounded-lg my-6 pb-4 overflow-x-auto mx-6">
            <table className="min-w-max w-full table-auto">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {tableHeaders.map((header, index) => (
                            <th key={index} className="py-3 px-6 text-center">
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {currentItems.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                            {Object.values(item).map((value, index) => (
                                <td key={index} className="py-3 px-6 text-center">
                                    {value}
                                </td>
                            ))}
                        </tr>
                    ))}

                    {Array.from({ length: emptyRows }, (_, index) => (
                        <tr key={index + currentItems.length} className="border-b border-gray-200 hover:bg-gray-100">
                            {tableHeaders.map((_, index) => (
                                <td key={index} className="py-3 px-6 text-center">
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
