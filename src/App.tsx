import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

////// ADMIN IMPORTS
import NotFound from "./pages/admin/NotFound";
import AdminLayout from "./pages/admin/layout/Layout";
import Login from "./pages/admin/Login";
import HomeAdmin from "./pages/admin/Home";

// Category
import CategoryList from "./pages/admin/category/List";
import CategoryAdd from "./pages/admin/category/Add";
import CategoryEdit from "./pages/admin/category/Edit";

// Product
import ProductList from "./pages/admin/product/List";
import ProductDetail from "./pages/admin/product/Detail";
import ProductUpdate from "./pages/admin/product/Update";
import ProductAdd from "./pages/admin/product/Add";

// Customer
import CustomerList from "./pages/admin/account/customers/List";
import CustomerDetail from "./pages/admin/account/customers/Detail";

// Admin
import AdminList from "./pages/admin/account/admins/List";
import AdminUpdate from "./pages/admin/account/admins/Update";

// Order
import OrderList from "./pages/admin/order/List";
import OrderUpdate from "./pages/admin/order/Update";

////// CLIENT IMPORTS
import UserLayout from "./pages/client/components/Layout/UserLayout";
import Home from "./pages/client/pages/Home";
import ListProduct from "./pages/client/components/Layout/ListProduct";

//============================00============================

// Cấu hình các routes cho cả Admin và Client
const routeConfig = [
  // Admin Routes
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "/admin", element: <HomeAdmin /> },
      { path: "*", element: <NotFound /> },

      // Category
      { path: "/admin/category", element: <CategoryList /> },
      { path: "/admin/category/add", element: <CategoryAdd /> },
      { path: "/admin/category/update/:id", element: <CategoryEdit /> },

      // Product
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/detail/:id", element: <ProductDetail /> },
      { path: "/admin/products/update/:id", element: <ProductUpdate /> },
      { path: "/admin/products/add", element: <ProductAdd /> },

      // Customer
      { path: "/admin/account/customer", element: <CustomerList /> },
      {
        path: "/admin/account/customer/detail/:id",
        element: <CustomerDetail />,
      },

      // Admin
      { path: "/admin/account", element: <AdminList /> },
      { path: "/admin/account/update/:id", element: <AdminUpdate /> },

      // Order
      { path: "/admin/order", element: <OrderList /> },
      { path: "/admin/order/update/:id", element: <OrderUpdate /> },
    ],
  },

  // Admin Login
  { path: "/admin/login", element: <Login /> },

  // Client Routes
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/client/product", element: <ListProduct /> },
    ],
  },
];

// Component dùng `useRoutes`
function AppRoutes() {
  return useRoutes(routeConfig);
}

// App Component
function App() {
  const router = useRoutes(routeConfig);

  return (
    <div>
      {router}
      <Toaster />
    </div>
  );
}

export default App;
