import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const CategoryPhotoModal = ({ photoUrl, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="modal-container bg-white mx-auto p-4 rounded-lg shadow-lg z-50">
                {/* <button className="absolute top-0 right-0 m-5" onClick={onClose}>
                    <AiOutlineClose className='text-2xl font-bold bg-white p-1 rounded-full hover:scale-105 text-red-500' />
                </button> */}
                <img src={photoUrl} className='w-64 h-64' alt="Modal Photo" />
            </div>
        </div>
    );
}

export default CategoryPhotoModal
