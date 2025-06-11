import "./app.css";
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
import Dashboard_S from "./Pages/Seller/Dashboard_S"
import AllProductsPage from "./Pages/Admin/AllProductsPage";
import AllSellersPage from "./Pages/Admin/Seller";
import OrderList from "./Pages/Admin/OrderList";
import SellerApproval from "./Pages/Admin/SellerApproval";


import EditProfile from "./Components/SellerDashboard/Profile/ManageSellerDetails";
//import ProfilePage from "./Components/SellerDashboard/Profile/ProfilePage";

function App() {
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
          <Route path="/productDetail" Component={ProductDetailPage} />
          <Route path="/product" Component={ProductMain} />
          <Route path="/seller/dashboard" Component={Dashboard_S} />
          {/* <Route path="/seller/profile" Component={ProfilePage} /> */}
          <Route path="/seller/profile/edit/:sellerId" Component={EditProfile} />
          <Route path="/cart" Component={CartPage} />
          <Route path="/wishlist" Component={WishlistPage} />
          <Route path="/admin/allproducts" Component={AllProductsPage} />
          <Route path="/admin/Sellers" Component={AllSellersPage} />
          <Route path="/admin/OrderList" Component={OrderList} />
          <Route path="admin/SellerApproval" Component={SellerApproval}/>
          <Route path="/mypurchase" Component={MyPurchasesPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
