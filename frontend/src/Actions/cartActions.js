import {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  removeFromCart,
} from "../Reducers/cartSlice";
import axios from "axios";

export const addToCart = (item) => async (dispatch) => {
  try {
    // Make API request to add item to cart
    const response = await axios.post(
      "http://localhost:8000/api/addToCart",
      item,
      { withCredentials: true }
    );

    // Dispatch action to update state upon success
    dispatch(addToCartSuccess(response.data));
  } catch (error) {
    // Dispatch action to handle failure
    dispatch(addToCartFailure(error.response.data.message));
  }
};

export const getCartProducts = () => async (dispatch) => {
  try {
    // Make API request to get cart products
    const response = await axios.get("http://localhost:8000/api/getcart", {
      withCredentials: true,
    });
    console.log("get cart : ", response.data.products);

    // Dispatch action to update state upon success
    dispatch(getCartSuccess(response.data.products));
  } catch (error) {
    // Dispatch action to handle failure
    dispatch(getCartFailure(error.response.data.message));
  }
};

export const removeItem = (productId) => async (dispatch) => {
  try {
    // Call API to remove item from cart
    const response = await axios.delete(
      `http://localhost:8000/api/cart/${productId}`,
      {
        withCredentials: true,
      }
    );
    console.log("res", response);
    // Dispatch action to update state upon success
    dispatch(removeFromCart(productId));
  } catch (error) {
    // Handle error
    console.log("error", error);
  }
};
