import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../../partials/BreadCrumb'
import axiosClient from '../../../axios-client'
import Pagination from "react-js-pagination";

// icons
import { IoTrashBinSharp } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import CategoryPhotoModal from '../../partials/modals/CategoryPhotoModal';

const CategoryList = () => {
    const [input, setInput] = useState({
        search: '',
        order_by: '',
        direction: '',
    });

    const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    const [totalItemsCount, setTotalItemsCount] = useState(1);
    const [startFrom, setStartFrom] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [modalShow, setModalShow] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');
    const [categories, setCategories] = useState([]);

    const getCategories = (pageNumber) => {
        axiosClient.get(`/category?page=${pageNumber}`)
            .then(res => {
                setCategories(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setStartFrom(res.data.meta.from);
                setTotalItemsCount(res.data.meta.total);
                setActivePage(res.data.meta.current_page);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handlePhotoModal = (photo) => {
        setModalPhoto(photo);
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <BreadCrumb title={'Category List'} />
            <div className='border border-slate-100 shadow-md mt-3'>
                <div className='flex justify-between items-center border py-1 bg-gray-50'>
                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Category</h2>
                    <div className='mx-5 hover:scale-105'>
                        <Link
                            to='/category/create'
                            className='rounded-xl text-sm py-2 px-2 font-bold border shadow-md bg-blue-500 text-white'
                        >
                            Add New
                        </Link>
                    </div>
                </div>

                <div className='block sm:flex space-x-5 mx-2 sm:mx-5 mt-5 sm:mt-3 space-y-2'>
                    <div className='flex items-center mt-2 ml-5 sm:ml-0'>
                        <input
                            type="text"
                            className="w-full rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-blue-500 placeholder:text-center"
                            placeholder="Search . . ."
                            id='search'
                            value={input.search}
                            onChange={handleInput}
                        />
                    </div>
                    <div className='block sm:flex items-center sm:space-x-2'>
                        <p className='text-sm font-semibold text-blue-500'>Order by</p>
                        <select
                            type="text"
                            className="w-full sm:w-1/2 text-blue-500 rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            id='order_by'
                            value={input.order_by}
                            onChange={handleInput}
                        >
                            <option value="name">Name</option>
                            <option value="serial">Serial</option>
                            <option value="status">Status</option>
                            <option value="created_at">Created At</option>
                            <option value="updated_at">Updated At</option>
                        </select>
                    </div>
                    <div className='block sm:flex items-center sm:space-x-2'>
                        <p className='text-sm font-semibold text-blue-500'>Order Direction</p>
                        <select
                            type="text"
                            className="w-full sm:w-3/4 text-blue-500 rounded-md border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            id='direction'
                            value={input.direction}
                            onChange={handleInput}
                        >
                            <option value="name">ASC</option>
                            <option value="created_at">DESC</option>
                        </select>
                    </div>
                    <div className='flex items-center'>
                        <button type='button' className='w-full px-5 bg-blue-500 text-white rounded-md mt-3 sm:mt-0 shadow-md hover:scale-105' onClick={getCategories}>Search</button>
                    </div>
                </div>

                <div className="relative p-5">
                    <div className="overflow-x-auto max-w-full">
                        <table className='table-auto w-full border rounded-xl shadow-md hover:shadow-lg  text-black'>
                            <thead className='text-xs sm:text-sm uppercase bg-blue-500 text-white'>
                                <tr className=''>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">SL</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Name / Slug</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Serial / Status</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Photo</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Created By</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Date Time</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {categories.map((category, index) => (
                                    <tr key={index} className='text-xs sm:text-sm bg-white border-b  hover:bg-gray-50'>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">{startFrom + index}</td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                            <p>{category.name}</p>
                                            <p>{category.slug}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                            <p className='text-blue-500'>Serial : {category.serial}</p>
                                            <p className={`${category.status == 'Active' ? 'text-green-500' : 'text-red-500'}`}>Status : {category.status}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                            <span className='flex justify-center'>
                                                <img
                                                    onClick={() => handlePhotoModal(category.photo)}
                                                    src={category.photo}
                                                    alt={category.name}
                                                    className='w-12 h-12 shadow-md hover:scale-105 cursor-zoom-in flex items-center rounded-md border border-white'
                                                />
                                            </span>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                            <p>{category.created_by}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                            <p>{category.created_at}</p>
                                            <p>{category.updated_at}</p>
                                        </td>
                                        <td scope="col" className="text-center">
                                            <div className="flex flex-col sm:flex-row items-center justify-center">
                                                <button className='rounded-full bg-white shadow-md p-1 text-blue-500 hover:scale-125 mx-1 my-1'>
                                                    <AiOutlineEye />
                                                </button>
                                                <Link>
                                                    <button className='rounded-full bg-white shadow-md p-1 text-yellow-300 hover:scale-125 mx-1 my-1'>
                                                        <MdEdit />
                                                    </button>
                                                </Link>
                                                <button className='rounded-full bg-white shadow-md p-1 text-red-500 hover:scale-125 mx-1 my-1'>
                                                    <IoTrashBinSharp />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {modalShow && (
                            <CategoryPhotoModal photoUrl={modalPhoto} onClose={closeModal} />
                        )}

                    </div>
                </div>

                <div className='flex justify-center px-5 mb-5'>
                    <div className=''>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={getCategories}
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

export default CategoryList
