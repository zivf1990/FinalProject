import { Route, Routes, Navigate } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import Login from "../pages/Login";

import Register from "../pages/Register";
import PurchaseHistory from "../pages/PurchaseHistory";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import Products from "../pages/Products";
import Profile from "../pages/Profile";
import Category from "./Categories";

function Pages() {
  // const isAdmin = getCookie("isAdmin");
  const { userToken } = useUserToken();
  return (
    <AnimatePresence mode="wait">
      <>
        <Routes>
          {userToken ? (
            <>
              <Route path="/" element={<Home />}>
                <Route path="shop" element={<Shop />} />
                <Route path="category/:name" element={<Category />} />
                <Route path="profile" element={<Profile />} />
                <Route path="purchaseHistory" element={<PurchaseHistory />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="products" element={<Products />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )}
          {/* <Route path="*" element={<Login />} /> */}
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default Pages;
