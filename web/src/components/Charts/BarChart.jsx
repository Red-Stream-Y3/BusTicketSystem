import React from 'react';
import { PageHeader } from '../../components';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const revenue = [
    { value: 145789, label: 'January', color: '#474973' },
    { value: 456456, label: 'February', color: '#474973' },
    { value: 125478, label: 'March', color: '#474973' },
    { value: 365214, label: 'April', color: '#474973' },
    { value: 124856, label: 'May', color: '#474973' },
    { value: 198547, label: 'June', color: '#474973' },
    { value: 245785, label: 'July', color: '#474973' },
    { value: 696554, label: 'August', color: '#474973' },
    { value: 145256, label: 'September', color: '#474973' },
    { value: 235874, label: 'October', color: '#474973' },
    { value: 356875, label: 'November', color: '#474973' },
    { value: 458967, label: 'December', color: '#474973' },
];

const BarChart = () => {
    const data = {
        labels: revenue.map((item) => item.label),
        datasets: [
            {
                label: 'Revenue',
                data: revenue.map((item) => item.value),
                backgroundColor: revenue.map((item) => item.color),
                borderColor: revenue.map((item) => item.color),
                borderWidth: 1,
            },
        ],
    };
    const options = {
        indexAxis: 'y', // Use 'y' to have horizontal bars
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div className="w-full h-full p-4">
            <PageHeader title="Revenue Chart" isHiddenButton={true} />
            <div className="bg-white rounded-lg shadow-md p-6">
                <Bar data={data} options={options} width={600} height={400} />
            </div>
        </div>
    );
};

export default BarChart;
