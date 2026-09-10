import { useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import Auth from './utils/auth';
import './App.css'
import './fonts.css';
import { UserProvider } from './utils/UserContext';
import NavTabs from './components/Header';


// Create an HTTP link to the GraphQL server
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT ?? 'http://localhost:3001/graphql',
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
  const location = useLocation();

  const isGame = location.pathname.startsWith('/game');

  console.log(isGame)

  useEffect(() => {
    const hoverSound = new Audio("/assets/images/cardArt/sounds/15.mp3");
    const clickSound = new Audio("/assets/images/cardArt/sounds/17.mp3");

    const handleMouseOver = (e) => {
      const element = e.target.closest('a, button');

      if (!element) return;

      // Prevent sound from firing when moving between children
      if (element.contains(e.relatedTarget)) return;

      hoverSound.currentTime = 0;
      hoverSound.play();
    };

    const handleClick = (e) => {
      const element = e.target.closest('a, button');

      if (!element) return;

      clickSound.currentTime = 0;
      clickSound.play();
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        {!isGame && <NavTabs />}

        <main className="flex-grow-1 py-4">
          <div className="container">
            <Outlet />
          </div>
        </main>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;