// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useMyContext } from '../utils/UserContext'; // Use the custom hook
// import './Header.css';

// const Header = () => {
//     const { state, setUser } = useMyContext(); // Destructure state and setUser from the context
//     const navigate = useNavigate();

//     // Log the user object for debugging
//     console.log('User object:', state.user);

//     const handleDecksClick = () => {
//         if (state.isAuthenticated && state.user) {
//             const userId = state.user.data ? state.user.data._id : state.user._id; // Access ID correctly
//             console.log('Navigating to:', `/decks/${userId}`); // Log the URL being navigated to

//             if (userId) {
//                 navigate(`/decks/${userId}`);
//             } else {
//                 console.error('User ID is missing');
//                 navigate('/login');
//             }
//         } else {
//             navigate('/login');
//         }
//     };

//     const handleLogout = () => {
//         setUser(null);
//         localStorage.removeItem('id_token');
//         navigate('/login');
//     };

//     // New function to handle general navigation
//     const handleNavigate = (path) => {
//         navigate(path);
//     };

//     return (
//         <div className='navHeader'>
//             <ul>
//                 <li><button onClick={() => handleNavigate('/')}>Home</button></li>
//                 <li><button onClick={handleDecksClick}>Decks</button></li>
//                 <li><button onClick={() => handleNavigate('/calculator')}>Calculator</button></li>
//                 <li><button onClick={() => handleNavigate('/library')}>Library</button></li>
//                 <li><button onClick={() => handleNavigate('/random')}>Random</button></li>
//                 {state.isAuthenticated ? (
//                     <li><button onClick={handleLogout}>Logout</button></li>
//                 ) : (
//                     <>
//                         <li><button onClick={() => handleNavigate('/login')}>Login</button></li>
//                         <li><button onClick={() => handleNavigate('/signup')}>Signup</button></li>
//                     </>
//                 )}
//             </ul>
//         </div>
//     );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useMyContext } from '../utils/UserContext'; // Use the custom hook
import { motion, AnimatePresence } from 'framer-motion';
import './NavTabs.css';

const NavTabs = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { state, setUser } = useMyContext(); // Destructure state and setUser from the context
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleMenuToggle = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  // Handle navigation for Decks
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

  // Menu options
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Decks', onClick: handleDecksClick }, // Remove path and use only onClick handler
    { name: 'Calculator', path: '/calculator' },
    { name: 'Library', path: '/library' },
    { name: 'Random Effects', path: '/random' },
  ];

  const authItems = state.isAuthenticated
    ? [{ name: 'Logout', onClick: handleLogout }]
    : [
        { name: 'Login', path: '/login' },
        { name: 'Sign Up', path: '/signup' },
      ];

  const currentPage = localStorage.getItem('currentPage');

  // Animation variants for menu dropdown
  const navVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <nav className="nav-container">
      {/* Hamburger menu button */}
      <button className="menu-button" onClick={handleMenuToggle}>
        &#9776;
      </button>

      {/* Top navigation bar */}
      <ul className={`nav ${isMenuOpen ? 'hide' : 'show'}`}>
        {menuItems.map(item => (
          <li key={item.name} className="nav-item">
            {item.onClick ? (
              // If there's an onClick handler, make the link only interactive via onClick
              <a
                className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
                onClick={item.onClick} // Attach the onClick handler
              >
                {item.name}
              </a>
            ) : (
              // Regular navigation links
              <Link
                to={item.path}
                className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
        {authItems.map(item => (
          <li key={item.name} className="nav-item">
          {item.onClick ? (
            // If there's an onClick handler, make the link only interactive via onClick
            <a
              className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
              onClick={item.onClick} // Attach the onClick handler
            >
              {item.name}
            </a>
          ) : (
            // Regular navigation links
            <Link
              to={item.path}
              className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
            >
              {item.name}
            </Link>
          )}
        </li>
        ))}
      </ul>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="dropdown-menu"
            variants={navVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <ul className="nav">
              {menuItems.map(item => (
                <li key={item.name} className="nav-item">
                  {item.onClick ? (
                    <a
                      className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
                      onClick={() => {
                        item.onClick();
                        setIsMenuOpen(false); // Close the menu after clicking
                      }}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.path}
                      className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
                      onClick={() => setIsMenuOpen(false)} // Close menu after selection
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
              {authItems.map(item => (
                <li key={item.name} className="nav-item">
                {item.onClick ? (
                  <a
                    className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
                    onClick={() => {
                      item.onClick();
                      setIsMenuOpen(false); // Close the menu after clicking
                    }}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.path}
                    className={currentPage === item.name ? 'nav-link active' : 'nav-link'}
                    onClick={() => setIsMenuOpen(false)} // Close menu after selection
                  >
                    {item.name}
                  </Link>
                )}
              </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavTabs;
