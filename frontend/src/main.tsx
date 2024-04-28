import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import NotFound from './pages/errors/NotFound.tsx'
import Root from './pages/Root.tsx'
import Create from './pages/Create.tsx'
import Login from './pages/auth/Login.tsx'
import Register from './pages/auth/Register.tsx'
import ServerError from './pages/errors/ServerError.tsx'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/create', element: <Create /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
    { path: '/500', element: <ServerError /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
