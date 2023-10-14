import React from 'react';

const PageHeader = ({ title }) => {
    return (
        <div className="px-6">
            <h1 className="text-3xl font-semibold text-gray-800 text-left">{title}</h1>
            <hr className="my-4 border-gray-300 bg-gray-300 h-0.5" />
        </div>
    );
};

export default PageHeader;
