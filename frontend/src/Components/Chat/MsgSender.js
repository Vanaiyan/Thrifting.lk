import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Colors } from "../../Styles/Theme";
import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { app } from "../../firebase";

export const MsgSender = () => {
  const [userText, setUserText] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(app);

      try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        const data = querySnapshot.docs.map(
          (doc) => doc.data().text // Access the "text" field directly
        );
        setUserText(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once when the component mounts

  return (
    <Box
      sx={{
        color: "#ffff",
        padding: "10px",
        backgroundColor: Colors.org1,
        borderRadius: "10px",
        margin: "10px",
        textAlign: "justify",
        width: { lg: "30vw", md: "40vw", sm: "50vw", xs: "60vw" },
      }}
    >
      <Typography variant="chat1">
        {/* Render fetched user data or any other logic you want to apply */}
        {userText.map((textData) => (
          <div key={textData.id}>{JSON.stringify(textData)}</div>
        ))}
      </Typography>
    </Box>
  );
};
