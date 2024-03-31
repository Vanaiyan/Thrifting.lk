import "./app.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Styles/Theme";
import SignUp from "./Pages/User/SignUpMain";
import Login from "./Pages/User/LoginMain";
import { HomePage } from "./Pages/User/HomePage";
import { Route, Routes } from "react-router-dom";
import { Demo } from "./Components/demo";
import { ChatPage } from "./Pages/User/ChatPage";
import ProductMain from "./Pages/User/ProductMain";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={Login} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/demo" Component={Demo} />
          <Route path="/chat" Component={ChatPage} />
          <Route path="/product" Component={ProductMain}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
