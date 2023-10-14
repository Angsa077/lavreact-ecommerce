import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client';
import Toast from '../miniComponent/Toast';

const ProductAttributesEditModal = ({ productAttribute, onClose }) => {
    const [input, setInput] = useState({
        name: '',
        status: 1,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (productAttribute) {
            setInput({
                name: productAttribute.name,
                status: productAttribute.status,
            });
        }
    }, [productAttribute]);

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }
    
    const handleProductAttributeUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put(`/attribute/${productAttribute.id}`, input);
            Toast.fire({
                icon: 'success',
                title: 'Product attribute successfully updated'
            })
            onClose()
            window.location.reload();
        } catch (errors) {
            setIsLoading(false);
            if (errors.response.status == 422) {
                console.log(errors.response.data.errors);
                setErrors(errors.response.data.errors);
            }
        }
    }


    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-60" onClick={onClose}></div>
                <div className="bg-white rounded-xl shadow-lg z-50 max-w-md w-full mx-4">
                    <div className="text-lg font-semibold bg-blue-500 text-white py-2">
                        <span className='px-5'>Product Attributes Edit</span>
                    </div>
                    <form action="" onSubmit={handleProductAttributeUpdate}>
                        <div className='px-8 py-4 grid grid-cols-1 gap-4'>
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={input.name}
                                    onChange={handleInput}
                                    placeholder="Enter name"
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : ''
                                        }`}
                                />
                                <p>{errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}</p>
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-gray-700">Status:</label>
                                <select
                                    id="status"
                                    value={input.status}
                                    onChange={handleInput}
                                    placeholder="Enter status"
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.status ? 'border-red-500' : ''}`}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                                <p>{errors.status && <span className="text-red-500 text-xs">{errors.status}</span>}</p>
                            </div>
                            <div className="text-center mt-2">
                                <button className='bg-blue-500 text-white rounded-lg w-full py-1'>Update</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </>
    )
}

export default ProductAttributesEditModal
