import React, { useState } from 'react'
import axiosClient from '../../../axios-client';
import Toast from '../miniComponent/Toast';
import Swal from 'sweetalert2';

const AttributeValuesEditModal = ({ attributeValue, onClose }) => {
    const [input, setInput] = useState({
        name: attributeValue ? attributeValue.name : '',
        status: attributeValue ? attributeValue.status : 1,
    });
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    const handleAttributeValueUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.put(`attribute-value/${attributeValue.id}`, input);
            Toast.fire({
                icon: 'success',
                title: 'Attribute value successfully updated'
            })
            onClose()
            window.location.reload();
        } catch (errors) {
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
            }
        }
    };

    const handleAttributeValueDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Yes, Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`attribute-value/${attributeValue.id}`)
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: res.data.message,
                        })
                        onClose()
                        window.location.reload();
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.response.data.message,
                        })
                    })
            }
        })
    }

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="absolute inset-0 bg-black opacity-60" onClick={onClose}></div>
                <div className="bg-white rounded-xl shadow-lg z-50 max-w-md w-full mx-4">
                    <div className="text-lg font-semibold bg-blue-500 text-white py-2">
                        <span className='px-5'>Attribute Values Edit</span>
                    </div>
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
                        <div className="grid grid-cols-2 text-center mt-2">
                            <div className='grid grid-cols-1'>
                                <button
                                    onClick={() => handleAttributeValueDelete(attributeValue.id)}
                                    className='bg-red-500 text-white rounded-lg mx-2 py-2'>Delete</button>
                            </div>
                            <div className='grid grid-cols-1'>
                                <button
                                    onClick={handleAttributeValueUpdate}
                                    className='bg-blue-500 text-white rounded-lg mx-2 py-2'>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default AttributeValuesEditModal
