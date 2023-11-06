import React, { useState } from "react";
import { Avatar, Box, CssBaseline, Button, Input } from "@mui/material";
import { createMessage,getChatMessages,setMessages,fetchChats,setChats } from "../../redux/slices/chatSlice";

import PropTypes from "prop-types";
import UseUserToken from "../../hooks/useUserToken";
import { useDispatch } from "react-redux";

function InputCreatMessage({ chatId }) {
  const { token } = UseUserToken();
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

//  async function sendMessage() {
//     const messageData = {
//       chatId: chatId,
//       text: inputText,
//     };
  
//     console.log(inputText);
   
//     createMessage(messageData, token);
//     const data = await getChatMessages(chatId, token);
//     dispatch(setMessages(data));
//       async  const chats = await fetchChats(chatId, token);
//         console.log(chats);
//     dispatch(setChats(chats));

//   }

async function sendMessage() {
  try {
    const messageData = {
      chatId: chatId,
      text: inputText,
    };

  
    await createMessage(messageData, token);

  
    const updatedMessages = await getChatMessages(chatId, token);
    dispatch(setMessages(updatedMessages));

  
    // const updatedChats = await fetchChats(chatId, token);
    // dispatch(setChats(updatedChats));
    // console.log(updatedChats);
  } catch (error) {
    if (error.response) {
      dispatch(
        setError(`Error ${error.response?.status}: ${error.response?.data}`)
      );
    } else if (error.request) {
      dispatch(setError("Error: no response"));
    } else {
      dispatch(setError(`Error: ${error?.message}`));
    }
  }
}




  const handleChange = (e) => {
    console.log(e.target.value);
    setInputText(e.target.value);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
      }}
    >
      <Input
        name="text"
        type="text"
        label="enter your text message"
        placeholder="enter your text message"
        value={inputText}
        onChange={handleChange}
      />

      <Button
        onClick={sendMessage}
        type="submit"
        variant="contained"
        fullWidth
        margin="normal"
        sx={{
          marginBottom: "1.3rem",
          padding: "1.1rem 0",
          borderRadius: "2rem",
          fontSize: "1rem",
          fontWeight: 700,
          textTransform: "none",
          backgroundColor: "#1DA1F2",
        }}
      />
    </Box>
  );
}
InputCreatMessage.propTypes = {
  chatId: PropTypes.number,
};
export default InputCreatMessage;
