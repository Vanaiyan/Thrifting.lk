import {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  removeFromCart,
} from "../Reducers/cartSlice";
import { updatesoldConfirmedSellerReducer } from "../Reducers/cartSlice";
import axios from "axios";

// Function to retrieve token from cookies
const getTokenFromCookies = () => {
  const cookies = document.cookie.split(";");
  const cookieToken = cookies.find((cookie) =>
    cookie.trim().startsWith("token=")
  );

  if (cookieToken) {
    const token = cookieToken.split("=")[1]; // Extract token value
    console.log("Token:", token);
    return token;
  } else {
    console.error("Token not found in cookies.");
    return null;
  }
};

// Example usage
export const addToCart = (item) => async (dispatch) => {
  try {
    const token = getTokenFromCookies();
    console.log("TOKENNNN : ", token);
    // Make API request to add item to cart
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/addToCart`,
      item,
      { withCredentials: true }
    );

    // Dispatch action to update state upon success
    dispatch(addToCartSuccess(item));
  } catch (error) {
    // Dispatch action to handle failure
    console.error(error);
    dispatch(addToCartFailure(error.response.data.message));
  }
};

export const getCartProducts = () => async (dispatch) => {
  try {
    // Make API request to get cart products
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/getcart`,
      {
        withCredentials: true,
      }
    );
    // console.log("get cart : ", response.data.productsBySeller);

    // Dispatch action to update state upon success
    dispatch(getCartSuccess(response.data.productsBySeller));
  } catch (error) {
    // Dispatch action to handle failure
    dispatch(getCartFailure(error.response.data.message));
  }
};

export const removeItem = (productId) => async (dispatch) => {
  try {
    // Call API to remove item from cart
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/api/cart/${productId}`,
      {
        withCredentials: true,
      }
    );
    // console.log("res", response);
    // Dispatch action to update state upon success
    dispatch(removeFromCart(productId));
  } catch (error) {
    // Handle error
    // console.log("error", error);
  }
};

export const showIntersted = (productId) => async () => {
  try {
    // console.log("Reached show interested in Actions");
    await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/cart/interested/${productId}`,
      {},
      { withCredentials: true }
    );
    // console.log("Interst in product successfully", productId);
  } catch (error) {
    console.error("Error updating interst in product:", error);
  }
};

export const showNotInterested = (productId) => async () => {
  try {
    // console.log("Reached show interested in Actions");
    await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/cart/notinterested/${productId}`,
      {},
      { withCredentials: true }
    );
    // console.log("interst in product Removed successfully", productId);
  } catch (error) {
    console.error("Error updating interst in product:", error);
  }
};

export const soldConfirmByBuyerAction = (productId) => async (dispatch) => {
  try {
    // console.log("Reached show interested in Actions");

    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/cart/soldBuyer/${productId}`,
      {},
      { withCredentials: true }
    );

    // console.log("product sold updated By buyer successfully", productId);
    const data = response.data;

    // Dispatch the reducer to update the store
    dispatch(
      updatesoldConfirmedSellerReducer({
        productId,
        soldConfirmedBuyer: true,
      })
    );
    dispatch(removeFromCart(productId));

    return data;
  } catch (error) {
    console.error("Error updating interest in product:", error);
    throw error;
  }
};
