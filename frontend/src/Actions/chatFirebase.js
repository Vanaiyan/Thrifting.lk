import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  where,
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
import { encryptMessage, decryptMessage } from "./encrypt";

export const getMessagesForChat = async (
  chatId,
  currentUser,
  loginUser,
  callback
) => {
  const db = getFirestore(app);

  try {
    // Check if the chat exists
    const docRef = doc(db, "chats", chatId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const chatData = docSnap.data();

      // Check if loginUser is authorized
      if (!chatData.AuthorizedId.includes(loginUser)) {
        throw new Error("User not authorized to access this chat.");
      }
      const messagesCollectionRef = collection(docRef, "messages");
      const messagesQuery = query(messagesCollectionRef, orderBy("timestamp"));

      // Fetch old messages
      const messagesSnapshot = await getDocs(messagesQuery);
      const oldMessages = messagesSnapshot.docs.map((doc) => {
        const data = doc.data();
        // Decrypt the message text
        const decryptedText = decryptMessage(data.text);
        return {
          ...data,
          text: decryptedText,
          timestamp: data.timestamp ? data.timestamp.toMillis() : null, // Handle null timestamp
        };
      });

      // Log old messages
      // console.log("Old Messages:", decryptMessage);

      // Use the callback to provide old messages to the frontend
      callback(oldMessages);

      // Set up a real-time listener for subsequent updates
      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const updatedMessages = snapshot.docs.map((doc) => {
          const data = doc.data();
          // Decrypt the message text
          const decryptedText = decryptMessage(data.text);
          return {
            ...data,
            text: decryptedText,
            timestamp: data.timestamp ? data.timestamp.toMillis() : null, // Handle null timestamp
          };
        });
        // console.log("Updated Messages:", updatedMessages);

        // Use the callback to update the frontend state with new messages
        callback(updatedMessages);
      });

      // Return the unsubscribe function to allow the caller to stop listening when needed
      return unsubscribe;
    } else {
      if (currentUser) {
        // console.log("Authorized Ids", currentUser, loginUser);
        // Create a new document with the specified chatId and initial data
        const initialData = {
          AuthorizedId: [loginUser, currentUser],
          lastTimestamp: serverTimestamp(),
        }; // You can customize the initial data
        await setDoc(docRef, initialData);
        // console.log("New document created:", initialData);
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

  // Encrypt the message text
  const encryptedText = encryptMessage(text);

  // Reference to the chat document
  const chatDocRef = doc(db, "chats", chatId);

  try {
    // Add a new message document to the "messages" subcollection
    await addDoc(collection(chatDocRef, "messages"), {
      senderId: userId,
      text: encryptedText,
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

export const getSortedUsers = async (loginUser) => {
  const db = getFirestore(app);

  try {
    // Get all chat documents sorted by lastTimestamp in descending order
    const chatsCollectionRef = collection(db, "chats");
    // console.log("lg Id in actions", loginUser);
    const chatsQuery = query(
      chatsCollectionRef,
      where("AuthorizedId", "array-contains", loginUser),
      orderBy("lastTimestamp", "desc")
    );

    const chatsSnapshot = await getDocs(chatsQuery);
    const chatDocuments = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));

    // console.log("chDocs", chatDocuments);
    // Filter out documents that do not have a messages subcollection
    const validChatDocumentsPromises = chatDocuments.map(async (chat) => {
      const messagesCollectionRef = collection(
        db,
        "chats",
        chat.id,
        "messages"
      );
      const messagesSnapshot = await getDocs(messagesCollectionRef);
      return messagesSnapshot.size > 0 ? chat.data : null;
    });

    const validChatDocuments = (
      await Promise.all(validChatDocumentsPromises)
    ).filter((chat) => chat);
    // console.log("valid chat docs", validChatDocuments);
    // Extract ReceiverId from each valid chat document
    const sortedReceivers = validChatDocuments.map((chat) => {
      // Find the ID that is not equal to loginUser
      return chat.AuthorizedId.find((id) => id !== loginUser);
    });
    // console.log("sorted Receivers", sortedReceivers);

    // Remove duplicates
    const uniqueSortedReceivers = Array.from(new Set(sortedReceivers));
    // console.log("from Actions", uniqueSortedReceivers);
    return uniqueSortedReceivers;
  } catch (error) {
    console.error("Error fetching sorted receivers:", error);
    // Handle the error appropriately
    throw error;
  }
};
