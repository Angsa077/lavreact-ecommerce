import { createBrowserRouter } from "react-router-dom";

// router master
import Master from '../layouts/Master'
import Dashboard from '../modules/Dashboard'
import Users from '../modules/Users'
import AddCategory from '../modules/category/AddCategory'

// router auth
import AuthLayout from '../layouts/AuthLayout'
import Login from '../modules/auth/Login'
import NotFound from '../modules/NotFound'
import Register from "../modules/auth/Register";
import CategoryList from "../modules/category/CategoryList";
import EditCategory from "../modules/category/EditCategory";

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
            {
                path: '/category',
                element: <CategoryList />,
            },
            {
                path: '/category/create',
                element: <AddCategory />,
            },
            {
                path: '/category/edit/:id',
                element: <EditCategory />,
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