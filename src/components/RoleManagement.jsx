import React, { useEffect, useState } from 'react';
import { getRoles, addRole, updateRole, deleteRole } from '../api/mockApi';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [newRole, setNewRole] = useState({ name: '', permissions: [] });
    const [editingRole, setEditingRole] = useState(null);

    useEffect(() => {
        const fetchRoles = async () => {
            const roleList = await getRoles();
            setRoles(roleList);
        };
        fetchRoles();
    }, []);

    const handleAddRole = async (e) => {
        e.preventDefault();
        await addRole(newRole);
        setNewRole({ name: '', permissions: [] });
        const updatedRoles = await getRoles();
        setRoles(updatedRoles);
    };

    const handleEditRole = async (role) => {
        setEditingRole(role);
        setNewRole(role);
    };

    const handleUpdateRole = async (e) => {
        e.preventDefault();
        await updateRole(newRole);
        setEditingRole(null);
        setNewRole({ name: '', permissions: [] });
        const updatedRoles = await getRoles();
        setRoles(updatedRoles);
    };

    const handleDeleteRole = async (id) => {
        await deleteRole(id);
        const updatedRoles = await getRoles();
        setRoles(updatedRoles);
    };

    return (
        <div className="container mx-auto mt-5 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Role Management</h2>
            <form onSubmit={editingRole ? handleUpdateRole : handleAddRole}>
                <div className="mb-4">
                    <label className="block text-gray-700">Role Name:</label>
                    <input
                        type="text"
                        value={newRole.name}
                        onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Permissions:</label>
                    <input
                        type="text"
                        value={newRole.permissions.join(', ')}
                        onChange={(e) => setNewRole({ ...newRole, permissions: e.target.value.split(',').map(p => p.trim()) })}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                        placeholder="Comma separated permissions"
                    />
                </div>
                <button type ="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {editingRole ? 'Update Role' : 'Add Role'}
                </button>
            </form>
            <h3 className="text-xl mt-6">Role List</h3>
            <ul className="mt-4">
                {roles.map(role => (
                    <li key={role.id} className="flex justify-between items-center border-b py-2">
                        <span>{role.name} - Permissions: {role.permissions.join(', ')}</span>
                        <div>
                            <button onClick={() => handleEditRole(role)} className="text-blue-500 mr-2">Edit</button>
                            <button onClick={() => handleDeleteRole(role.id)} className="text-red-500">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoleManagement;