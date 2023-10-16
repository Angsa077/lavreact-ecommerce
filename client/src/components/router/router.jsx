import { createBrowserRouter } from "react-router-dom";

// router master
import Master from '../layouts/Master'
import Dashboard from '../modules/Dashboard'
import Users from '../modules/Users'
import CategoryList from "../modules/category/CategoryList";
import AddCategory from '../modules/category/AddCategory'
import EditCategory from "../modules/category/EditCategory";
import SubCategoryList from "../modules/subCategory/SubCategoryList";
import AddSubCategory from "../modules/subCategory/AddSubCategory";
import EditSubCategory from "../modules/subCategory/EditSubCategory";
import BrandList from "../modules/brand/BrandList";
import AddBrand from "../modules/brand/AddBrand";
import EditBrand from "../modules/brand/EditBrand";
import SupplierList from "../modules/supplier/SupplierList";
import AddSupplier from "../modules/supplier/AddSupplier";
import EditSupplier from "../modules/supplier/EditSupplier";
import Attribute from "../modules/attribute/Attribute";
import AddProduct from "../modules/product/AddProduct";

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
            {
                path: '/sub-category',
                element: <SubCategoryList />,
            },
            {
                path: '/sub-category/create',
                element: <AddSubCategory/>,
            },
            {
                path: '/sub-category/edit/:id',
                element: <EditSubCategory />,
            },
            {
                path: '/brand',
                element: <BrandList />,
            },
            {
                path: '/brand/create',
                element: <AddBrand />,
            },
            {
                path: '/brand/edit/:id',
                element: <EditBrand />,
            },
            {
                path: '/supplier',
                element: <SupplierList />,
            },
            {
                path: '/supplier/create',
                element: <AddSupplier />,
            },
            {
                path: '/supplier/edit/:id',
                element: <EditSupplier />,
            },
            {
                path: '/attribute',
                element: <Attribute />,
            },
            {
                path: '/product/create',
                element: <AddProduct />,
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