import {
  addToCartSuccess,
  addToCartFailure,
  getCartSuccess,
  getCartFailure,
  removeFromCart,
  updateCartItemQuantitySuccess,
  updateCartItemQuantityFailure,
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
    console.log("get cart : ", response.data.productsBySeller);

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
export const updateCartItemQuantity =
  (productId, newQuantity) => async (dispatch) => {
    try {
      await axios.put(
        `http://localhost:8000/api/cart/${productId}`,
        {
          productId,
          quantity: newQuantity,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Quantity updated successfully", productId, newQuantity);
      dispatch(updateCartItemQuantitySuccess({ productId, newQuantity }));
    } catch (error) {
      console.error("Error updating quantity:", error);
      dispatch(updateCartItemQuantityFailure(error.message));
    }
  };
