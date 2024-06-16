import axios from "axios";

export const loginUser = async (email, password) => {
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
        credentials: "include",
        withCredentials: true,
      }
    );

    const data = response;
    const cookie = response.data.token;

    document.cookie = `token=${cookie}; path=/`; // Adjust the cookie name and path as needed

    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
