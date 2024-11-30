import React, { useState } from 'react';
import { signup } from '../api/mockApi'; // Import the signup function from your mock API

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User '); // Default role
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newUser  = await signup(username, password, role);
            setSuccess('Signup successful! You can now log in.');
            setError('');
            onSignup(newUser ); // Call the onSignup prop to handle the new user
        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role:</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="User ">User </option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;