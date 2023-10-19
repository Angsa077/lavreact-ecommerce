import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreadCrumb from '../../partials/BreadCrumb';
import { BiCommentAdd } from 'react-icons/bi';
import { MdPhotoCamera } from 'react-icons/md';
import axiosClient from '../../../axios-client';
import Toast from '../../partials/miniComponent/Toast';
import { FaTrash } from 'react-icons/fa';

const AddProductPhoto = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [errors, setErrors] = useState([]);
    const param = useParams();
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();

    const handlePhoto = (e) => {
        if (photos.length < 5) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result;
                    const newPhoto = {
                        photo: base64String,
                        is_primary: photos.length === 0,
                    };
                    setPhotos([...photos, newPhoto]);
                };
                reader.readAsDataURL(file);
            }
        } else {
            Toast.fire({
                icon: 'error',
                title: 'You can only add 5 photos',
            });
        }
    };

    const handlePhotoCreate = async (e) => {
        e.preventDefault();
        const primaryPhotos = photos.filter((photo) => photo.is_primary);
        if (primaryPhotos.length !== 1) {
            Toast.fire({
                icon: 'error',
                title: 'Please select one primary photo',
            });
            return;
        }
        setIsLoading(true);
        setUploadProgress(0);
        try {
            for (let progress = 1; progress <= 100; progress++) {
                await new Promise((resolve) => setTimeout(resolve, 5));
                setUploadProgress(progress);
            }
            await axiosClient.post(`/product-photo-upload/${param.id}`, { photos });
            Toast.fire({
                icon: 'success',
                title: 'Photo product successfully added',
            });
            navigate('/product');
        } catch (errors) {
            setIsLoading(false);
            if (errors.response.status === 422) {
                setErrors(errors.response.data.errors);
            }
        }
    };

    const handleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    const handleRemovePhoto = (index) => {
        const updatedPhotos = [...photos];
        updatedPhotos.splice(index, 1);
        setPhotos(updatedPhotos);
    };

    return (
        <>
            <BreadCrumb title={'Add Photo Product'} />
            <div className='border border-slate-100 shadow-md mt-3'>
                <div className={`flex justify-between border py-1 ${isOpenModal ? 'bg-gray-50' : ''}`}>
                    <h2 className='ml-3 text-lg font-semibold text-blue-500 py-2'>Add Photo Product</h2>
                    <button
                        className='flex items-center bg-blue-500 text-white rounded-md my-1 px-2 mr-5 gap-x-1 hover:scale-105'
                        onClick={handleModal}
                    >
                        <BiCommentAdd size={20} />
                        <p>Add</p>
                    </button>
                </div>
                {isOpenModal && (
                    <div>
                        <div className='px-8 mt-4 grid grid-cols-1'>
                            <label htmlFor="photo" className="block text-gray-700">Max 5 photo</label>
                            <label htmlFor="photo" className="block text-gray-700">
                                <div className='flex justify-center'>
                                    <div className='relative border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 w-full'>
                                        <input
                                            type='file'
                                            id='photo'
                                            onChange={handlePhoto}
                                            className='hidden'
                                        />
                                        <div className="flex items-center justify-center text-blue-500 hover:text-blue-700 cursor-pointer">
                                            <MdPhotoCamera size={40} />
                                        </div>
                                    </div>
                                </div>
                            </label>
                            <p>{errors.photo && <span className="text-red-500 text-xs">{errors.photo}</span>}</p>
                        </div>

                        <div className='block sm:flex justify-center'>
                            {photos.map((photo, index) => (
                                <div key={index} className='px-8 my-5 mr-4'>
                                    <img src={photo.photo} alt={`photo ${index + 1}`} className='shadow-lg w-40 h-40 object-cover hover:scale-105 rounded-lg' />
                                    <div className='flex justify-between'>
                                        <label className='block mt-2'>
                                            <input
                                                type='checkbox'
                                                checked={photo.is_primary}
                                                onChange={() => {
                                                    const updatedPhotos = [...photos];
                                                    updatedPhotos[index].is_primary = !photo.is_primary;
                                                    setPhotos(updatedPhotos);
                                                }}
                                            />
                                            Set as primary
                                        </label>
                                        <button
                                            onClick={() => handleRemovePhoto(index)}
                                            className='mt-2 px-2 py-1 bg-red-500 text-white rounded-md hover:scale-105'
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {isLoading && (
                            <div className="mx-14 my-4 flex items-center">
                                <div className="w-full bg-gray-300 rounded-full">
                                    <div
                                        className="h-2 bg-blue-500 rounded-full"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <span className="ml-2 text-blue-500 font-semibold">{uploadProgress}%</span>
                            </div>
                        )}

                        {!isLoading && (
                            <div className='mx-14 my-4 flex justify-end'>
                                <button onClick={handlePhotoCreate} className="px-10 bg-blue-500 text-white p-1 font-bold text-md rounded-md hover:scale-105" type="submit">Upload</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default AddProductPhoto;
