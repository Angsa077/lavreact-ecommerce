import React, { useEffect, useState } from 'react'
import BreadCrumb from '../../partials/BreadCrumb'
import axiosClient from '../../../axios-client'
import Pagination from "react-js-pagination";
import Loader from '../../partials/miniComponent/Loader';
import NoDataFound from '../../partials/miniComponent/NoDataFound';
import AttributesAddModal from '../../partials/modals/AttributesAddModal';
import AttributesEditModal from '../../partials/modals/AttributesEditModal'
import AttributeValuesAddModal from '../../partials/modals/AttributeValuesAddModal';

// icons
import { IoTrashBinSharp } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import Swal from 'sweetalert2';
import AttributeValuesEditModal from '../../partials/modals/AttributeValuesEditModal';

const Attribute = () => {
    const [input, setInput] = useState({
        search: '',
        order_by: 'name',
        direction: 'asc',
        per_page: 5
    });
    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [attributes, setAttributes] = useState([]);
    const [attributeValues, setAttributeValues] = useState([]);
    const [attribute, setAttribute] = useState(null);
    const [attributeValue, setAttributeValue] = useState(null);
    const [addAttributeValueModalShow, setAddAttributeValueModalShow] = useState(false)
    const [editAttributeValueModalShow, setEditAttributeValueModalShow] = useState(false)
    const [addModalShow, setAddModalShow] = useState(false)
    const [editModalShow, setEditModalShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    const getAttributes = (pageNumber = 1) => {
        setIsLoading(true);
        axiosClient.get(`/attribute?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res => {
                setAttributes(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setStartFrom(res.data.meta.from);
                setTotalItemsCount(res.data.meta.total);
                setActivePage(res.data.meta.current_page);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
                console.error(error);
            });
    }

    const handleAttributesDelete = (id) => {
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
                setIsLoading(true)
                axiosClient.delete(`/attribute/${id}`)
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: res.data.message,
                        })
                        getAttributes()
                        setIsLoading(false)
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.response.data.message,
                        })
                        setIsLoading(false)
                    })
            }
        })
    }

    const getAttributeValues = () => {
        setIsLoading(true);
        axiosClient.get(`/attribute-value`)
            .then(res => {
                setAttributeValues(res.data.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        getAttributes();
    }, []);

    useEffect(() => {
        getAttributeValues();
    }, []);

    const handleAddAttributeValueModal = (attribute) => {
        setAddAttributeValueModalShow(true);
        setAttribute(attribute);
    };
    const closeAddAttributeValueModal = () => {
        setAddAttributeValueModalShow(false);
    };

    const handleEditAttributeValueModal = (attributeValue) => {
        setEditAttributeValueModalShow(true);
        setAttributeValue(attributeValue);
    };

    const closeEditAttributeValueModal = () => {
        setEditAttributeValueModalShow(false);
    };

    const handleAddAttributeModal = () => {
        setAddModalShow(true);
    };
    const closeAddAttributeModal = () => {
        setAddModalShow(false);
    };

    const handleEditAttributeModal = (attribute) => {
        setEditModalShow(true);
        setAttribute(attribute);
    };

    const closeEditAttributeModal = () => {
        setEditModalShow(false);
    };

    return (
        <>
            <BreadCrumb title={'Attributes'} />
            <div className='border border-slate-100 shadow-md mt-3'>
                <div className='flex justify-between items-center border py-1 bg-gray-50'>
                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Attributes</h2>
                    <div className='mx-5 hover:scale-105 block sm:hidden'>
                        <button
                            onClick={handleAddAttributeModal}
                            className='rounded-xl text-sm py-2 px-2 font-bold border shadow-md bg-blue-500 text-white'
                        >
                            Add New
                        </button>
                    </div>
                </div>

                <div className='block sm:grid grid-cols-4 gap-4 mt-3'>
                    <div className='grid grid-cols-1 mx-5'>
                        <p className='text-sm font-semibold text-blue-500'>Search</p>
                        <input
                            type="text"
                            className="py-1 text-sm rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-blue-500"
                            placeholder="Enter keyword"
                            id='search'
                            value={input.search}
                            onChange={handleInput}
                        />
                        <p>{errors.search && <span className="text-red-500 text-xs">{errors.search}</span>}</p>
                    </div>
                    <div className='grid grid-cols-1 mx-5'>
                        <p className='text-sm font-semibold text-blue-500'>Order by</p>
                        <select
                            type="text"
                            className="py-1 text-sm text-blue-500 rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            id='order_by'
                            value={input.order_by}
                            onChange={handleInput}
                        >
                            <option value="name">Name</option>
                            <option value="status">Status</option>
                            <option value="created_at">Created At</option>
                            <option value="updated_at">Updated At</option>
                        </select>
                        <p>{errors.order_by && <span className="text-red-500 text-xs">{errors.order_by}</span>}</p>
                    </div>
                    <div className='grid grid-cols-1 mx-5'>
                        <div className='grid grid-cols-2 space-x-5'>
                            <div className='mr-5'>
                                <p className='text-sm font-semibold text-blue-500'>Order Direction</p>
                                <select
                                    type="text"
                                    className="w-full py-1 text-sm text-blue-500 rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    id='direction'
                                    value={input.direction}
                                    onChange={handleInput}
                                >
                                    <option value="asc">ASC</option>
                                    <option value="desc">DESC</option>
                                </select>
                                <p>{errors.direction && <span className="text-red-500 text-xs">{errors.direction}</span>}</p>
                            </div>
                            <div>
                                <p className='text-sm font-semibold text-blue-500'>Per Page</p>
                                <select
                                    type="text"
                                    className="w-full py-1 text-sm text-blue-500 rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    id='per_page'
                                    value={input.per_page}
                                    onChange={handleInput}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={15}>15</option>
                                    <option value={20}>20</option>
                                </select>
                                <p>{errors.per_page && <span className="text-red-500 text-xs">{errors.per_page}</span>}</p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 mt-3 sm:mt-5 mx-5 hover:scale-105'>
                        <button type='button' className='py-1 text-sm bg-blue-500 text-white rounded-md border border-blue-500 shadow-md font-bold' onClick={() => getAttributes(1)}>Search</button>
                    </div>
                </div>

                {isLoading ? (
                    <div className='flex justify-center w-full'>
                        <div className='w-1/4'>
                            <Loader />
                        </div>
                    </div>
                ) : (
                    <div className="relative p-5">
                        <div className="overflow-x-auto max-w-full">
                            <table className='table-auto w-full border rounded-xl shadow-md hover:shadow-lg  text-black'>
                                <thead className='text-xs sm:text-sm uppercase bg-blue-500 text-white'>
                                    <tr className=''>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">SL</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Name</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">Value</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Status</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Created By</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Date Time</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attributes.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                <NoDataFound />
                                            </td>
                                        </tr>
                                    ) : (
                                        attributes.map((attribute, index) => (
                                            <tr key={index} className='text-xs sm:text-sm bg-white border-b  hover:bg-gray-50'>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">{startFrom + index}</td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                                    <p>{attribute.name}</p>
                                                </td>
                                                <td scope="col" className="text-center px-12">
                                                    {attributeValues.map((attributeValue) => (
                                                        attribute.id === attributeValue.attribute_id && (
                                                            <div key={attributeValue.id}>
                                                                <button
                                                                    onClick={() => handleEditAttributeValueModal(attributeValue)}
                                                                    className='bg-blue-500 px-2 text-white rounded-lg border shadow-lg hover:scale-105 my-1'
                                                                >
                                                                    {attributeValue.name}
                                                                </button>
                                                            </div>
                                                        )
                                                    ))}

                                                    <button
                                                        onClick={() => handleAddAttributeValueModal(attribute)}
                                                        className='bg-blue-500 px-2 text-white rounded-lg border shadow-lg hover:scale-105 my-1'
                                                    >
                                                        Add
                                                    </button>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                                    <p className={`${attribute.status === 1 ? 'text-green-500' : 'text-red-500'}`}>
                                                        {attribute.status === 1 ? 'Active' : 'Inactive'}
                                                    </p>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                                    <p>{attribute.created_by}</p>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                                    <p>{attribute.created_at}</p>
                                                    <p>{attribute.updated_at}</p>
                                                </td>
                                                <td scope="col" className="text-center">
                                                    <div className="flex flex-col sm:flex-row items-center justify-center">
                                                        <button
                                                            onClick={() => handleEditAttributeModal(attribute)}
                                                            className='rounded-full bg-white shadow-md p-1 text-yellow-300 hover:scale-125 mx-1 my-1'>
                                                            <MdEdit />
                                                        </button>
                                                        <button
                                                            className='rounded-full bg-white shadow-md p-1 text-red-500 hover:scale-125 mx-1 my-1'
                                                            onClick={() => handleAttributesDelete(attribute.id)}
                                                        >
                                                            <IoTrashBinSharp />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>

                            {addAttributeValueModalShow && (
                                <AttributeValuesAddModal
                                    onClose={closeAddAttributeValueModal}
                                    attribute={attribute}
                                />
                            )}

                            {editAttributeValueModalShow && (
                                <AttributeValuesEditModal
                                    onClose={closeEditAttributeValueModal}
                                    attributeValue={attributeValue}
                                />
                            )}

                            {addModalShow && (
                                <AttributesAddModal
                                    onClose={closeAddAttributeModal}
                                />
                            )}

                            {editModalShow && (
                                <AttributesEditModal
                                    onClose={closeEditAttributeModal}
                                    attribute={attribute}
                                />
                            )}

                        </div>
                    </div>
                )}


                <div className='flex justify-center sm:justify-between px-5 mb-5'>
                    <div className='hover:scale-105 hidden sm:flex'>
                        <button
                            onClick={handleAddAttributeModal}
                            className='rounded-xl text-sm py-2 px-2 font-bold border shadow-md bg-blue-500 text-white'>
                            Add New
                        </button>
                    </div>
                    <div>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={getAttributes}
                            activeClass="bg-blue-500 text-white rounded-full text-center shadow-md"
                            itemClass="px-3 py-1 rounded-xl text-sm font-bold border shadow-md hover:bg-blue-500 hover:text-white border-blue-500 text-blue-500 mx-1"
                            innerClass="flex justify-between"
                        />
                    </div>
                </div>
            </div >
        </>
    )
}

export default Attribute
