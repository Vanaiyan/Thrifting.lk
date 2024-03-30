import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Styles/Theme";
import SignUp from "./Pages/User/SignUpMain";
import Login from "./Pages/User/LoginMain";
import { HomePage } from "./Pages/User/HomePage";
import { Route, Routes } from "react-router-dom";
import { Demo } from "./Components/demo";
import ChatPage from "./Pages/User/ChatPage";
import CartCard from "./Components/Cards/CartCard";
import CartSum from "./Components/Cards/CartSum";
import CartPage from "./Pages/User/CartPage";

import ProductDetailPage from "./Pages/Product/ProductDetailPage";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" Component={CartPage} />
          {/* <Route path="/" Component={HomePage} /> */}
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/demo" Component={Demo} />
          <Route path="/chat" Component={ChatPage} />
          <Route path="/productDetail" Component={ProductDetailPage} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
