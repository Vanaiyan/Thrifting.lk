import axios from "axios";
import { authStart, authSuccess, authFailure } from "../Reducers/authSlice";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
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
      const token = data.token;

      // Set the token in cookie (example)
      document.cookie = `token=${token}; path=/`; // Adjust the cookie name and path as needed

      // Dispatch success action to update Redux state
      dispatch(authSuccess({ isAuthenticated: true, token }));

      return data; // Return the entire response if needed
    } catch (error) {
      console.error("Login Error:", error);
      dispatch(authFailure(error.message)); // Dispatch failure action if login fails
      throw error; // Rethrow the error to handle it in the component
    }
  };
};



export const getUserAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_USER_REQUEST' });

      // Make API call to fetch user data
      const response = await axios.get(
        "http://localhost:8000/api/user",
        {
          withCredentials: true, // Ensure cookies are sent with request
        }
      );

      const data = response.data;
      dispatch({ type: 'FETCH_USER_SUCCESS', payload: data });
    } catch (error) {
      // console.error("Error fetching user data:", error);
      dispatch({ type: 'FETCH_USER_FAILURE', error: error.message });
    }
  };
};