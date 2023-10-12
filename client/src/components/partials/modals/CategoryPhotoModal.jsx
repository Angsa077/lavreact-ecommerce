import React from 'react'

const CategoryPhotoModal = ({ photoUrl, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
            <div className="bg-white mx-auto p-4 rounded-lg shadow-lg z-50">
                <img src={photoUrl} className='w-64 h-64' alt="Modal Photo" />
            </div>
        </div>
    );
}

export default CategoryPhotoModal
