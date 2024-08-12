import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Menu } from "./components/menu/Menu.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthPage from "./pages/auth/AuthPage.jsx";
import ItemsPage from "./pages/items/ItemsPage.jsx";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.jsx";
import CategoriesPage from "./pages/categories/CategoriesPage.jsx";
import CategoryPage from "./pages/categoryPage/CategoryPage.jsx";
import AddItem from "./pages/items/AddItem.jsx";
import EditItem from "./pages/items/EditItem.jsx";
import BrandsPage from "./pages/brands/BrandsPage.jsx";
import BrandEditPage from "./pages/brands/BrandEditPage.jsx";
import BrandsAddPage from "./pages/brands/BrandsAddPage.jsx";
import OrdersPage from "./pages/Orders/OrdersPage.jsx";
import OrderEditPage from "./pages/Orders/OrderEditPage.jsx";
import CollectionsPage from "./pages/collections/CollectionsPage.jsx";
import CollectionPage from "./pages/collections/CollectionPage.jsx";
import CollectionAddPage from "./pages/collections/CollectionAddPage.jsx";
import SalesPage from "./pages/sales/SalesPage.jsx";
import SaleEditPage from "./pages/sales/SaleEditPage.jsx";
import SalesAddPage from "./pages/sales/SalesAddPage.jsx";
import AddCategoryPage from "./pages/categoryPage/AddCategoryPage.jsx";
import Face from "./pages/face/face.jsx";
import FaceCategory from "./pages/face/faceCategory.jsx";

const router = createBrowserRouter([
  {
    element: (
      <ProtectedRoute>
        <Menu />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        ),
      },
      {
        path: "/items",
        element: (
          <ProtectedRoute>
            <ItemsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/item/:id",
        element: (
          <ProtectedRoute>
            <EditItem />
          </ProtectedRoute>
        ),
      },
      {
        path: "/items/add-item",
        element: (
          <ProtectedRoute>
            <AddItem />
          </ProtectedRoute>
        ),
      },
      {
        path: "/orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <ProtectedRoute>
            <OrderEditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands",
        element: (
          <ProtectedRoute>
            <BrandsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brand/:id",
        element: (
          <ProtectedRoute>
            <BrandEditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/brands/new",
        element: (
          <ProtectedRoute>
            <BrandsAddPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categories",
        element: (
          <ProtectedRoute>
            <CategoriesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/category/:id",
        element: (
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/add-category",
        element: (
          <ProtectedRoute>
            <AddCategoryPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sales",
        element: (
          <ProtectedRoute>
            <SalesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sale/:id",
        element: (
          <ProtectedRoute>
            <SaleEditPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/sale/add",
        element: (
          <ProtectedRoute>
            <SalesAddPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/collections",
        element: (
          <ProtectedRoute>
            <CollectionsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/collection/:id",
        element: (
          <ProtectedRoute>
            <CollectionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/collections/add",
        element: (
          <ProtectedRoute>
            <CollectionAddPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/face",
        element: (
          <ProtectedRoute>
            <Face />
          </ProtectedRoute>
        ),
      },{
        path: "/face/:id",
        element: (
          <ProtectedRoute>
            <FaceCategory />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
