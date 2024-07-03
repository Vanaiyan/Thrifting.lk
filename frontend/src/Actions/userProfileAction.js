import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase"; // Adjust the import based on your file structure
const storage = getStorage(app);

export const fetchUserProfile = async (productId) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/user`,
      { withCredentials: true }
    );
    //   console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const updateUserProfile = async (updatedProfile) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/user`,
      updatedProfile,
      { withCredentials: true }
    );
    // console.log(response.data);
    return response.data.user; // Assuming your backend returns updated profile data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const uploadProfilePicture = async (file, onProgress) => {
  const storageRef = ref(storage, `profilePicture/${file.name}`);
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
    console.error("Error uploading profile to Firebase:", error);
    throw error;
  }
};

export const updateProfilePicture = async (profilePictureUrl) => {
  try {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND}/api/user/profilePicture`,
      { profilePicture: profilePictureUrl },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update profile picture", error);
    throw error;
  }
};
