import React, { useState, useEffect } from 'react';

const Form = ({ fields, initialData, onSubmit }) => {
    const [formData, setFormData] = useState(initialData || {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleCancel = () => {
        setFormData(initialData);
    };

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    return (
        <div className="flex justify-center items-center">
            <form className="bg-gray-100 p-10 rounded shadow-lg" onSubmit={handleSubmit} style={{ width: '600px' }}>
                {fields.map((field) => {
                    const { name, type, options } = field;
                    return (
                        <div key={name} className="mb-4">
                            <label className="block text-md text-start mb-2 font-medium text-quaternary">{name}</label>
                            {type === 'text' && (
                                <input
                                    type="text"
                                    name={name}
                                    value={formData[name] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                    required
                                    pattern="[A-Za-z0-9 ]+"
                                />
                            )}
                            {type === 'radio' &&
                                options.map((option) => (
                                    <div key={option.value} className="flex items-center mt-1">
                                        <input
                                            type="radio"
                                            name={name}
                                            value={option.value}
                                            checked={formData[name] === option.value}
                                            className="mr-2"
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="text-sm text-quaternary">{option.label}</span>
                                    </div>
                                ))}
                            {type === 'select' && (
                                <select
                                    name={name}
                                    value={formData[name] || ''}
                                    className="mt-1 p-2 w-full border rounded-md"
                                    onChange={handleChange}
                                >
                                    <option value="" className="text-quaternary">
                                        Select...
                                    </option>
                                    {options.map((option) => (
                                        <option key={option.id} value={option.id} required className="">
                                            {option.name}
                                        </option>
                                    ))}
                                </select>
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
