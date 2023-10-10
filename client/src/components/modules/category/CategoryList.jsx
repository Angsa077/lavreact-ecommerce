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

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <>
            <BreadCrumb title={'Category List'} />
            <div className='border border-slate-100 shadow-md mt-3'>
                <div className='flex justify-between border py-1 bg-gray-50'>
                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Category</h2>
                    <input
                        type="text"
                        className="rounded-xl m-2 border border-blue-500 shadow-md focus:ring-1 focus:ring-blue-500 focus:outline-none placeholder:text-blue-500 placeholder:text-center"
                        placeholder="Search"
                    />
                </div>

                <div className="relative p-5">
                    <div className="overflow-x-auto max-w-full">
                        <table className='table-auto w-full border rounded-xl shadow-md hover:shadow-lg  text-black'>
                            <thead className='text-xs sm:text-sm uppercase bg-blue-500 text-white'>
                                <tr className=''>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">ID</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Name / Slug</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Serial / Status</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Photo</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Created By</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Date Time</th>
                                    <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {categories.map((category) => (
                                    <tr key={category.id} className='text-xs sm:text-sm bg-white border-b  hover:bg-gray-50'>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">{category.id}</td>
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

                <div className='flex justify-between px-5 mb-5'>
                    <div>
                        <Link
                            to='/category/create'
                            className='mt-5 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 bg-blue-500 text-white'
                        >
                            Add New
                        </Link>
                    </div>

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
