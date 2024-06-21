import axios from "axios";
import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../Reducers/productSlice";

const BASE_URL = "http://localhost:8000/api"; // Replace with your actual backend API URL

// Thunk action to fetch products
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await axios.get(`${BASE_URL}/products`, {
      withCredentials: true,
    });
    dispatch(fetchProductsSuccess(response.data.products));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchSellerDetails = async (sellerId) => {
  try {
    const response = await fetch(`${BASE_URL}/seller/${sellerId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch seller details");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching seller details:", error.message);
    throw error;
  }
};
// Thunk action to push productId to interactedProducts in user document
export const pushInteractedProduct = (productId) => async () => {
  try {
    // Make POST request to the backend endpoint
    console.log("Pushing interacted product:", productId);
    const response = await axios.post(
      `${BASE_URL}/users/interact`,
      { productId },
      {
        withCredentials: true,
      }
    );

    // Log success message
    console.log("Successfully pushed interacted product:", response.data);

    return response.data;
  } catch (error) {
    // Handle and log error
    console.error("Error pushing interacted product:", error);
    throw error; // Rethrow error to be caught by the caller
  }
};

// Thunk action to get recommendations
export const getRecommendations = (user) => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    // console.log("User from action rec : ", user);
    const response = await axios.post(
      `${BASE_URL}/recommendations`,
      { user },
      {
        withCredentials: true, // Ensure credentials are sent if using cookies for authentication
      }
    );
    // console.log(response.data);
    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    dispatch(fetchProductsFailure(error.message));
  }
};

export const fetchProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};
