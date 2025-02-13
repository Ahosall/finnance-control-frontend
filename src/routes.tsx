import { createBrowserRouter } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import NewTransaction from "./pages/transactions/New";
import ListTransactions from "./pages/transactions/List";
import NewCategory from "./pages/NewCategory";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/transactions/new", element: <NewTransaction /> },
      { path: "/transactions/", element: <ListTransactions /> },
      { path: "/new-category", element: <NewCategory /> },
    ],
  },
]);

export default routes;
