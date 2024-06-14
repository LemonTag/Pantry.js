import ReactDOM from "react-dom/client";
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline, ThemeProvider } from '@mui/material';
import App from "./App.jsx";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Pantry from "./pages/Pantry.jsx";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Cookbook from "./pages/Cookbook.jsx"
import TipJar from "./pages/TipJar.jsx";
import theme from './utils/theme.js';
import Favorites from './pages/Favorites.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/pantry",
        element: <Pantry/>
      },
      {
        path: "/cookbook",
        element: <Cookbook/>
      },
      {
        path: "/tipjar",
        element: <TipJar/>
      },
      {
        path: "/Favorites",
        element: <Favorites/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);