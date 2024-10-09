import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; 
import Home from './pages/Home';
import Products from './pages/Products';
import LoginRegister from './pages/Register';
import Cart from './Cart';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, 
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'products', 
                element: <Products />,
            },
            {
                path: 'login',
                element: <LoginRegister />,
            },
            {
                path: 'home', 
                element: <Home />,
            },
            {
                path: 'cart', 
                element: <Cart />,
            },
        ],
    },
]);

export default router;
