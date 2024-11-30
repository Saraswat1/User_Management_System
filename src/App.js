import React, { useState } from 'react';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import UserProfile from './components/UserProfile'; // Ensure this import is correct

const App = () => {
    const [user, setUser ] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const handleLogin = (loggedInUser ) => {
        setUser (loggedInUser );
        setIsAdmin(loggedInUser .role === 'Admin');
    };

    const handleLogout = () => {
        setUser (null);
        setIsAdmin(false);
    };

    const handleSignup = (newUser ) => {
        setUser (newUser );
        setIsAdmin(newUser .role === 'Admin');
        setShowSignup(false);
    };

    return (
        <div className="App">
            <Navbar onLogout={handleLogout} user={user} />
            {user ? (
                <>
                    {isAdmin ? (
                        <>
                            <UserManagement />
                            <RoleManagement />
                        </>
                    ) : (
                        <UserProfile user={user} /> // Use UserProfile component correctly
                    )}
                </>
            ) : (
                <>
                    {showSignup ? (
                        <Signup onSignup={handleSignup} />
                    ) : (
                        <Login onLogin={handleLogin} />
                    )}
                    <button onClick={() => setShowSignup(!showSignup)} className="mt-4">
                        {showSignup ? 'Already have an account? Log in' : 'Create an account'}
                    </button>
                </>
            )}
        </div>
    );
};

export default App;