import React from 'react'
import BreadCrumb from '../partials/BreadCrumb'

const Users = () => {
    return (
        <div>
            <BreadCrumb title={'Users'} />
            <div className='flex justify-center items-center'>
                <h1 className='text-4xl text-center'>Users</h1>
            </div>
        </div>
    )
}

export default Users
