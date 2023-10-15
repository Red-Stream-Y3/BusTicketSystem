import React from 'react';
import { Link } from 'react-router-dom';
import CreateButton from './CreateButton';

const PageHeader = ({ title, buttonText, buttonLink, isHiddenButton }) => {
    return (
        <>
            <div className="flex justify-between items-center px-6 py-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
                </div>
                {!isHiddenButton && (
                    <div>
                        <Link to={buttonLink}>
                            <CreateButton buttonTitle={buttonText} />
                        </Link>
                    </div>
                )}
            </div>
            <hr className="my-4 mx-6 border-gray-300 bg-gray-300 h-0.5" />
        </>
    );
};

export default PageHeader;
