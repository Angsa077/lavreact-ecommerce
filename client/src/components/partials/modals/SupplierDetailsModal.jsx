import React, { useEffect, useState } from 'react'
import { getProvinceById, getRegencyById, getDistrictById, getVillageById } from '../../partials/miniComponent/APIWilayah';

const SupplierDetailsModal = ({ supplierDetails, onClose }) => {
    const [provinceName, setProvinceName] = useState('');
    const [regencyName, setRegencyName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [villageName, setVillageName] = useState('');

    useEffect(() => {
        if (supplierDetails.provinceId) {
            getProvinceById(supplierDetails.provinceId)
                .then((res) => {
                    setProvinceName(res.name);
                })
                .catch((error) => {
                    console.error('Error fetching province data:', error);
                });
        }
    }, [supplierDetails.provinceId]);
    

    useEffect(() => {
        if (supplierDetails.regencyId) {
            getRegencyById(supplierDetails.regencyId)
                .then(res => {
                    setRegencyName(res.name);
                })
                .catch((error) => {
                    console.error('Error fetching regency data: ', error);
                });
        }
    }, [supplierDetails.regencyId]);

    useEffect(() => {
        if (supplierDetails.districtId) {
            getDistrictById(supplierDetails.districtId)
                .then(res => {
                    setDistrictName(res.name);
                })
                .catch((error) => {
                    console.error('Error fetching district data: ', error);
                });
        }
    }, [supplierDetails.districtId]);

    useEffect(() => {
        if (supplierDetails.villageId) {
            getVillageById(supplierDetails.villageId)
                .then(res => {
                    setVillageName(res.name);
                })
                .catch((error) => {
                    console.error('Error fetching village data: ', error);
                });
        }
    }, [supplierDetails.villageId]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-60" onClick={onClose}></div>
            <div className="bg-white rounded-xl shadow-lg z-50 max-w-md w-full mx-4">
                <div className="text-lg font-semibold bg-blue-500 text-white py-2">
                    <span className='px-5'>Supplier Details</span>
                </div>
                <div className='px-5 py-3'>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Id</p>
                        <p className="w-4/6">{supplierDetails.id}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Name</p>
                        <p className="w-4/6">{supplierDetails.name}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Phone</p>
                        <p className="w-4/6">{supplierDetails.phone}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Email</p>
                        <p className="w-4/6">{supplierDetails.email}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Description</p>
                        <p className="w-4/6">{supplierDetails.description}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Status</p>
                        <p className={supplierDetails.status === 'Active' ? 'text-green-500' : 'text-red-500'}>
                            {supplierDetails.status}
                        </p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Address</p>
                        <p className="w-4/6">{supplierDetails.address}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Province</p>
                        <p className="w-4/6">{provinceName}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Regency</p>
                        <p className="w-4/6">{regencyName}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">District</p>
                        <p className="w-4/6">{districtName}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Village</p>
                        <p className="w-4/6">{villageName}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Created By</p>
                        <p className="w-4/6">{supplierDetails.created_by}</p>
                    </div>
                    <div className="flex w-full mb-2 border hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Created At</p>
                        <p className="w-4/6">{supplierDetails.created_at}</p>
                    </div>
                    <div className="flex w-full mb-2 border bg-slate-100 hover:bg-blue-500 hover:text-white hover:scale-125 hover:rounded-lg">
                        <p className="font-semibold text-sm w-2/6">Updated At</p>
                        <p className="w-4/6">{supplierDetails.updated_at}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SupplierDetailsModal
