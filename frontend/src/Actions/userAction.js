import axios from "axios";
import {
  authStart,
  authSuccess,
  authFailure,
  logout,
} from "../Reducers/authSlice";
import { setLoginUser } from "../Reducers/userSlice";

export const loginUser = (email, password) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/login`,
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
      // console.error("Login Error:", error);
      dispatch(authFailure(error.message)); // Dispatch failure action if login fails
      throw error; // Rethrow the error to handle it in the component
    }
  };
};

export const getUserAction = (userData) => {
  return async (dispatch) => {
    try {
      // Make API call to fetch user data
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/user`,
        {
          withCredentials: true, // Ensure cookies are sent with request
        }
      );
      //console.log(response.data);
      const user = response.data;
      // console.log("Logged in user : ", user);
      dispatch(authSuccess({ user }));
      dispatch(setLoginUser(user));
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
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/logout`,
        {
          withCredentials: true, // Ensure cookies are sent with request
        }
      );

      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      dispatch(logout());
    } catch (error) {
      // console.error("Error fetching user data:", error);
      dispatch(authFailure(error.message)); // Dispatch failure action if login fails
    }
  };
};

export const registerUser = (
  userData,
  setSnackbarOpen,
  setSuccessMessage,
  setErrorMessage,
  navigate
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/api/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response", response);
      const data = response.data;
      if (data.success) {
        // console.log("Success:", data);
        const token = data.token;
        const user = data.user;

        // Set the token in cookie (example)
        document.cookie = `token=${token}; path=/`; // Adjust the cookie name and path as needed

        // Dispatch success action to update Redux state
        dispatch(authSuccess({ isAuthenticated: true, user }));

        setSuccessMessage("Account Created Successfully!");
        setSnackbarOpen(true);

        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000); // 2 seconds delay to show the Snackbar message
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error("Error:", error.response.data);
      setErrorMessage(error.response.data.message || "An error occurred");
    }
  };
};

export const sendResetPasswordLink = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/password/forgot`,
      { email }
    );
    return { success: true, message: response.data.message };
  } catch (err) {
    console.error("Error:", err.response);

    return {
      success: false,
      error:
        err.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};

// Function to reset password
export const resetPassword = async (token, password) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/password/reset/${token}`,
      {
        password,
      }
    );
    return { success: true, message: response.data.message };
  } catch (err) {
    console.error("Error:", err);

    return {
      success: false,
      error:
        err.response?.data?.message || "An error occurred. Please try again.",
    };
  }
};
