import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Product from "./pages/product";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Detail from "./pages/viewDetail";
import NewProduct from "./pages/NewProduct";
import User from "./pages/user";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, path: "", element: <Dashboard /> },
      { path: "/product", element: <Product /> },
      { path: "/login", element: <Login /> },
      { path: "/Detail/:DetailId", element: <Detail /> },
      { path: "/newProduct", element: <NewProduct /> },
      { path: "/Edit/:EditId", element: <NewProduct /> },
      { path: "/users", element: <User /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
