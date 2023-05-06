import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Login from "./pages/user/Login";
import NotFound from "./pages/PageNotFound";
import Policy from "./pages/Policy";
import Register from "./pages/user/Register";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/user/Deshboard";
import Private from "./components/Routes/Private";
import ForgetPassword from "./pages/user/ForgetPassword";
import AdminRoute from "./components/Routes/adminRoute";
import AdminDashboard from "./pages/Admin/adminDashboard";
import AdminProfile from "./pages/Admin/AdminProfile";
import Catergory from "./pages/Admin/Catergory";
import CreateProduct from "./pages/Admin/CreateProduct";
import UserProfile from "./pages/user/UserProfile";
import Orders from "./pages/user/Orders";
import Product from "./pages/Admin/Product";
import ProductUpdate from "./pages/Admin/ProductUpdate";
import SearchedProducts from "./pages/SearchedProducts";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/search" element={<SearchedProducts />} />
        <Route path="/about" element={<About />} />

        {/* protected routes */}
        <Route path="/dashboard" element={<Private />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/profile" element={<AdminProfile />} />
          <Route path="admin/category" element={<Catergory />} />
          <Route path="admin/createProduct" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<ProductUpdate />} />
          <Route path="admin/products" element={<Product />} />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
