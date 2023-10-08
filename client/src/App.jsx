import React, { useEffect, useState } from 'react'

import './App.css';
import { RouterProvider } from 'react-router-dom';
import ProjectRouter from './components/router/ProjectRouter';
import PublicRouter from './components/router/PublicRouter';
import axios from 'axios';

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (localStorage.token != null) {
      setAuth(true)
      axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
    }
  }, [])

  return (
    <>
      {
        auth ?
          <RouterProvider router={ProjectRouter} /> :
          <RouterProvider router={PublicRouter} />
      }
    </>
  );
}

export default App
