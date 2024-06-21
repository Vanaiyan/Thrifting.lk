import axios from "axios";
import { authSuccess } from "../Reducers/authSlice";

export const loginAdmin = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/admin/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      const data = response;
      const token = response.data.token;
      const user = response.data.user;
      // console.log("Login Seller check1");
      // console.log("res", response);
      console.log("res.data", response.data);
      // console.log("token", response.data.token);

      //To remove any existing tokens
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      // Set the token in cookie (example)
      document.cookie = `token=${token}; path=/`; // Adjust the cookie name and path as needed
      // Dispatch success action to update Redux state
      dispatch(authSuccess({ user }));

      return data; // Return the entire response if needed
    } catch (error) {
      console.error("Login Error:", error);
      // dispatch(authFailure(error.message)); // Dispatch failure action if login fails
      throw error; // Rethrow the error to handle it in the component
    }
  };
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/products",
      {
        withCredentials: true,
      }
    );
    console.log("Products from Actions", response.data);
    return response.data.products;
  } catch (error) {
    // Handle error
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getAllSellers = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/admin/sellers");
    console.log("Sellerss from Actions", response.data);
    return response.data.sellers;
  } catch (error) {
    // Handle error
    console.error("Error fetching sellers:", error);
    return [];
  }
};

// import axios from 'axios';

// // Action Types
// const DELETE_SELLER_SUCCESS = 'DELETE_SELLER_SUCCESS';
// const DELETE_SELLER_FAILURE = 'DELETE_SELLER_FAILURE';

// // Action Creators
// const deleteSellerSuccess = (sellerId) => ({
//   type: DELETE_SELLER_SUCCESS,
//   payload: sellerId,
// });

// const deleteSellerFailure = (error) => ({
//   type: DELETE_SELLER_FAILURE,
//   payload: error,
// });

// // Thunk Action for Deleting Seller
// export const deleteSeller = (sellerId) => async (dispatch) => {
//   try {
//     await axios.delete(`http://localhost:8000/api/admin/seller/${sellerId}`, {
//       withCredentials: true,
//     });
//     console.log("Seller deleted successfully", sellerId);
//     dispatch(deleteSellerSuccess(sellerId));
//   } catch (error) {
//     console.error("Error deleting seller:", error);
//     dispatch(deleteSellerFailure(error.message));
//   }
// };

// // Initial State
// const initialState = {
//   sellers: [],
//   error: null,
// };

// // Reducer
// const sellerReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case DELETE_SELLER_SUCCESS:
//       return {
//         ...state,
//         sellers: state.sellers.filter(seller => seller.id !== action.payload),
//         error: null,
//       };
//     case DELETE_SELLER_FAILURE:
//       return {
//         ...state,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default sellerReducer;

export const deleteSeller = async (sellerId) => {
  try {
    await axios.delete(`http://localhost:8000/api/admin/seller/${sellerId}`, {
      withCredentials: true,
    });
    console.log("Seller deleted successfully", sellerId);
    return { success: true, sellerId };
  } catch (error) {
    console.error("Error deleting seller:", error);
    return { success: false, error: error.message };
  }
};

export const getOrderList = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/admin/orders");
    console.log("Orders from Actions", response.data);
    return response.data.orders;
  } catch (error) {
    // Handle error
    console.error("Error fetching orders:", error);
    return [];
  }
};
