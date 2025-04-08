import { useRoutes } from "react-router";
import ProductList from "./pages/product/list";
import ProductAdd from "./pages/product/add";
import ProductEdit from "./pages/product/edit";

import "antd/dist/reset.css"; // Ant Design v5 reset styles
import Register from "./pages/auth/register";
import UserList from "./pages/user/list";
import AdminLayout from "./layouts/Admin";
import ClientLayout from "./layouts/Client";
import Homepages from "./pages/client/home";

import Checkout from "./pages/client/checkout";
import Cart from "./pages/client/cart";
import Logina from "./pages/auth/login";

import ProductDetail from "./pages/client/details";




function App() {
  const element = useRoutes([
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        {
          path: "users", // /admin/user/list
          element: <UserList />,
        },
        {
          path: "products",
          element: <ProductList />,
        },
        {
          path: "product/add",
          element: <ProductAdd />,
        },
        {
          path: "product/:id/edit",
          element: <ProductEdit />,
        },
      ],
    },
    {
      path: "",
      element: <ClientLayout />,
      children: [
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "",
          element: <Homepages />,
        },
        {
          path: "/detail/:id",
          element: <ProductDetail />,
        },
        {
          path: "/Cart",
          element: <Cart />,
        },
        {
          path: "/Checkout",
          element: <Checkout />,
        },
        {
          path: "/login",
          element: <Logina />,
        },
      ],
    },
  ]);
  return (
    <main>{element}</main>
    // <Layout style={{ minHeight: "100vh" }}>
    //   <Header>
    //     <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
    //       <Menu.Item key="1">
    //         <Link to="/">React Antd</Link>
    //       </Menu.Item>
    //       <Menu.Item key="2">
    //         <Link to="/product/list">Products</Link>
    //       </Menu.Item>
    //       <Menu.Item key="3">
    //         <Link to="/product/add">Add Product</Link>
    //       </Menu.Item>
    //       <Menu.Item key="4">
    //         <Link to="/register">Register</Link>
    //       </Menu.Item>
    //       <Menu.Item key="5">
    //         <Link to="/user/list">User List</Link>
    //       </Menu.Item>
    //       <Menu.Item key="6">
    //         <Link to="/login">Login</Link>
    //       </Menu.Item>
    //     </Menu>
    //   </Header>

    // </Layout>
  );
}

export default App;
