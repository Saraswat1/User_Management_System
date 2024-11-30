import React from 'react';

const Navbar = ({ onLogout, user }) => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-lg">User  Management System</h1>
                {user && (
                    <div>
                        <span className="text-white mr-4">Welcome, {user.name}</span>
                        <button onClick={onLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;