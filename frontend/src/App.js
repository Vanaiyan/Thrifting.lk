import "./app.css";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Styles/Theme";
import SignUp from "./Pages/User/SignUpMain";
import Login from "./Pages/User/LoginMain";
import { HomePage } from "./Pages/User/HomePage";
import { Route, Routes } from "react-router-dom";
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
import { getUserAction } from "./Actions/userAction"; // Ensure this is correctly imported
import { useDispatch } from "react-redux";
import AdminLoginPage from "./Pages/Admin/AdminLogin";
import AddProduct from "./Components/SellerDashboard/AddProduct/AddProduct";
<<<<<<< HEAD
import ProtectedRoute from "./Components/Admin/ProtectedRoute";

=======
import { getCartProducts } from "./Actions/cartActions";
import { getAllProducts } from "./Actions/adminActions";
import ContactUs from "./Components/Footer/ContactUs";
import Terms from "./Components/Footer/Terms";
>>>>>>> d81eb56871c41f44cb580908b2d8e1ec4d4958cd
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Dispatch action with user data
        dispatch(getUserAction());
        dispatch(getCartProducts());
        dispatch(getAllProducts());
      } catch (error) {
        // console.error("Error fetching user data:", error);
        // Handle error (e.g., dispatch failure action)
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/demo" Component={Demo} />
          <Route path="/chat/:chatId" Component={ChatPage} />
          <Route path="/seller" Component={SellerPage} />
          <Route path="/seller/register" Component={Register_S} />
          <Route
            path="/productDetail/:productId"
            Component={ProductDetailPage}
          />
          <Route path="/product" Component={ProductMain} />
          <Route path="/seller/dashboard" Component={Dashboard_S} />
          <Route path="/seller/dashboard/addProduct" Component={AddProduct} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/admin/AllProducts" Component={AllProductsPage} />
          <Route path="/admin/Sellers" Component={AllSellersPage} />
          <Route path="/admin/Buyers" Component={AllUsersPage} />
          <Route path="/admin/OrderList" Component={OrderList} />
          <Route path="admin/SellerApproval" Component={SellerApproval} />
          <Route path="/admin/Dashboard" Component={AdminDashboard} />
          <Route path="/admin/ReportFeedback" Component={FeedbackReport} />
          <Route path="admin/login" Component={AdminLoginPage} />
          <Route path="/seller/login" Component={SellerLoginPage} />
          <Route path="/orders" Component={MyPurchasesPage} />
          <Route path="/contactUs" Component={ContactUs} />
          <Route path="/terms" Component={Terms} />

        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;




// // src/App.js
// import React, { useEffect } from "react";
// import { ThemeProvider } from "@mui/material/styles";
// import theme from "./Styles/Theme";
// import SignUp from "./Pages/User/SignUpMain";
// import Login from "./Pages/User/LoginMain";
// import { HomePage } from "./Pages/User/HomePage";
// import { Routes, Route, Navigate } from "react-router-dom";
// import Register_S from "./Pages/Seller/Register_S";
// import ChatPage from "./Pages/User/ChatPage";
// import CartPage from "./Pages/User/CartPage";
// import ProductDetailPage from "./Pages/Product/ProductDetailPage";
// import ProductMain from "./Pages/User/ProductMain";
// import WishlistPage from "./Pages/User/WishListPage";
// import { SellerPage } from "./Pages/Seller/SellerPage";
// import MyPurchasesPage from "./Pages/User/MyPurchasesPage";
// import Dashboard_S from "./Pages/Seller/Dashboard_S";
// import AllProductsPage from "./Pages/Admin/AllProductsPage";
// import AllSellersPage from "./Pages/Admin/Seller";
// import AllUsersPage from "./Pages/Admin/Buyers";
// import OrderList from "./Pages/Admin/OrderList";
// import SellerApproval from "./Pages/Admin/SellerApproval";
// import AdminDashboard from "./Pages/Admin/AdminDashboard";
// import FeedbackReport from "./Pages/Admin/ReportFeedback";
// import SellerLoginPage from "./Pages/Seller/loginSellerPage";
// import EditProfile from "./Components/SellerDashboard/Profile/EditProfile";
// import { getUserAction } from "./Actions/userAction"; 
// import { useDispatch, useSelector } from "react-redux";
// import AdminLoginPage from "./Pages/Admin/AdminLogin";
// import AddProduct from "./Components/SellerDashboard/AddProduct/AddProduct";
// import AdminRegister from "./Pages/Admin/AdminRegister";

// function App() {
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         dispatch(getUserAction());
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchData();
//   }, [dispatch]);

//   return (
//     <ThemeProvider theme={theme}>
//       <div>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/chat/:chatId" element={<ChatPage />} />
//           <Route path="/seller" element={<SellerPage />} />
//           <Route path="/seller/register" element={<Register_S />} />
//           <Route path="/productDetail/:productId" element={<ProductDetailPage />} />
//           <Route path="/product" element={<ProductMain />} />
//           <Route path="/seller/dashboard" element={<Dashboard_S />} />
//           <Route path="/seller/profile/edit/:sellerId" element={<EditProfile />} />
//           <Route path="/seller/dashboard/addProduct" element={<AddProduct />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/wishlist" element={<WishlistPage />} />
          
//           {/* Admin Routes */}
//           {isAuthenticated && (
//             <>
//               <Route path="/admin/AllProducts" element={<AllProductsPage />} />
//               <Route path="/admin/Sellers" element={<AllSellersPage />} />
//               <Route path="/admin/Buyers" element={<AllUsersPage />} />
//               <Route path="/admin/OrderList" element={<OrderList />} />
//               <Route path="/admin/SellerApproval" element={<SellerApproval />} />
//               <Route path="/admin/ReportFeedback" element={<FeedbackReport />} />
//               <Route path="/admin/Dashboard" element={<AdminDashboard />} />
//             </>
//           )}

//           {/* Admin Login */}
//           <Route path="/admin/login" element={<AdminLoginPage />} />
//           <Route path="/admin/register" element={<AdminRegister />} />

//           {/* User Routes */}
//           {isAuthenticated && (
//             <Route path="/orders" element={<MyPurchasesPage />} />
//           )}

//           {/* Redirect to login if not authenticated */}
//           {!isAuthenticated && (
//             <Route path="*" element={<Navigate to="/admin/login" />} />
//           )}
//         </Routes>
//       </div>
//     </ThemeProvider>
//   );
// }

// export default App;
