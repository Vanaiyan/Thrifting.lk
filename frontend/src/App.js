import React, { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import theme from "./Styles/Theme";
import SignUp from "./Pages/User/SignUpMain";
import Login from "./Pages/User/LoginMain";
import { HomePage } from "./Pages/User/HomePage";
import { Demo } from "./Components/demo";
import Register_S from "./Pages/Seller/Register_S";
import ChatPage from "./Pages/User/ChatPage";
import CartPage from "./Pages/User/CartPage";
import ProductDetailPage from "./Pages/Product/ProductDetailPage";
import ProductMain from "./Pages/User/ProductMain";
import WishlistPage from "./Pages/User/WishListPage";
import { SellerPage } from "./Pages/Seller/SellerPage";
import MyPurchasesPage from "./Pages/User/MyPurchasesPage";
import Dashboard_S from "./Pages/Seller/Dashboard_S";
import AllProductsPage from "./Pages/Admin/AllProductsPage";
import AllSellersPage from "./Pages/Admin/Seller";
import AllUsersPage from "./Pages/Admin/Buyers";
import OrderList from "./Pages/Admin/OrderList";
import SellerApproval from "./Pages/Admin/SellerApproval";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import FeedbackReport from "./Pages/Admin/ReportFeedback";
import SellerLoginPage from "./Pages/Seller/loginSellerPage";
import EditProfile from "./Components/SellerDashboard/Profile/EditProfile";
import { getUserAction } from "./Actions/userAction";
import AdminLoginPage from "./Pages/Admin/AdminLogin";
import AddProduct from "./Components/SellerDashboard/AddProduct/AddProduct";
import UserProfile from "./Pages/User/UserProfile";
import { SellerProtectedRoute } from "./ProtectedRoutes";
import { AdminProtectedRoute } from "./ProtectedRoutes";
import { finishLoading } from "./Reducers/authSlice";
function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserAction());
      } catch (error) {
        // Handle error
      } finally {
        dispatch(finishLoading());
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // or any loading spinner
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/demo" Component={Demo} />
          <Route path="/chat/:chatId" Component={ChatPage} />
          <Route
            path="/productDetail/:productId"
            Component={ProductDetailPage}
          />
          <Route path="/product" Component={ProductMain} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/orders" Component={MyPurchasesPage} />
          <Route path="/user/profile" Component={UserProfile} />

          {/* Protected Routes for Sellers */}
          <Route path="/seller">
            <Route index Component={SellerPage} />
            <Route path="register" Component={Register_S} />
            <Route
              path="dashboard"
              Component={() => (
                <SellerProtectedRoute>
                  <Dashboard_S />
                </SellerProtectedRoute>
              )}
            />
            <Route
              path="dashboard/addProduct"
              Component={() => (
                <SellerProtectedRoute>
                  <AddProduct />
                </SellerProtectedRoute>
              )}
            />
            <Route
              path="profile/edit/:sellerId"
              Component={() => (
                <SellerProtectedRoute>
                  <EditProfile />
                </SellerProtectedRoute>
              )}
            />
            <Route path="login" Component={SellerLoginPage} />
          </Route>

          {/* Protected Routes for Admin */}
          <Route path="/admin">
            <Route
              path="AllProducts"
              Component={() => (
                <AdminProtectedRoute>
                  <AllProductsPage />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="Sellers"
              Component={() => (
                <AdminProtectedRoute>
                  <AllSellersPage />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="Buyers"
              Component={() => (
                <AdminProtectedRoute>
                  <AllUsersPage />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="OrderList"
              Component={() => (
                <AdminProtectedRoute>
                  <OrderList />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="SellerApproval"
              Component={() => (
                <AdminProtectedRoute>
                  <SellerApproval />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="Dashboard"
              Component={() => (
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              )}
            />
            <Route
              path="ReportFeedback"
              Component={() => (
                <AdminProtectedRoute>
                  <FeedbackReport />
                </AdminProtectedRoute>
              )}
            />
            <Route path="login" Component={AdminLoginPage} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
