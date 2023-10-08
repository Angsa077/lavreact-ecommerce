import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const [input, setInput] = useState({
        email: '',
        password: ''
    });

    const handleInput = (e) => {
        setInput(prevState => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
        console.log(input)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', input)
            .then(res => {
                console.log(res.data)
            })
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-blue-500">
            <div className="w-full p-16 bg-white max-w-sm rounded-lg shadow-md border-t-2">
                <h2 className="text-2xl text-center font-bold mb-2">Login</h2>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={input.email}
                            onChange={handleInput}
                            placeholder="example@mail.com"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={input.password}
                            onChange={handleInput}
                            placeholder="********"
                            className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <button className="bg-blue-500 text-white p-1 px-3 font-bold text-md rounded-md w-full" type="submit">Login</button>
                    <div className='flex justify-start'>
                        <p className='text-xs mx-1'>Don't have an account?</p>
                        <Link to="/signup">
                            <p className='text-blue-500 text-xs'>Sign Up</p>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
