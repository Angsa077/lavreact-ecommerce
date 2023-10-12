import React from 'react';

const CategoryDetailsModal = ({ categoryDetails, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-60" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-lg z-50 max-w-md w-full mx-4">
                <div className="text-lg font-semibold bg-blue-500 text-white py-2">
                    <span className='px-5'>Category Details</span>
                </div>
                <div className='px-5 py-3'>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Id</p>
                        <p className="w-4/6">{categoryDetails.id}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Name</p>
                        <p className="w-4/6">{categoryDetails.name}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Slug</p>
                        <p className="w-4/6">{categoryDetails.slug}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Description</p>
                        <p className="w-4/6">{categoryDetails.description}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Serial</p>
                        <p className="w-4/6">{categoryDetails.serial}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Status</p>
                        <p className={categoryDetails.status === 'Active' ? 'text-green-500' : 'text-red-500'}>
                            {categoryDetails.status}
                        </p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Created By</p>
                        <p className="w-4/6">{categoryDetails.created_by}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Created At</p>
                        <p className="w-4/6">{categoryDetails.created_at}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Updated At</p>
                        <p className="w-4/6">{categoryDetails.updated_at}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetailsModal;
