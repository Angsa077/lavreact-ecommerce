import React from 'react'
import BreadCrumb from '../partials/BreadCrumb'

const Dashboard = () => {
    return (
        <>
            <BreadCrumb title={'Dashboard'} />
            <div className="grid grid-cols-4 gap-4 mt-5">
                <div className='bg-blue-500 text-white rounded-md text-center p-5 shadow-md hover:scale-105 font-semibold'>Penjualan</div>
                <div className='bg-blue-500 text-white rounded-md text-center p-5 shadow-md hover:scale-105 font-semibold'>Pembelian</div>
                <div className='bg-blue-500 text-white rounded-md text-center p-5 shadow-md hover:scale-105 font-semibold'>Laporan</div>
                <div className='bg-blue-500 text-white rounded-md text-center p-5 shadow-md hover:scale-105 font-semibold'>Ok</div>
            </div >
        </>
    )
}

export default Dashboard
