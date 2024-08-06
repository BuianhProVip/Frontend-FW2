import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import AdminProductList from "./pages/admin/product/List";
import AdminProductAdd from "./pages/admin/product/Add";
import AdminProductEdit from "./pages/admin/product/Edit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ClientLayout from "./layouts/ClientLayout";
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import ProductDetail from "./pages/ProductDetail";
import Shop from "./pages/shop";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

const routeConfig = [
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "product/list",
        element: <AdminProductList />,
      },
      {
        path: "product/add",
        element: <AdminProductAdd />,
      },
      {
        path: "product/edit/:id",
        element: <AdminProductEdit />,
      },
    ],
  },
  {
    path: "/",
    element: <ClientLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
    ],
  },
];

function App() {

  const routes = useRoutes(routeConfig);

  return <main>
    <ToastContainer/>
    {routes}
  
  </main>;

}

export default App;