import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-light text-center py-3">
            <p>&copy; {new Date().getFullYear()} MyStore. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
