import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import axiosClient from "../../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

//icons
import { FiMenu, FiBox } from 'react-icons/fi';
import { BsBoxes } from 'react-icons/bs';
import { LuLayoutDashboard } from 'react-icons/lu';
import { TfiUser } from 'react-icons/tfi';
import { IoMdArrowDropright, IoMdArrowDropdown } from 'react-icons/io';
import { FaCircle } from 'react-icons/fa';

const Master = () => {
    const { user, token, setUser, setToken } = useStateContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(null);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const navigate = useNavigate();
    const locations = useLocation();

    if (!token) {
        return <Navigate to="/login" />
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSubMenu = (index) => {
        setIsSubMenuOpen(isSubMenuOpen === index ? null : index);
    };

    const toggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2196F3',
            cancelButtonColor: '#F44336',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.post('/logout')
                    .then(res => {
                        setUser({})
                        setToken(null)
                        navigate('/login')
                    })
                    .catch(err => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: err.response.data.message,
                        })
                    })
            }
        })
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data)
            })
    }, [])

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full shadow-md bg-white">
                <div className="px-3 py-1 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center p-2 text-sm text-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <FiMenu className="w-6 h-6" />
                            </button>
                            <Link to={'/'} className="flex ml-2 md:mr-24">
                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap text-blue-500">
                                    E Commerce
                                </span>
                            </Link>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={toggleProfile}
                            >
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src="https://res.cloudinary.com/dzm4joz1v/image/upload/v1695884510/assets/drchip/user-notfound_m1pjci.png"
                                    alt="user photo"
                                />
                            </button>

                            {/* User Dropdown Content */}
                            <div className={`z-50 ${isProfileOpen ? 'translate-x-0 mr-2' : 'translate-x-full'} my-4 bg-white rounded-md shadow-md border-t-2 absolute right-0 transition-transform`}>
                                <div className="px-4 text-right my-3">
                                    <p className="text-gray-800 font-semibold">
                                        {user.name}
                                    </p>
                                    <p className="text-gray-600">
                                        {user.email}
                                    </p>
                                    <button
                                        className='bg-blue-500 px-3 py-1 mt-3 rounded-lg text-white hover:scale-105 hover:font-bold'
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className={`fixed top-10 left-0 z-40 w-64 h-screen pt-7 transition-transform ${isMenuOpen ? '-translate-x-0 sm:-translate-x-full' : '-translate-x-full sm:-translate-x-0'
                } text-white shadow-md bg-blue-500`} >
                <div className="h-full px-3 pb-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        {/* sidebar items */}
                        {[
                            { label: 'Dashboard', to: '/', icons: <LuLayoutDashboard /> },
                            { label: 'Users', to: '/users', icons: <TfiUser /> },
                            {
                                label: 'Category',
                                icons: <FiBox />,
                                arrowDropdownRight: <IoMdArrowDropright />,
                                arrowDropdownDown: <IoMdArrowDropdown />,
                                submenu: [
                                    { label: 'Category List', to: '/category', icons: <FaCircle /> },
                                    { label: 'Add Category', to: '/category/create', icons: <FaCircle /> },
                                ],
                            },
                            {
                                label: 'Sub Category',
                                icons: <BsBoxes />,
                                arrowDropdownRight: <IoMdArrowDropright />,
                                arrowDropdownDown: <IoMdArrowDropdown />,
                                submenu: [
                                    { label: 'Sub Category List', to: '/sub-category', icons: <FaCircle /> },
                                    { label: 'Add Sub Category', to: '/sub-category/create', icons: <FaCircle /> },
                                ],
                            },
                        ].map((item, index) => (
                            <li
                                key={index}
                                className={`transform transition-all hover:scale-105 hover:font-bold hover:bg-white hover:text-blue-500 hover:rounded-md ${locations.pathname === item.to
                                    ? 'bg-white text-blue-500 rounded-md' : ''}`}>
                                {item.submenu ? (
                                    <button
                                        onClick={() => {
                                            toggleSubMenu(index);
                                        }}
                                        className="flex items-center ml-3 gap-3 py-2 w-full focus:outline-none"
                                    >
                                        {item.icons}
                                        <span>{item.label}</span>
                                        <p className="ml-auto mx-5">
                                            {isSubMenuOpen === index ? item.arrowDropdownDown : item.arrowDropdownRight}
                                        </p>

                                    </button>
                                ) : (
                                    <Link to={item.to} className="flex items-center ml-3 gap-3 py-2 w-full">
                                        {item.icons}
                                        <span>{item.label}</span>
                                    </Link>
                                )}
                                {item.submenu && isSubMenuOpen === index && (
                                    <ul>
                                        {item.submenu.map((subItem, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className={`hover:bg-blue-800 hover:text-white  ${locations.pathname === subItem.to ? 'bg-white text-blue-500 rounded-md' : ''}`}
                                            >
                                                <Link to={subItem.to} className="flex items-center ml-10 gap-3 py-2">
                                                    <p className="text-xs">{subItem.icons}</p>
                                                    <span className="text-sm">{subItem.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Main */}
            <main className={`transition-transform p-4 mt-5 ${isMenuOpen ? '' : 'sm:ml-64'}`}>
                <div className="p-4 mt-10">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

export default Master
