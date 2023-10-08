import React from 'react'
import {Helmet} from "react-helmet";

const BreadCrumb = (props) => {
    return (
        <>
            <Helmet>
                <title>{props.title} | E Commerce</title>
            </Helmet>

            <div className='flex'>
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <h2 href="#" className="inline-flex items-center text-sm font-medium ">
                            Dashboard
                        </h2>
                    </li>
                    <span className="mx-2 text-gray-400">/</span>
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-blue-500">
                            {props.title}
                        </a>
                    </li>
                </ol>
            </div>
        </>
    )
}

export default BreadCrumb
