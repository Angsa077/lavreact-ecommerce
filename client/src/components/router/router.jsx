import { createBrowserRouter } from "react-router-dom";

// router master
import Master from '../layouts/Master'
import Dashboard from '../modules/Dashboard'
import Users from '../modules/Users'

// router auth
import AuthLayout from '../layouts/AuthLayout'
import Login from '../modules/auth/Login'
import NotFound from '../modules/NotFound'
import Register from "../modules/auth/Register";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Master />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            },
            {
                path: '/users',
                element: <Users />,
            },
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element: <Register />,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />,
    }
])

export default router