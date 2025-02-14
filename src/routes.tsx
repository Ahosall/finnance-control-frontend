import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";

import NewTransaction from "./pages/transactions/New";
import ListTransactions from "./pages/transactions/List";
import ViewTransaction from "./pages/transactions/View";
import EditTransaction from "./pages/transactions/Edit";

import NewCategory from "./pages/NewCategory";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/transactions/", element: <ListTransactions /> },
      { path: "/transactions/new", element: <NewTransaction /> },
      { path: "/transactions/:id", element: <ViewTransaction /> },
      { path: "/transactions/:id/edit", element: <EditTransaction /> },
      { path: "/new-category", element: <NewCategory /> },
    ],
  },
]);

export default routes;
