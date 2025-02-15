import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";

import Dashboard from "./pages/Dashboard";

// Transaction Pages
import NewTransaction from "./pages/transactions/New";
import ListTransactions from "./pages/transactions/List";
import ViewTransaction from "./pages/transactions/View";
import EditTransaction from "./pages/transactions/Edit";

// Categories
import ListCategories from "./pages/categories/List";
import NewCategories from "./pages/categories/New";

// Auth pages
import SignIn from "./pages/authentication/SignIn";
import SignUp from "./pages/authentication/SignUp";

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
      { path: "/transactions/", element: <ListTransactions /> },
      { path: "/transactions/new", element: <NewTransaction /> },
      { path: "/transactions/:id", element: <ViewTransaction /> },
      { path: "/transactions/:id/edit", element: <EditTransaction /> },
      { path: "/categories", element: <ListCategories /> },
      { path: "/categories/new", element: <NewCategories /> },
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
