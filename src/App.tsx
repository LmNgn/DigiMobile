import './App.css'
import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';
import Login from './pages/Login';
import ProductAdd from './pages/Add';
import UpdateProduct from './pages/Update';
import Layout from './pages/layout/Layout';
import { Toaster } from 'react-hot-toast';
const routeConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/detail/:id', element: <Detail /> },
      { path: '/update/:id', element: <UpdateProduct /> },
      { path: '/add', element: <ProductAdd /> },
    ]
  },

  { //router register
    path: '/register',
    element: <Register />,
  },
  {//router login
    path: '/login',
    element: <Login />,
  },
  { //router not found
    path: '*',
    element: <NotFound />
  }
];

function App() {
  const router = useRoutes(routeConfig);

  return <div>
    {router}
    <Toaster />
    </div>
}

export default App
