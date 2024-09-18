import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../utils/UserContext'; // Use the custom hook
import './Header.css';

const Header = () => {
    const { state, setUser } = useMyContext(); // Destructure state and setUser from the context
    const navigate = useNavigate();

    // Log the user object for debugging
    console.log('User object:', state.user);

    const handleDecksClick = () => {
        if (state.isAuthenticated && state.user) {
            const userId = state.user.data ? state.user.data._id : state.user._id; // Access ID correctly
            console.log('Navigating to:', `/decks/${userId}`); // Log the URL being navigated to

            if (userId) {
                navigate(`/decks/${userId}`);
            } else {
                console.error('User ID is missing');
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('id_token');
        navigate('/login');
    };

    // New function to handle general navigation
    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div className='navHeader'>
            <ul>
                <li><button onClick={() => handleNavigate('/')}>Home</button></li>
                <li><button onClick={handleDecksClick}>Decks</button></li>
                <li><button onClick={() => handleNavigate('/calculator')}>Calculator</button></li>
                <li><button onClick={() => handleNavigate('/library')}>Library</button></li>
                <li><button onClick={() => handleNavigate('/random')}>Random</button></li>
                {state.isAuthenticated ? (
                    <li><button onClick={handleLogout}>Logout</button></li>
                ) : (
                    <>
                        <li><button onClick={() => handleNavigate('/login')}>Login</button></li>
                        <li><button onClick={() => handleNavigate('/signup')}>Signup</button></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Header;