import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../../partials/BreadCrumb'
import axiosClient from '../../../axios-client'

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axiosClient.get('/category')
            .then(res => {
                setCategories(res.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setError(error); // Set the error state if the request fails
                setLoading(false);
            });
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

                                {categories.map((category) => (
                                    <tr key={category.id} className='text-xs sm:text-sm bg-white border-b  hover:bg-gray-50'>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">{category.id}</td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                            <p>{category.name}</p>
                                            <p>{category.slug}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                            <p>Serial : {category.serial}</p>
                                            <p>Status : {category.status}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 flex items-center justify-center">
                                            <img src={category.photo} alt="" className='w-12 h-12' />
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                            <p>{category.created_by}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                            <p>{category.created_at}</p>
                                            <p>{category.updated_at}</p>
                                        </td>
                                        <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-center">
                                            <Link to=''>
                                                <button className='mt-2 sm:mt-0 p-1 px-2 rounded-xl text-xs sm:text-sm bg-yellow-300 text-white hover:scale-105 mr-2'>Edit</button>
                                            </Link>
                                            <button
                                                className='mt-2 sm:mt-0 p-1 px-2 rounded-xl text-xs sm:text-sm bg-red-500 text-white hover:scale-105'
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className='flex justify-between px-5 mb-5'>
                    <div className='flex justify-start'>
                        <Link
                            to='/category/create'
                            className='mt-5 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 bg-blue-500 text-white'
                        >
                            Add New
                        </Link>
                    </div>

                    <div className='flex justify-end'>
                        {/* Previous Page Button */}
                        <button
                            className='mt-5 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 border-blue-500 text-blue-500'
                        >
                            Previous
                        </button>

                        {/* Next Page Button */}
                        <button
                            className='mt-5 ml-2 p-2 rounded-xl text-sm font-bold border shadow-md hover:scale-105 border-blue-500 text-blue-500'
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}

export default CategoryList
