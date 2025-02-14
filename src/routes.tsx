import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";
import NewCategory from "./pages/NewCategory";

// Transaction Pages
import NewTransaction from "./pages/transactions/New";
import ListTransactions from "./pages/transactions/List";
import ViewTransaction from "./pages/transactions/View";
import EditTransaction from "./pages/transactions/Edit";

// Auth pages
import SignIn from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/new-category", element: <NewCategory /> },
      { path: "/transactions/", element: <ListTransactions /> },
      { path: "/transactions/new", element: <NewTransaction /> },
      { path: "/transactions/:id", element: <ViewTransaction /> },
      { path: "/transactions/:id/edit", element: <EditTransaction /> },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default routes;
