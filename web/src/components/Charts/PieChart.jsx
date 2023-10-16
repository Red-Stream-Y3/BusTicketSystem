import React from 'react';
import { PageHeader } from '../../components';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const busJourneyTypes = [
    { label: 'Scheduled', value: 20, color: '#FF6384' },
    { label: 'Departed', value: 25, color: '#6612EB' },
    { label: 'Delayed', value: 5, color: '#F7C856' },
    { label: 'Completed', value: 45, color: '#4F6384' },
    { label: 'Cancelled', value: 5, color: '#56A2EB' },
];

const PieChart = () => {
    const data = {
        labels: busJourneyTypes.map((item) => item.label),
        datasets: [
            {
                label: 'Revenue',
                data: busJourneyTypes.map((item) => item.value),
                backgroundColor: busJourneyTypes.map((item) => item.color),
                borderColor: busJourneyTypes.map((item) => item.color),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
    };

    return (
        <div className="w-full h-full p-4">
            <PageHeader title="Bus Journey Status" isHiddenButton={true} />
            <div className="bg-white rounded-lg shadow-md p-6">
                <Pie data={data} options={options} width={600} height={400} />
            </div>
        </div>
    );
};

export default PieChart;
