import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

////// ADMIN IMPORTS
import NotFound from "./pages/admin/NotFound";
import AdminLayout from "./pages/admin/layout/Layout";
import Login from "./pages/admin/Login";
import HomeAdmin from "./pages/admin/Home";

// Category
import CategoryList from "./pages/admin/category/List";
import UpdateCategory from "./pages/admin/category/Update";

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
import Profile from "./pages/client/pages/Profile";
import ProductDetailId from "./pages/client/components/Product/ProductDetail";
import MyOrders from "./pages/client/pages/MyOrders";
import LoginUser from "./pages/client/pages/LoginUser";
import RegisterUser from "./pages/client/pages/RegisterUser";

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
      { path: "/admin/categories", element: <CategoryList /> },
      { path: "/admin/categories/update/:id", element: <UpdateCategory /> },

      // Product
      { path: "/admin/products", element: <ProductList /> },
      { path: "/admin/products/detail/:id", element: <ProductDetail /> },
      { path: "/admin/products/update/:id", element: <ProductUpdate /> },
      { path: "/admin/products/add", element: <ProductAdd /> },

      // // Customer
      // { path: "/admin/customers/admin", element: <CustomerList /> },
      // {
      //   path: "/admin/customers/detail/:id",
      //   element: <CustomerDetail />,
      // },

      // Admin
      { path: "/admin/admins", element: <AdminList /> },
      { path: "/admin/admins/update/:id", element: <AdminUpdate /> },

      // Order
      { path: "/admin/orders", element: <OrderList /> },
      { path: "/admin/orders/update/:id", element: <OrderUpdate /> },
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
      { path: "/client/login", element: <LoginUser /> },
      { path: "/client/register", element: <RegisterUser /> },
      { path: "/client/product", element: <ListProduct /> },
      { path: "/product/:productId", element: <ProductDetailId /> },
      { path: "/client/profile", element: <Profile /> },
      { path: "/client/order", element: <MyOrders /> },
    ],
  },
];

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
