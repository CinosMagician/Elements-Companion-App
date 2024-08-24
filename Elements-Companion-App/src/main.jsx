import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from './pages/Home';
import Calculator from './pages/Calculator';
import Decks from './pages/Decks';
import Library from './pages/Library';
import Random from './pages/Random';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "home",
        element: <Home />,
      },
      {
        path: "calculator",
        element: <Calculator />,
      },
      {
        path: "decks",
        element: <Decks />,
      },
      {
        path: "library",
        element: <Library />,
      },
      {
        path: "random",
        element: <Random />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
