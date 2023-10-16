import React, { useState, useEffect } from 'react';

const Form = ({ fields, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData);

    const handleAddPassenger = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            boardedPassengers: [...prevFormData.boardedPassengers, ''],
        }));
    };

    const handleRemovePassenger = (index) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            boardedPassengers: prevFormData.boardedPassengers.filter((_, i) => i !== index),
        }));
    };

    const handleChangePassenger = (index, value) => {
        setFormData((prevFormData) => {
            const updatedPassengers = [...prevFormData.boardedPassengers];
            updatedPassengers[index] = value;
            return { ...prevFormData, boardedPassengers: updatedPassengers };
        });
    };

    useEffect(() => {
        setFormData(initialData);
    }, [initialData]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    const handleCancel = () => {
        setFormData(initialData);
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 rounded-lg">
            <form className=" p-10 rounded shadow-lg" onSubmit={handleSubmit} style={{ width: '600px' }}>
                {fields.map((field) => {
                    const { key, label, type, options } = field;
                    return (
                        <div key={key} className="mb-4">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">{label}</label>
                            {type === 'text' && (
                                <input
                                    type="text"
                                    name={key}
                                    value={formData[key] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Za-z0-9 ]+"
                                />
                            )}
                            {type === 'password' && (
                                <input
                                    type="password"
                                    name={key}
                                    value={formData[key] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            )}
                            {type === 'email' && (
                                <input
                                    type="email"
                                    name={key}
                                    value={formData[key] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            )}
                            {type === 'radio' &&
                                options.map((option) => (
                                    <div key={option.value} className="flex items-center mt-1">
                                        <input
                                            type="radio"
                                            name={key}
                                            value={option.value}
                                            checked={formData[key] === option.value}
                                            className="mr-2"
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="text-sm text-quaternary">{option.label}</span>
                                    </div>
                                ))}
                            {type === 'select' && (
                                <select
                                    name={key}
                                    value={formData[key] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="" className="text-quaternary">
                                        Select...
                                    </option>
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value} className="text-quaternary">
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                            {type === 'datetime-local' && (
                                <input
                                    type="datetime-local"
                                    name={key}
                                    value={formData[key] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                />
                            )}
                            {type === 'dynamic-list' && (
                                <div>
                                    <div className="my-4 flex justify-between items-center">
                                        <label className="block text-md text-start mb-2 font-medium text-quaternary">
                                            {label}
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => handleAddPassenger()} // Replace with your appropriate function
                                            className="px-2 py-1 bg-primary text-white rounded hover:bg-secondary"
                                        >
                                            <i className="fa-solid fa-plus"></i>
                                        </button>
                                    </div>
                                    {formData.boardedPassengers.map((passenger, index) => (
                                        <div key={index} className="flex items-center mt-1">
                                            <input
                                                type="text"
                                                value={passenger}
                                                onChange={(e) => handleChangePassenger(index, e.target.value)}
                                                className="p-2 w-full border rounded-md"
                                            />
                                            {formData.boardedPassengers.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePassenger(index)} // Replace with your appropriate function
                                                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                                >
                                                    <i className="fa-solid fa-circle-minus"></i>
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
                <div className="flex justify-end space-x-2 mt-10">
                    <button
                        type="button"
                        className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
