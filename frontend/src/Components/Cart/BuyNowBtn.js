import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerProfileAction,
  getUserProfile,
} from "../../Actions/chatActions";
import { setCurrentUser, setLoginUser } from "../../Reducers/userSlice";
import { setChatId, setMessages } from "../../Reducers/messageSlice";
import {
  getMessagesForChat,
  addMessageToChat,
} from "../../Actions/chatFirebase";
import { showIntersted } from "../../Actions/cartActions";
import { useNavigate } from "react-router-dom";

const BuyNowBtn = ({ seller, productName, productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { messages, chatId } = useSelector((state) => state.messages);
  const { loginUser, currentUser, unreadMessages } = useSelector(
    (state) => state.user
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const UserProfile = await getUserProfile();
      if (UserProfile && UserProfile.user) {
        dispatch(setLoginUser(UserProfile.user));
      }

      const SellerProfile = await getSellerProfileAction(seller);
      if (SellerProfile && SellerProfile.user) {
        dispatch(setCurrentUser(SellerProfile.user));
      }
    };

    fetchProfiles();
  }, [dispatch, seller]);

  const handleAgree = async () => {
    setOpenDialog(false);

    await dispatch(showIntersted(productId));

    if (!currentUser || !loginUser) {
      // console.log("User or seller profiles not available");
      return;
    }

    // console.log("CurrentUser", currentUser);
    // console.log("loginUser", loginUser);

    const newChatId =
      currentUser._id > loginUser._id
        ? currentUser._id + loginUser._id
        : loginUser._id + currentUser._id;

    // console.log("ChatId in Cart", chatId);

    dispatch(setChatId(newChatId));

    const unsubscribe = getMessagesForChat(
      newChatId,
      currentUser._id,
      loginUser._id,
      (messages) => {
        // console.log("Messages fetched");
        dispatch(setMessages(messages));
      }
    );

    const imageUrl = "";
    const newMessage = `Hello,\n\nI'm interested in buying your second-hand product **${productName}** listed on your platform. Could you please confirm its condition and provide any relevant details?\n\nThank you`;
    await addMessageToChat(newChatId, loginUser._id, newMessage, imageUrl);

    navigate(`/chat/${newChatId}`);

    return () => {
      unsubscribe();
    };
  };

  const handleBuyNow = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        size="small"
        position="absolute"
        right="0px"
        onClick={handleBuyNow}
      >
        <Typography sx={{ fontSize: "12px" }}>Buy Now</Typography>
      </Button>

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Purchase Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            By clicking this button, you'll notify the seller of your interest
            in purchasing the product through our private chat app.
            <br />
            <br />
            <div
              style={{
                fontSize: "12px",
                color: "black",
                marginLeft: "15px",
                marginBottom: "10px",
              }}
            >
              Terms and Conditions:
              <ul>
                <li>
                  There is no responsibility regarding payment. Our platform is
                  for connecting sellers and buyers only.
                </li>
                <li>
                  As this is a second-hand product, our website does not check
                  the quality of any products listed.
                </li>
                <li>
                  We do not take responsibility for the accuracy of product
                  listings or the conduct of users.
                </li>
                <li>
                  We are not liable for damages arising from platform use.
                </li>
              </ul>
            </div>
            Please check the box below to agree with the terms and conditions:
          </DialogContentText>
          <FormControlLabel
            control={
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed(!agreed)}
                style={{ margin: "15px" }}
              />
            }
            label="I agree with the terms and conditions"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAgree} color="primary" disabled={!agreed}>
            Agree & Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BuyNowBtn;
