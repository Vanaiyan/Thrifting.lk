import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  onSnapshot,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../firebase";

export const getMessagesForChat = async (chatId, currentUser, callback) => {
  const db = getFirestore(app);

  try {
    // Check if the chat exists
    const docRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const messagesCollectionRef = collection(docRef, "messages");
      const messagesQuery = query(messagesCollectionRef, orderBy("timestamp"));

      // Fetch old messages
      const messagesSnapshot = await getDocs(messagesQuery);
      const oldMessages = messagesSnapshot.docs.map((doc) => doc.data());

      // Log old messages
      console.log("Old Messages:", oldMessages);

      // Use the callback to provide old messages to the frontend
      callback(oldMessages);

      // Set up a real-time listener for subsequent updates
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => doc.data());
        console.log("Updated Messages:", updatedMessages);

        // Use the callback to update the frontend state with new messages
        callback(updatedMessages);
      });

      // Return the unsubscribe function to allow the caller to stop listening when needed
      return unsubscribe;
    } else {
      if (currentUser) {
        // Create a new document with the specified chatId and initial data
        const initialData = {
          ReceiverId: currentUser,
          lastTimestamp: serverTimestamp(),
        }; // You can cusstomize the initial data
        await setDoc(docRef, initialData);
        console.log("New document created:", initialData);
        return initialData.messages;
      }
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    // Handle the error appropriately
    throw error;
  }
};

export const addMessageToChat = async (chatId, userId, text, imageUrl) => {
  const db = getFirestore(app);

  // Reference to the chat document
  const chatDocRef = doc(db, "chats", chatId);

  try {
    // Add a new message document to the "messages" subcollection
    await addDoc(collection(chatDocRef, "messages"), {
      senderId: userId,
      text: text,
      imageUrl: imageUrl,
      timestamp: serverTimestamp(),
    });
    await updateDoc(chatDocRef, { lastTimestamp: serverTimestamp() });
  } catch (error) {
    console.error("Error adding message to chat:", error);
    // Handle the error appropriately
    throw error;
  }
};

export const uploadImage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `images/${generateUniqueIdentifier()}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

export const generateUniqueIdentifier = () => {
  // Generate a random string of characters
  const randomString = Math.random().toString(36).substring(2, 8);

  // Get the current timestamp
  const timestamp = new Date().getTime();

  // Combine the random string and timestamp to create a unique identifier
  const uniqueIdentifier = `${randomString}_${timestamp}`;

  return uniqueIdentifier;
};

export const getSortedUsers = async () => {
  const db = getFirestore(app);

  try {
    // Get all chat documents sorted by lastTimestamp in descending order
    const chatsCollectionRef = collection(db, "chats");
    const chatsQuery = query(
      chatsCollectionRef,
      orderBy("lastTimestamp", "desc")
    );

    const chatsSnapshot = await getDocs(chatsQuery);
    const chatDocuments = chatsSnapshot.docs.map((doc) => doc.data());

    // Extract ReceiverId from each sorted chat document
    const sortedReceivers = chatDocuments.map((chat) => chat.ReceiverId);

    // Remove duplicates (if needed)
    const uniqueSortedReceivers = Array.from(new Set(sortedReceivers));

    return uniqueSortedReceivers;
  } catch (error) {
    console.error("Error fetching sorted receivers:", error);
    // Handle the error appropriately
    throw error;
  }
};
