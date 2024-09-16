import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client'; // Import ApolloClient setup
import App from "./App.jsx";
import "./index.css";
import Error from "./components/Error.jsx";
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Decks from './pages/Decks';
import Library from './pages/Library';
import HardLibrary from './pages/HardcodeLibrary';
import RandomEffects from './pages/Random';
import CardDetails from './pages/CardDetails';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import DeckEdit from "./pages/DeckEdit.jsx";
import DeckCreate from "./pages/DeckCreate.jsx";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: import.meta.env.VITE_REACT_APP_GRAPHQL_ENDPOINT ?? 'http://localhost:3001/graphql', // Replace with your GraphQL server URI
  cache: new InMemoryCache(),
});

// Define your router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "calculator",
        element: <Calculator />,
      },
      {
        path: "decks/:userId",
        element: <Decks />,
      },
      {
        path: "decks/:userId/create",
        element: <DeckCreate />,
      },
      {
        path: "decks/:userId/:deckId",
        element: <DeckEdit />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "hardlibrary",
        element: <HardLibrary />,
      },
      {
        path: "random",
        element: <RandomEffects />,
      },
      {
        path: 'card/:id',
        element: <CardDetails />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      }
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <RouterProvider router={router} />
  </ApolloProvider>
);