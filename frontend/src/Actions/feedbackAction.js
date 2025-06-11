import axios from "axios";

export const postFeedbackAction = async (
  productId,
  sellerId,
  issueCategory,
  rating,
  review
) => {
  try {
    // console.log(
    //   "seller",
    //   sellerId,
    //   "prod Id",
    //   productId,
    //   "issueCategory",
    //   issueCategory,
    //   "rating",
    //   rating,
    //   "review",
    //   review
    // );
    const response = await axios.post(
      `http://localhost:8000/api/feedback`,
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
