import React, { useEffect, useState } from 'react';
import { getUsers, addUser , updateUser , deleteUser  } from '../api/mockApi';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [newUser , setNewUser ] = useState({ name: '', role: '', status: 'Active' });
    const [editingUser , setEditingUser ] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const userList = await getUsers();
            setUsers(userList);
        };
        fetchUsers();
    }, []);

    const handleAddUser  = async (e) => {
        e.preventDefault();
        await addUser (newUser );
        setNewUser ({ name: '', role: '', status: 'Active' });
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    };

    const handleEditUser  = async (user) => {
        setEditingUser (user);
        setNewUser (user);
    };

    const handleUpdateUser  = async (e) => {
        e.preventDefault();
        await updateUser (newUser );
        setEditingUser (null);
        setNewUser ({ name: '', role: '', status: 'Active' });
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    };

    const handleDeleteUser  = async (id) => {
        await deleteUser (id);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
    };

    return (
        <div className="container mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">User  Management</h2>
            <form onSubmit={editingUser  ? handleUpdateUser  : handleAddUser }>
                <div className="mb-4">
                    <label className="block text-gray-700">Name:</label>
                    <input
                        type="text"
                        value={newUser .name}
                        onChange={(e) => setNewUser ({ ...newUser , name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Role:</label>
                    <input
                        type="text"
                        value={newUser .role}
                        onChange={(e) => setNewUser ({ ...newUser , role: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status:</label>
                    <select
                        value={newUser .status}
                        onChange={(e) => setNewUser ({ ...newUser , status: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editingUser  ? 'Update User' : 'Add User'}
                </button>
            </form>
            <h3 className="text-xl mt-6">User  List</h3>
            <ul className="mt-4">
                {users.map(user => (
                    <li key={user.id} className="flex justify-between items-center border-b py-2">
                        <span>{user.name} - {user.role} ({user.status})</span>
                        <div>
                            <button onClick={() => handleEditUser (user)} className="text-blue-500 mr-2">Edit</button>
                            <button onClick={() => handleDeleteUser (user.id)} className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;