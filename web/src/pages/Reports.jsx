import React, { useState, useEffect } from 'react';
import { PageHeader, PieChart, LineChart, BarChart } from '../components';

const Reports = () => {
    return (
        <div className="mt-20 mx-4">
            <PageHeader title="Reports" isHiddenButton={true} />
            <div className="flex flex-col md:flex-row justify-start justify-items-start gap-4">
                <div className="w-1/3">
                    <PieChart />
                </div>
                <div className="w-2/3">
                    <LineChart />
                </div>
            </div>
        </div>
    );
};

export default Reports;
