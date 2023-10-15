import React from 'react';

const CreateButton = ({ buttonTitle }) => {
    return (
        <div>
            <button className="bg-primary text-lightbg hover:bg-tertiary hover:text-quaternary font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out">
                {buttonTitle}
            </button>
        </div>
    );
};

export default CreateButton;
