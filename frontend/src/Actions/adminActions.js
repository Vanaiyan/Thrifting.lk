import axios from "axios";
import { authSuccess } from "../Reducers/authSlice";

// Admin Dashboard

export const getCounts = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/admin/count", {
      withCredentials: true,
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching:", error);
    return [];
  }
};

export const getBestSeller = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/bestsellers",
      { withCredentials: true }
    );
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching:", error);
    return [];
  }
};

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
      // console.log("res.data", response.data);
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

export const registerAdmin = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/admin/register",
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data; // Return response data if needed
  } catch (error) {
    console.error("Registration Error:", error);
    throw error; // Rethrow the error to handle it in the component
  }
};

// All Product

export const getAllProducts = async (page = 1, limit = 6) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/products",
      {
        params: { page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], totalCount: 0, totalPages: 0, currentPage: 1 };
  }
};

export const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:8000/api/admin/product/${productId}`, {
      withCredentials: true,
    });
    // console.log("Product deleted successfully", productId);
    return { success: true, productId };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error: error.message };
  }
};

export const searchProducts = async (query, page = 1, limit = 30) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/product/search",
      {
        params: { query, page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Seller

export const getApprovedSellers = async (page = 1, limit = 30) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/admin/sellers`,
      {
        params: {
          page,
          limit,
        },
        withCredentials: true,
      }
    );
    // console.log("Sellers from Actions", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    throw error;
  }
};

export const deleteSeller = async (sellerId) => {
  try {
    await axios.delete(`http://localhost:8000/api/admin/seller/${sellerId}`, {
      withCredentials: true,
    });
    // console.log("Seller deleted successfully", sellerId);
    return { success: true, sellerId };
  } catch (error) {
    console.error("Error deleting seller:", error);
    return { success: false, error: error.message };
  }
};

export const searchSellers = async (searchQuery, page = 1, limit = 30) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/admin/seller/search`,
      {
        params: {
          query: searchQuery,
          page,
          limit,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Users

export const getUsers = async (page = 1, limit = 30) => {
  try {
    const response = await axios.get("http://localhost:8000/api/admin/users", {
      params: {
        page,
        limit,
      },
      withCredentials: true,
    });
    // console.log("Users from Actions", response.data);

    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Order List

export const getOrderList = async (page, limit) => {
  try {
    const response = await axios.get("http://localhost:8000/api/admin/orders", {
      params: { page, limit },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { orders: [], totalCount: 0 };
  }
};

//Seller Approval
export const getSellers = async (page = 1, limit = 40) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/sellerstoapproval",
      {
        params: {
          page,
          limit,
        },
        withCredentials: true,
      }
    );

    // console.log("Sellers from Actions", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sellers:", error);
    return { success: false, message: "Error fetching sellers" };
  }
};

export const approveSeller = async (sellerId) => {
  try {
    const response = await axios.put(
      `http://localhost:8000/api/admin/approveSeller/${sellerId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error approving seller:", error);
    throw error;
  }
};

export const rejectSeller = async (sellerId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8000/api/admin/rejectSeller/${sellerId}`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error rejecting seller:", error);
    throw error;
  }
};

//Report Feedback

export const toDeleteSeller = async (page, limit) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/todeleteseller",
      {
        params: { page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    // console.log("Error fetching issue sellers:", error);
    return { results: [], totalCount: 0 };
  }
};

export const toWarnSeller = async (page, limit) => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/admin/towarnseller",
      {
        params: { page, limit },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    // console.log("Error fetching issue sellers:", error);
    return { results: [], totalCount: 0 };
  }
};

export const warnSeller = async (sellerId) => {
  try {
    const response = await axios.post(
      `http://localhost:8000/api/admin/warnseller`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending warning email:", error);
    throw error;
  }
};

export const getMonthlyOrderSummary = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/order-count-last-six-months",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching monthly order summary:", error);
    throw error;
  }
};
