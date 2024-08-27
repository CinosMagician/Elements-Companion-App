import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

    return (
        <div className='navHeader'>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><button onClick={handleDecksClick}>Decks</button></li>
                <li><Link to="/calculator">Calculator</Link></li>
                <li><Link to="/library">Library</Link></li>
                <li><Link to="/random">Random</Link></li>
                {state.isAuthenticated ? (
                    <li><button onClick={handleLogout}>Logout</button></li>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Header;
