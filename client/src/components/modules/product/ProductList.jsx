import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BreadCrumb from '../../partials/BreadCrumb'
import axiosClient from '../../../axios-client'
import Pagination from "react-js-pagination";

// icons
import { IoTrashBinSharp } from 'react-icons/io5'
import { MdEdit } from 'react-icons/md'
import { AiOutlineEye } from 'react-icons/ai'
import Swal from 'sweetalert2';
import Loader from '../../partials/miniComponent/Loader';
import NoDataFound from '../../partials/miniComponent/NoDataFound';

const ProductList = () => {
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
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const getProducts = (pageNumber = 1) => {
        setIsLoading(true);
        axiosClient.get(`/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&direction=${input.direction}&per_page=${input.per_page}`)
            .then(res => {
                setProducts(res.data.data);
                setItemsCountPerPage(res.data.meta.per_page);
                setStartFrom(res.data.meta.from);
                setTotalItemsCount(res.data.meta.total);
                setActivePage(res.data.meta.current_page);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }

    const handleProductDelete = (id) => {
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
                axiosClient.delete(`/product/${id}`)
                    .then(res => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Deleted!',
                            text: res.data.message,
                        })
                        getProducts()
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

    const handleInput = (e) => {
        setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    }

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <BreadCrumb title={'Product List'} />
            <div className='border border-slate-100 shadow-md mt-3'>
                <div className='flex justify-between items-center border py-1 bg-gray-50'>
                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Product</h2>
                    <div className='mx-5 hover:scale-105 block sm:hidden'>
                        <Link
                            to='/product/create'
                            className='rounded-xl text-sm py-2 px-2 font-bold border shadow-md bg-blue-500 text-white'
                        >
                            Add New
                        </Link>
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
                        <button type='button' className='py-1 text-sm bg-blue-500 text-white rounded-md border border-blue-500 shadow-md font-bold' onClick={() => getProducts(1)}>Search</button>
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
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Price</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Status</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Category</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Photo</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">Date Time</th>
                                        <th scope="col" className="px-2 py-1 sm:px-3 sm:py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan="7" className="text-center">
                                                <NoDataFound />
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((product, index) => (
                                            <tr key={index} className='text-xs sm:text-sm bg-white border-b  hover:bg-gray-50'>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">{startFrom + index}</td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                                    <p>Name : {product.name}</p>
                                                    <p>Slug : {product.slug}</p>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                                    <p>Price : {product.price}</p>
                                                    <p>Discount : {product.discount_percent}% + {product.discount_fixed}</p>
                                                    <p>Cost : {product.cost}</p>
                                                    <p>Discount Start : {product.discount_start}</p>
                                                    <p>Discount End : {product.discount_end}</p>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                                    <p className='text-blue-500'>SKU : {product.sku}</p>
                                                    <p className='text-blue-500'>Stock :{product.stock}</p>
                                                    <p className={`${product.status == 'Active' ? 'text-green-500' : 'text-red-500'}`}>Status : {product.status}</p>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">
                                                    <p>Category : {product.category}</p>
                                                    <p>Sub Category : {product.sub_category}</p>
                                                    <p>Supplier : {product.supplier}</p>
                                                    <p>Brand : {product.brand}</p>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2">
                                                    <span className='flex justify-center'>
                                                        {/* <img
                                                            src={product.photo}
                                                            alt={product.name}
                                                            className='w-12 h-12 shadow-md hover:scale-105 cursor-zoom-in flex items-center rounded-md border border-white'
                                                        /> */}
                                                    </span>
                                                </td>
                                                <td scope="col" className="px-2 py-1 sm:px-3 sm:py-2 text-start">
                                                    <p>Created : {product.created_at}</p>
                                                    <p>Updated : {product.updated_at}</p>
                                                    <p>Created By : {product.created_by}</p>
                                                    <p>Updatde By : {product.updated_by}</p>
                                                </td>
                                                <td scope="col" className="text-center">
                                                    <div className="flex flex-col sm:flex-row items-center justify-center">
                                                        <button
                                                            className='rounded-full bg-white shadow-md p-1 text-blue-500 hover:scale-125 mx-1 my-1'
                                                        >
                                                            <AiOutlineEye />
                                                        </button>
                                                        <Link to={`/product/edit/${product.id}`}>
                                                            <button className='rounded-full bg-white shadow-md p-1 text-yellow-300 hover:scale-125 mx-1 my-1'>
                                                                <MdEdit />
                                                            </button>
                                                        </Link>
                                                        <button
                                                            className='rounded-full bg-white shadow-md p-1 text-red-500 hover:scale-125 mx-1 my-1'
                                                            onClick={() => handleProductDelete(product.id)}
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

                            {/* {modalShow && (
                                <PhotoModal photoUrl={modalPhoto} onClose={closeModal} />
                            )}

                            {detailsModalShow && (
                                <SubCategoryDetailsModal
                                    subCategoryDetails={detailsSubCategory}
                                    onClose={closeDetailsModal}
                                />
                            )} */}

                        </div>
                    </div>
                )}


                <div className='flex justify-center sm:justify-between px-5 mb-5'>
                    <div className='hover:scale-105 hidden sm:flex'>
                        <Link
                            to='/product/create'
                            className='rounded-xl text-sm py-2 px-2 font-bold border shadow-md bg-blue-500 text-white'
                        >
                            Add New
                        </Link>
                    </div>
                    <div>
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={5}
                            onChange={getProducts}
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

export default ProductList