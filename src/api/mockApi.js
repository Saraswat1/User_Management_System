let users = [
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Active', password: 'admin123' },
    { id: 2, name: 'Jane Smith', role: 'User  ', status: 'Active', password: 'user123' },
];

let roles = [
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'User  ', permissions: ['Read'] },
];

export const login = async (username, password) => {
    const user = users.find(user => user.name === username && user.password === password);
    if (!user) {
        throw new Error('Invalid username or password');
    }
    return user;
};

export const signup = async (username, password, role) => {
    const newUser  = { id: users.length + 1, name: username, role, status: 'Active', password };
    users.push(newUser );
    return newUser ;
};

export const getUsers = async () => {
    return new Promise(resolve => setTimeout(() => resolve(users), 500));
};

export const addUser  = async (user) => {
    users.push({ ...user, id: users.length + 1 });
};

export const updateUser  = async (updatedUser ) => {
    users = users.map(user => (user.id === updatedUser .id ? updatedUser  : user));
};

export const deleteUser  = async (id) => {
    users = users.filter(user => user.id !== id);
};

export const getRoles = async () => {
    return new Promise(resolve => setTimeout(() => resolve(roles), 500));
};

export const addRole = async (role) => {
    roles.push({ ...role, id: roles.length + 1 });
};

export const updateRole = async (updatedRole) => {
    roles = roles.map(role => (role.id === updatedRole.id ? updatedRole : role));
};

export const deleteRole = async (id) => {
    roles = roles.filter(role => role.id !== id);
};

// Dummy content function (if needed)
export const getDummyContent = async () => {
    return "This is some dummy content.";
};