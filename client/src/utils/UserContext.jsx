import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import Auth from "./auth";

// Create the context
const UserContext = createContext();

// Initial state
const initialState = {
  user: Auth.getProfile() || null,
  isAuthenticated: Auth.loggedIn(),
  error: null,
  loading: false,
};

// Provider component
const UserProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  // Function to update state
  const updateState = (newState) => {
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  // Specific update functions
  const setUser = (user) => updateState({ user, isAuthenticated: !!user });
  const setError = (error) => updateState({ error });
  const setLoading = (loading) => updateState({ loading });

  // Value to be provided to consumers
  const value = {
    state,
    setUser,
    setError,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// PropTypes for the provider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the context
const useMyContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useMyContext must be used within a UserProvider");
  }
  return context;
};

export { UserProvider, useMyContext };
