import axios from "axios";

export const getUsers = async (keyword) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/getusers?keyword=${keyword}`,
      { withCredentials: true }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const searchUsers = async (keyword) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/searchusers?keyword=${keyword}`
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/user-profile`,
      {
        withCredentials: true,
      }
    );

    const data = response.data;
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getSellerProfileAction = async (sellerId) => {
  try {
    if (sellerId) {
      // console.log(sellerId);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND}/api/seller-profile/${sellerId}`,
        {
          withCredentials: true,
        }
      );

      const data = response.data;
      return data;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
