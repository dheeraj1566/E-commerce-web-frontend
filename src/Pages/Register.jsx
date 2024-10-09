import React, { useState } from 'react';

const LoginRegister = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => setIsLogin(!isLogin);

    return (
        <div className="container mt-4">
            <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" required />
                </div>
                {!isLogin && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" required />
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-primary">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" className="btn btn-link" onClick={toggleForm}>
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
            </form>
        </div>
    );
};

export default LoginRegister;
