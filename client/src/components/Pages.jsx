import { Route, Routes, Navigate } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import Profile from "../pages/Profile";
import Login from "../pages/Login";

import Register from "../pages/Register";
import PurchaseHistory from "../pages/PurchaseHistory";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";
import Profile from "../pages/Profile";

function Pages() {
  // const isAdmin = getCookie("isAdmin");
  const { token } = useUserToken();
  return (
    <AnimatePresence mode="wait">
      <>
        <Routes>
          <Route index element={<Navigate replace to="/login" />} />
          <Route path="login" element={<Login />} />
          <Route path="/home" element={<Home />}>
            <Route path="shop" element={<Shop />} />
            <Route path="profile" element={<Profile />} />
            <Route path="purchaseHistory" element={<PurchaseHistory />} />
            <Route path="addProduct" element={<AddProduct />} />
            <Route path="products" element={<Products />} />
          </Route>
          <Route path="register" element={<Register />} />
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default Pages;
