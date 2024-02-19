// import React, { useEffect, useState } from "react";
// import NavChat from "../../Components/Chat/Navchat";
// import { ChatUser } from "../../Components/Chat/ChatUser";
// import { Box, Grid, Paper } from "@mui/material";
// import { ChTitle } from "../../Components/Chat/ChTitle";
// import { MsgReceiver } from "../../Components/Chat/MsgReceiver";
// import { MsgSender } from "../../Components/Chat/MsgSender";
// import ChatInput from "../../Components/Chat/ChatInput";
// import { Colors } from "../../Styles/Theme";
// import { useCollectionData } from "react-firebase-hooks/firestore";
// import { getFirestore, collection, query, getDocs } from "firebase/firestore";

// export const Chat = () => {
//   function ChatRoom() {
//     const firestore = getFirestore(); // Use getFirestore to get the Firestore instance
//     const messagesRef = collection(firestore, "messages");
//     const query = query(messagesRef.orderBy("createdat").limit(25));

//     const [messages, loading] = useCollectionData(query, { idField: "id" });

//     // If data is still loading, you might want to return a loading indicator or handle it in your UI
//     if (loading) {
//       return <p>Loading...</p>;
//     }

//     return messages || []; // Return an empty array if messages is undefined
//   }

//   const messages = ChatRoom();

//   return (
//     <div>
//       <NavChat />
//       <Grid container sx={{}}>
//         <Grid item>
//           <ChatUser />
//           <ChatUser />
//           <ChatUser />
//           <ChatUser />
//           <ChatUser />
//         </Grid>

//         <Grid
//           item
//           sx={{
//             display: "flex",
//             flexWrap: "wrap",
//           }}
//         >
//           <Paper
//             elevation={0}
//             sx={{
//               padding: "10px",
//               margin: "10px",
//               height: "85vh",
//               borderRadius: "10px",
//               border: "2px solid ",
//               display: "block",
//               alignItems: "flex-end",
//               borderColor: Colors.org4,
//             }}
//           >
//             <ChTitle />
//             <MsgSender />
//             <Box sx={{ overflowY: "scroll" }}>
//               {messages.map((msg) => (
//                 <MsgSender key={msg.id} message={msg} />
//               ))}
//               <MsgSender />
//             </Box>
//             <ChatInput />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
