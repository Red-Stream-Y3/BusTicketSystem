import React from 'react';
import { PageHeader } from '../../components';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const LineChart = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Monthly Sales',
                data: [65, 59, 80, 81, 56, 55, 40], // Example data for the line chart
                fill: false, // Don't fill the area under the line
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        scales: {
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
            <PageHeader title="Line Chart Example" isHiddenButton={true} />
            <div className="bg-white rounded-lg shadow-md p-6">
                <Line data={data} options={options} width={600} height={400} />
            </div>
        </div>
    );
};

export default LineChart;
