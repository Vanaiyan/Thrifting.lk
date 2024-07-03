import {
  getWishlistItemsSuccess,
  getWishlistItemsFailure,
  removeFromWishlistRedux,
} from "../Reducers/wishListSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

export const addToWishlist = async (productId) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/wishlist`,
      {
        productId,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const removeFromWishlist = (productId) => async (dispatch) => {
  try {
    // Send a DELETE request to the backend API endpoint to remove the item from the wishlist
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND}/api/wishlist/${productId}`,
      { withCredentials: true }
    );

    // Dispatch action to update the wishlist in the Redux store
    dispatch(removeFromWishlistRedux(productId));
    // console.log("Deleted item", response.data);
  } catch (error) {
    // console.log("error", error);
  }
};

export const getWishlistItems = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/wishlist`,
      {
        withCredentials: true,
      }
    );
    // console.log("WishlistItems", response.data.wishlistItems);
    dispatch(getWishlistItemsSuccess(response.data.wishlistItems));
  } catch (error) {
    console.error(error);
    dispatch(getWishlistItemsFailure(error.response));
  }
};
