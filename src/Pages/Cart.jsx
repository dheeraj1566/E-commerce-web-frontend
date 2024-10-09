import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart } = useContext(CartContext);
    const [expandedProductIds, setExpandedProductIds] = useState([]); // Track expanded products

    const toggleDescription = (productId) => {
        setExpandedProductIds((prevIds) =>
            prevIds.includes(productId)
                ? prevIds.filter((id) => id !== productId) // Collapse the product
                : [...prevIds, productId] // Expand the product
        );
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Your Cart</h2>

            {cart.length > 0 ? (
                <div className="row">
                    {cart.map((product) => {
                        const isExpanded = expandedProductIds.includes(product.id);
                        return (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card border-primary shadow-sm" style={{ height: '350px', width: '100%' }}>
                                    {product.image && (
                                        <img 
                                            src={product.image} 
                                            alt={product.name} 
                                            className="card-img-top" 
                                            style={{ maxHeight: '150px', objectFit: 'cover' }} // Adjust image height
                                        />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        {/* Show either a short or full description based on the toggle */}
                                        <p className="card-text">
                                            {isExpanded ? product.description : `${product.description.substring(0, 50)}...`}
                                        </p>
                                        <button
                                            className="btn btn-link"
                                            onClick={() => toggleDescription(product.id)}
                                        >
                                            {isExpanded ? 'Read Less' : 'Read More'}
                                        </button>
                                        <p className="card-text fw-bold">Price: ${product.price}</p>
                                        {/* Remove from Cart Button */}
                                        <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>
                                            Remove from Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
