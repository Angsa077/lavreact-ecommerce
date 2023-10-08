import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Master from '../layouts/Master'
import Dashboard from '../modules/Dashboard'

const ProjectRouter = createBrowserRouter([
    {
        path: '/',
        element: <Master />,
        children: [
            {
                path: '/',
                element: <Dashboard />,
            }
        ]
    }
])


export default ProjectRouter
