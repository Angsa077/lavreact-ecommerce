import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from "../../../axios-client";

const Register = () => {
    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleInput = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axiosClient.post('/register', input)
            .then(res => {
                localStorage.setItem('ACCESS_TOKEN', res.data.token)
                setIsLoading(false)
                window.location.reload()
            }).catch(errors => {
                setIsLoading(false)
                if (errors.response.status == 422) {
                    setErrors(errors.response.data.errors)
                }
            })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-500">
            <div className="w-full p-16 bg-white max-w-sm rounded-lg shadow-md border-t-2">
                <h2 className="text-2xl text-center font-bold mb-2">Register</h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={input.name}
                            onChange={handleInput}
                            placeholder="example@mail.com"
                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : ''
                                }`}
                        />
                        <p>{errors.name && <span className="text-red-500 text-xs">{errors.name}</span>}</p>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            onChange={handleInput}
                            placeholder="example@mail.com"
                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''
                                }`}
                        />
                        <p>{errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}</p>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={input.password}
                            onChange={handleInput}
                            placeholder="********"
                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.password ? 'border-red-500' : ''
                                }`}
                        />
                        <p>{errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}</p>
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            id="password_confirmation"
                            value={input.password_confirmation}
                            onChange={handleInput}
                            placeholder="********"
                            className={`border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 ${errors.password_confirmation ? 'border-red-500' : ''
                                }`}
                        />
                        <p>{errors.password_confirmation && <span className="text-red-500 text-xs">{errors.password_confirmation}</span>}</p>
                    </div>

                    {isLoading &&
                        <button className="bg-blue-500 text-white p-1 px-3 font-bold text-md rounded-md w-full">
                            <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </button>
                    }
                    {!isLoading &&
                        <button className="bg-blue-500 text-white p-1 px-3 font-bold text-md rounded-md w-full" type="submit">Login</button>
                    }

                    <div className='flex justify-start'>
                        <p className='text-xs mx-1'>Have an account?</p>
                        <Link to="/login">
                            <p className='text-blue-500 text-xs'>Login</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
