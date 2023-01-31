import { Route, Routes } from "react-router-dom";
import { useUserToken } from "../context/UserContext";
import Login from "../pages/Login";

import Register from "../pages/Register";
import MyPurchaseHistory from "../pages/myPurchaseHistory";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import Profile from "../pages/Profile";
import Category from "../pages/Category";
import Product from "../pages/Product";
import AdminHome from "../pages/adminHome";
import Users from "../pages/shopifyUsers";
import ShopifyProducts from "../pages/shopifyProducts";
import ShoppingCart from "../pages/shoppingCart";
import Checkout from "../pages/Checkout";
import SellerProducts from "../pages/SellerProducts";
import PurchaseHistory from "../pages/PurchaseHistory";

function Pages() {
  // const isAdmin = getCookie("isAdmin");
  const { userToken } = useUserToken();
  return (
    <AnimatePresence mode="wait">
      <>
        <Routes>
          {userToken ? (
            <>
              <Route path="/AdminHome" element={<AdminHome />}>
                <Route path="users" element={<Users />} />
                <Route path="profile" element={<Profile />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="products" element={<ShopifyProducts />} />
                <Route path="purchaseHistory" element={<PurchaseHistory />} />
              </Route>
              <Route path="/" element={<Home />}>
                <Route path="shop" element={<Shop />} />
                <Route path="category/:categoryId" element={<Category />} />
                <Route path="profile" element={<Profile />} />
                <Route path="purchaseHistory" element={<MyPurchaseHistory />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="sellerproducts" element={<SellerProducts />} />
                <Route path="product/:productId" element={<Product />} />
                <Route path="shoppingcart" element={<ShoppingCart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="purchaseHistory" element={<PurchaseHistory />} />
              </Route>
            </>
          ) : (
            <>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default Pages;
