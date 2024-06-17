import axios from "axios";

export const submitSeller = async (email, password) => {
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
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const loginSeller = (email, password) => {
  return async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/seller/login",
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
      console.log("Login Seller check1");
      console.log("res", response);
      console.log("res.data", response.data);
      console.log("token", response.data.token);
      // Set the token in cookie (example)
      document.cookie = `token=${token}; path=/`; // Adjust the cookie name and path as needed
      // Dispatch success action to update Redux state
      // authSuccess({ isAuthenticated: true, token });

      return data; // Return the entire response if needed
    } catch (error) {
      console.error("Login Error:", error);
      // dispatch(authFailure(error.message)); // Dispatch failure action if login fails
      throw error; // Rethrow the error to handle it in the component
    }
  };
};
