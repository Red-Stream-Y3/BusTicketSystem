import React, { useState } from 'react';

const Form = ({ title, initialValues, onSubmit, onCancel, buttonText }) => {
    const [formValues, setFormValues] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    const handleCancel = () => {
        onCancel();
    };

    return (
        <div>
            <div className="bg-gray-300 text-black overflow-hidden shadow-xl mx-auto px-10 md:mb-20 md:mx-40 lg:mx-30 rounded-xl ">
                <div className="py-4 px-6">
                    <h1 className="text-3xl font-semibold mb-3 text-left">{title}</h1>
                    <hr className="border-gray-500 border-1 w-full mb-5" />
                    <form onSubmit={handleSubmit}>
                        {Object.keys(initialValues).map((key) => (
                            <div key={key} className="mb-3">
                                <label htmlFor={key} className="block mb-1 text-left">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                <input
                                    type="text"
                                    name={key}
                                    id={key}
                                    rows="2"
                                    className="w-full p-2 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-black bg-lightbg text-black"
                                    value={formValues[key]}
                                    onChange={handleChange}
                                    pattern="[A-Za-z0-9]+"
                                    required
                                />
                            </div>
                        ))}
                        <div className="flex justify-end space-x-2 mt-10">
                            <button
                                type="button"
                                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary"
                            >
                                {buttonText}
                            </button>
                        </div>
                    </form>
                </div>
                <hr className="md:hidden mt-3" />
            </div>
        </div>
    );
};

export default Form;
