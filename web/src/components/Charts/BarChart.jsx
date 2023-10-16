import React from 'react';
import { PageHeader } from '../../components';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const BarChart = () => {
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Dataset 1',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Dataset 2',
                data: [7, 11, 5, 8, 3, 7],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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
            <PageHeader title="Bar Chart Example" isHiddenButton={true} />
            <div className="bg-white rounded-lg shadow-md p-6">
                <Bar data={data} options={options} width={600} height={400} />
            </div>
        </div>
    );
};

export default BarChart;
