import axios from "axios";
import { authSuccess } from "../Reducers/authSlice";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { app } from "../firebase"; // Adjust the import based on your file structure
// uploadImage.js or inside the same file as RegisterForm
const storage = getStorage(app);

export const uploadImageToFirebase = async (file, onProgress) => {
  const storageRef = ref(storage, `images/${file.name}`);
  try {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
    });

    const snapshot = await uploadTask;
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};

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
  return async (dispatch) => {
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
      const user = response.data.user;
      // console.log("Login Seller check1");
      // console.log("res", response);
      console.log("res.data", response.data);
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
export const uploadNicImages = async (file) => {
  const storageRef = ref(storage, `NIC_Images/${file.name}`);
  try {
    const uploadTask = uploadBytesResumable(storageRef, file);
    await uploadTask;
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};
