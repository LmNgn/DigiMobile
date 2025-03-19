import "./App.css";
import { useRoutes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//////ADMIN
import NotFound from "./pages/admin/NotFound";
import AdminLayout from "./pages/admin/layout/Layout";
import Login from "./pages/admin/Login";
import Register from "./pages/admin/Register";
import Home from "./pages/admin/Home";
//category
import CategoryList from "./pages/admin/category/List";
import CategoryAdd from "./pages/admin/category/Add";
import CategoryEdit from "./pages/admin/category/Edit";
//product
import ProductList from "./pages/admin/product/List";
import ProductDetail from "./pages/admin/product/Detail";
import ProductUpdate from "./pages/admin/product/Update";
import ProductAdd from "./pages/admin/product/Add";
//customer
import CustomerList from "./pages/admin/account/customers/List";
import CustomerDetail from "./pages/admin/account/customers/Detail";
//admin
import AdminList from "./pages/admin/account/admins/List";
import AdminUpdate from "./pages/admin/account/admins/Update";
//order
import OrderList from "./pages/admin/order/List";
import OrderUpdate from "./pages/admin/order/Update";

//============================00============================
//////CLIENT
const routeConfig = [
  //Admin route
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      //Home
      { path: "/admin", element: <Home /> },

      //Not found
      { path: "*", element: <NotFound /> },

      //Category
      { path: "/admin/category", element: <CategoryList /> },
      { path: "/admin/category/add", element: <CategoryAdd /> },
      { path: "/admin/category/update/:id", element: <CategoryEdit /> },

      //Product
      { path: "/admin/product", element: <ProductList /> },
      { path: "/admin/product/detail/:id", element: <ProductDetail /> },
      { path: "/admin/product/update/:id", element: <ProductUpdate /> },
      { path: "/admin/product/add", element: <ProductAdd /> },

      //Customer
      { path: "/admin/account/customer", element: <CustomerList /> },
      { path: "/admin/account/customer/detail/:id", element: <CustomerDetail/> },

      //Admin
      { path: "/admin/account", element: <AdminList /> },
      { path: "/admin/account/update/:id", element: <AdminUpdate /> },

      //Order
      { path: "/admin/order", element: <OrderList /> },
      { path: "/admin/order/update/:id", element: <OrderUpdate /> },
    ],
  },
  {
    //route login
    path: "/admin/login",
    element: <Login />,
  },
  {
    //route login
    path: "/admin/register",
    element: <Register />,
  },
];

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
