import { lazy, Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Loader from "./components/Loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Vendor from "./components/VendorProducts/Vendor";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute
import NavBar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Home = lazy(() => import("./pages/Home"));
const Shop = lazy(() => import("./pages/Shop"));
const Cart = lazy(() => import("./pages/Cart"));
const Product = lazy(() => import("./pages/Product"));
const LoginPage = lazy(() => import("./Authentication/LoginSignUp"));

function Layout() {
  const location = useLocation();
  const isLoginOrVendorPage = location.pathname === "/login" || location.pathname === "/vendor";

  return (
    <>
      {/* Only render NavBar and Footer for routes other than /login and /vendor */}
      {!isLoginOrVendorPage && <NavBar />}
      
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/shop" element={<PrivateRoute element={<Shop />} />} />
        <Route path="/shop/:id" element={<PrivateRoute element={<Product />} />} />
        <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />

        {/* Vendor Route */}
        <Route path="/vendor" element={<Vendor />} />
      </Routes>

      {/* Only render Footer for routes other than /login and /vendor */}
      {!isLoginOrVendorPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Layout />
      </Router>
    </Suspense>
  );
}

export default App;
