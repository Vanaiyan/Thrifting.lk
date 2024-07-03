import axios from "axios";

export const postFeedbackAction = async (
  productId,
  sellerId,
  issueCategory,
  rating,
  review
) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND}/api/feedback`,
      {
        productId,
        sellerId,
        rating,
        review,
        issueCategory,
      },
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
