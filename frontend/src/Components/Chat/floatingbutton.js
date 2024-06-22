import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fab } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import { Link, useNavigate } from "react-router-dom";
import { setLoginUser } from "../../Reducers/userSlice";
import LoginPromptModal from "../Home/loginPromptModal"; // Adjust the import path as needed

const FloatingButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const authUser = useSelector((state) => state.auth.user);

  const handleFabClick = () => {
    if (authUser) {
      dispatch(setLoginUser(authUser));
      navigate("/chat/:chatId");
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="chat"
        style={{
          position: "fixed",
          bottom: 16,
          right: 24,
        }}
        onClick={handleFabClick}
      >
        <ChatIcon />
      </Fab>
      <LoginPromptModal open={modalOpen} onClose={handleCloseModal} />
    </>
  );
};

export default FloatingButton;
