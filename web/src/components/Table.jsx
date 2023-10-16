import React, { useState, useRef } from 'react';
import CreateButton from './CreateButton';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Table = ({ data, pageEntries, tableHeaders, onDelete, isActionButtonsHidden, edit }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const itemsPerPage = pageEntries;
    const filteredTableHeaders = tableHeaders.filter((header) => header !== '_id');

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

    const downloadPdf = () => {
        const unit = 'pt';
        const size = 'A4';

        const orientation = 'landscape';

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);
        const title = 'Bus Ticket System Report';
        const headers = filteredTableHeaders.map((header) => header.toUpperCase());
        const dataForPdf = data.map((item) => {
            const filteredItem = {};
            for (const key in item) {
                if (key !== '_id') {
                    filteredItem[key] = item[key];
                }
            }
            return Object.values(filteredItem);
        });

        let content = {
            startY: 50,
            head: [headers],
            body: dataForPdf,
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save('bus_ticket_system_report.pdf');
    };

    return (
        <div className="bg-white shadow-md rounded-lg my-6 pb-4 mx-6 max-w-8xl overflow-hidden text-ellipsis whitespace-nowrap">
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

                <div className="flex items-center rounded-md  w-1/3 justify-end">
                    <button onClick={downloadPdf} className="bg-primary text-white px-4 py-2 rounded-lg mr-4">
                        Generate Report
                    </button>
                </div>
            </div>

            <table className="min-w-max w-full table-auto">
                <thead className="bg-primary text-white uppercase text-sm leading-normal">
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        {filteredTableHeaders.map((header, index) => (
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
                            {Object.keys(item).map((key) => {
                                if (key !== '_id') {
                                    return (
                                        <td key={key} className="py-3 px-6 text-center">
                                            {item[key]}
                                        </td>
                                    );
                                }
                                return null;
                            })}
                            {!isActionButtonsHidden && (
                                <td className="py-3 px-6 text-center">
                                    <div className="flex justify-center items-center space-x-2">
                                        {edit ? (
                                            <Link to={`${edit}/${item._id}`}>
                                                <CreateButton buttonTitle="Edit" />
                                            </Link>
                                        ) : (
                                            <Link to={`${item._id}`}>
                                                <CreateButton buttonTitle="Edit" />
                                            </Link>
                                        )}
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
