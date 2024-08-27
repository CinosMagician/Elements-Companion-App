import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Auth from './utils/auth';
import './App.css'
import './assets/fonts/fonts.css';
import { UserProvider } from './utils/UserContext';


// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

// Create a middleware to attach the JWT token to every request
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  const isAuthenticated = Auth.loggedIn();
  return (
    <ApolloProvider client={client}>
      <UserProvider>
          <Header />
          <main className="flex-grow-1 py-4">
            <div className="container">
              <Outlet />
            </div>
          </main>
      </UserProvider>
    </ApolloProvider>
  );};

export default App;
