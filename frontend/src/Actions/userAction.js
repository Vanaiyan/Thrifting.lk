import axios from "axios";
import {
  authStart,
  authSuccess,
  authFailure,
  logout,
} from "../Reducers/authSlice";

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
      const token = response.data.token;
      const user = response.data.user;

      // Set the token in cookie (example)
      document.cookie = `token=${token}; path=/`; // Adjust the cookie name and path as needed

      // Dispatch success action to update Redux state
      dispatch(authSuccess({ isAuthenticated: true, user }));

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
      // Make API call to fetch user data
      const response = await axios.get("http://localhost:8000/api/user", {
        withCredentials: true, // Ensure cookies are sent with request
      });

      const user = response.data.user;
      dispatch(authSuccess({ user }));
    } catch (error) {
      // console.error("Error fetching user data:", error);
      dispatch(authFailure(error.message)); // Dispatch failure action if login fails
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // Make API call to fetch user data
      const response = await axios.get("http://localhost:8000/api/logout", {
        withCredentials: true, // Ensure cookies are sent with request
      });

      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      dispatch(logout());
    } catch (error) {
      // console.error("Error fetching user data:", error);
      dispatch(authFailure(error.message)); // Dispatch failure action if login fails
    }
  };
};
