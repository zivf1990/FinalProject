import { Route, Routes } from "react-router-dom";
import { useSessionID } from "../context/UserContext";
import Login from "../pages/Login";

import Register from "../pages/Register";
import MyPurchaseHistory from "../pages/myPurchaseHistory";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import AddProduct from "../pages/AddProduct";
import Account from "../pages/Account";
import Category from "../pages/Category";
import Product from "../pages/Product";
import AdminHome from "../pages/adminHome";
import Users from "../pages/shopifyUsers";
import ShopifyProducts from "../pages/shopifyProducts";
import ShoppingCart from "../pages/shoppingCart";
import Checkout from "../pages/Checkout";
import SellerProducts from "../pages/SellerProducts";
import PurchaseHistory from "../pages/PurchaseHistory";
import Login2 from "../pages/Login2";
import NotSigned from "../pages/NotSigned";

function Pages() {
  // const isAdmin = getCookie("isAdmin");
  const { sessionID } = useSessionID();
  return (
    <AnimatePresence mode="wait">
      <>
        <Routes>
          {sessionID ? (
            <>
              <Route path="/AdminHome" element={<AdminHome />}>
                <Route path="users" element={<Users />} />
                <Route path="profile" element={<Account />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="products" element={<ShopifyProducts />} />
                <Route path="purchaseHistory" element={<PurchaseHistory />} />
              </Route>
              <Route path="/" element={<Home />}>
                <Route path="shop" element={<Shop />} />
                <Route path="category/:categoryId" element={<Category />} />
                <Route path="account" element={<Account />} />
                <Route path="purchaseHistory" element={<MyPurchaseHistory />} />
                <Route path="addProduct" element={<AddProduct />} />
                <Route path="sellerproducts" element={<SellerProducts />} />
                <Route path="product/:productId" element={<Product />} />
                <Route path="purchaseHistory" element={<PurchaseHistory />} />
              </Route>
              <Route path="shoppingcart" element={<ShoppingCart />} />
              <Route path="checkout" element={<Checkout />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Home />}>
                <Route path="shop" element={<Shop />} />
                <Route path="*" element={<NotSigned />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )}
        </Routes>
      </>
    </AnimatePresence>
  );
}

export default Pages;
