import React, { useState } from 'react'

import './App.css';
import { RouterProvider } from 'react-router-dom';
import ProjectRouter from './components/router/ProjectRouter';
import PublicRouter from './components/router/PublicRouter';

function App() {
  const [auth, setAuth] = useState(false);

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
