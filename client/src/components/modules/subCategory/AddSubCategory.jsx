import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../partials/BreadCrumb';
import { BiCommentAdd } from 'react-icons/bi'
import axiosClient from '../../../axios-client';
import Toast from '../../partials/miniComponent/Toast';

const AddSubCategory = () => {
    const [input, setInput] = useState({
        name: '',
        category_id: '',
        slug: '',
        serial: '',
        status: 1,
        description: '',
        photo: null,
    });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [categories, setCategories] = useState([]);

    const getCategories = () => {
        axiosClient.get('/get-category-list')
            .then(res => {
                setCategories(res.data.data);
            })
    }

    const handleInput = (e) => {
        if (e.target.id === 'name') {
            let slug = e.target.value;
            slug = slug.toLowerCase();
            slug = slug.replaceAll(' ', '-');
            setInput((prevState) => ({ ...prevState, slug: slug }));
        }
        setInput((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));
    };

    const handlePhoto = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                setInput((prevState) => ({ ...prevState, photo: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubCategoryCreate = async (e) => {
        e.preventDefault();
        try {
            await axiosClient.post('/sub-category', input);
            setIsLoading(false)
            Toast.fire({
                icon: 'success',
                title: 'Sub category successfully added'
            })
            setIsOpenModal(false)
            setInput({
                name: '',
                slug: '',
                serial: '',
                status: 1,
                description: '',
                photo: null,
            })
            console.log(input)
        } catch (errors) {
            setIsLoading(false)
            if (errors.response.status == 422) {
                setErrors(errors.response.data.errors)
                console.log(input)
            }
        }
    };

    const handleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    useEffect(() => {
        getCategories();
    }, []);
    return (
        <>
            <BreadCrumb title={'Add Sub Category'} />
            <div className='border border-slate-100 shadow-md mt-3'>
                <div className={`flex justify-between border py-1 ${isOpenModal ? 'bg-gray-50' : ''}`}>
                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Add Sub Category</h2>
                    <button
                        className='flex items-center bg-blue-500 text-white rounded-md my-1 px-2 mr-5 gap-x-1 hover:scale-105'
                        onClick={handleModal}
                    >
                        <BiCommentAdd size={20} />
                        <p>Add</p>
                    </button>
                </div>
                {isOpenModal && (
                    <form onSubmit={handleSubCategoryCreate} >
                        <div className='px-8 py-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4'>

                            <div className="">
                                <label htmlFor="category_id" className="block text-gray-700">Select Category</label>
                                <select
                                    id="category_id"
                                    value={input.category_id}
                                    onChange={handleInput}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.category_id ? 'border-red-500' : ''}`}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                <p>{errors.category_id && <span className="text-red-500 text-xs">{errors.category_id}</span>}</p>
                            </div>

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
                                <label htmlFor="slug" className="block text-gray-700">Slug:</label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={input.slug}
                                    onChange={handleInput}
                                    placeholder="Enter slug"
                                    readOnly
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.slug ? 'border-red-500' : ''
                                        }`}
                                />
                                <p>{errors.slug && <span className="text-red-500 text-xs">{errors.slug}</span>}</p>
                            </div>

                            <div className="">
                                <label htmlFor="serial" className="block text-gray-700">Serial:</label>
                                <input
                                    type="number"
                                    id="serial"
                                    value={input.serial}
                                    onChange={handleInput}
                                    placeholder="Enter serial"
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.serial ? 'border-red-500' : ''
                                        }`}
                                />
                                <p>{errors.serial && <span className="text-red-500 text-xs">{errors.serial}</span>}</p>
                            </div>

                            <div className="">
                                <label htmlFor="status" className="block text-gray-700">Status:</label>
                                <select
                                    id="status"
                                    value={input.status}
                                    onChange={handleInput}
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.status ? 'border-red-500' : ''}`}
                                >
                                    <option value={1}>Active</option>
                                    <option value={0}>Inactive</option>
                                </select>
                                <p>{errors.status && <span className="text-red-500 text-xs">{errors.status}</span>}</p>
                            </div>

                            <div className="">
                                <label htmlFor="description" className="block text-gray-700">Description:</label>
                                <textarea
                                    type="text"
                                    id="description"
                                    value={input.description}
                                    onChange={handleInput}
                                    placeholder="Enter description"
                                    className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.description ? 'border-red-500' : ''
                                        }`}
                                />
                                <p>{errors.description && <span className="text-red-500 text-xs">{errors.description}</span>}</p>
                            </div>
                        </div>
                        
                        <div className='px-8 py-4 grid grid-cols-1'>
                                <label htmlFor="photo" className="block text-gray-700">Photo:</label>
                                <div className='flex'>
                                    <div className={`relative border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${input.photo ? 'w-3/4' : 'w-full'}`}>
                                        <input
                                            type="file"
                                            id="photo"
                                            onChange={handlePhoto}
                                        />
                                    </div>
                                    <div className='mx-auto'>
                                        {input.photo && (
                                            <img src={input.photo} alt="photo" className="w-20 h-20 object-cover rounded hover:scale-105 border-blue-500" />
                                        )}
                                    </div>
                                    <p>{errors.photo && <span className="text-red-500 text-xs">{errors.photo}</span>}</p>
                                </div>
                            </div>

                        <div className='px-8 mb-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-8'>
                            {isLoading &&
                                <button className="bg-blue-500 text-white p-1 px-3 font-bold text-md rounded-md">
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                </button>
                            }
                            {!isLoading &&
                                <button className="bg-blue-500 text-white p-1 px-3 font-bold text-md rounded-md hover:scale-105" type="submit">Save</button>
                            }
                        </div>
                    </form>
                )}
            </div >
        </>
    )
}

export default AddSubCategory
