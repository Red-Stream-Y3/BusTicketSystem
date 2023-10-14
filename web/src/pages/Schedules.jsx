import { useState, useEffect } from 'react';
import { Loader } from '../components';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Schedules = () => {
    const [value, setValue] = useState('');
    const [tableFilter, setTableFilter] = useState([]);
    const [loading, setLoading] = useState(true);

    // const user = JSON.parse(localStorage.getItem('userInfo'));

    const handleAccept = async (id, type) => {};

    const handleDelete = async (id, type) => {
        if (type === 'bus') {
        } else {
        }
    };

    const confirmDelete = (id, type) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            color: '#f8f9fa',
            background: '#1F2937',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleDelete(id, type);
                Swal.fire({
                    icon: 'success',
                    title: `${type} removed successfully`,
                    color: '#f8f9fa',
                    background: '#1F2937',
                    showConfirmButton: false,
                    timer: 2000,
                });
            }
        });
    };

    // format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    const theadClass = 'py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-500 dark:text-white';

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="grid gap-4 md:gap-8 mt-8 pb-10 md:px-5 bg-gray-900 rounded-xl overflow-x-auto">
                        <section className="container px-4 mx-auto">Schedules</section>
                    </div>
                </>
            )}
        </>
    );
};

export default Schedules;
