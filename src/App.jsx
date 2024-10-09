// src/App.jsx
import React from 'react'; 
import { Outlet } from 'react-router-dom';
import Header from './Pages/Header';
import Footer from './Pages/Footer';
import { CartProvider } from './context/CartContext';

const App = () => {
    return (
        <CartProvider>
            <Header />
            <main className="container mt-4">
                <Outlet /> 
            </main>
            <Footer />
        </CartProvider>
    );
};

export default App;
