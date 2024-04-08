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
