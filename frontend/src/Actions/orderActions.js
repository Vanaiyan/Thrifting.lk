import axios from "axios";

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/orders`,
      {
        withCredentials: true,
      }
    );
    // console.log(response.data.orders);
    return response.data.orders;
  } catch (error) {
    throw new Error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    );
  }
};
