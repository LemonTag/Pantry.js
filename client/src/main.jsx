import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Pantry from "./pages/Pantry.jsx";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import Cookbook from "./pages/Cookbook.jsx"

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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);