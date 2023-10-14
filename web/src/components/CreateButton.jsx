import React from 'react';

const CreateButton = ({ buttonTitle }) => {
    return (
        <div>
            <button className="bg-primary hover:bg-quaternary hover:text-tertiary text-lightbg font-bold py-2 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out">
                {buttonTitle}
            </button>
        </div>
    );
};

export default CreateButton;
