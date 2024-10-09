import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext'; // Adjust the path as needed

const Home = () => {
    const { addToCart } = useContext(CartContext); // Use the CartContext
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expandedProductIds, setExpandedProductIds] = useState([]); // Track expanded products
    const [successMessage, setSuccessMessage] = useState(''); // State for success message

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/product');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');jj
                }
                const data = await response.json();
                const inStock = data.filter(product => product.inStock);
                setFeaturedProducts(inStock);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const toggleDescription = (productId) => {
        setExpandedProductIds((prevIds) =>
            prevIds.includes(productId)
                ? prevIds.filter((id) => id !== productId) // Collapse the product
                : [...prevIds, productId] // Expand the product
        );
    };

    const handleAddToCart = (product) => {
        addToCart(product); // Add product to cart
        setSuccessMessage('Product added successfully!'); // Set success message

        // Clear the message after 3 seconds
        setTimeout(() => {
            setSuccessMessage('');
        }, 3000);
    };

    if (loading) {
        return <div className="text-center"><div className="spinner-border" role="status"></div></div>;
    }

    if (error) {
        return <p className="text-danger text-center">Error: {error}</p>;
    }

    return (
        <div className="container mt-4">
            {/* Display the success message as a Bootstrap alert */}
            {successMessage && (
                <div className="custom-alert alert alert-success text-center" role="alert">
                    {successMessage}
                </div>
            )}
            <h2 className="text-center mb-4">Featured Products</h2>
            {featuredProducts.length > 0 ? (
                <div className="row">
                    {featuredProducts.map((product) => {
                        const isExpanded = expandedProductIds.includes(product.id);
                        return (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card border-primary shadow-sm" style={{ height: '400px', width: '100%' }}>
                                    {product.url && (
                                        <img
                                            src={product.url}
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
                                        <button 
                                            className="btn btn-success" 
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text-center">No featured products available.</p>
            )}
        </div>
    );
};

export default Home;
