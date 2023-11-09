import React, { useState,useEffect } from "react";
import { Avatar, Box, CssBaseline, Button, Input } from "@mui/material";
import { createMessage,getChatMessages,setMessages,fetchChats,setChats } from "../../redux/slices/chatSlice";

import PropTypes from "prop-types";
import UseUserToken from "../../hooks/useUserToken";
import { useDispatch } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
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
        type="text || file"
        label="enter your text message"
        placeholder="enter your text message"
        value={inputText}
        onChange={handleChange}
      />

      <Button
        onClick={sendMessage}
        type="submit"
        variant="contained"
 
        // margin="normal"
        sx={{
          boxSizing: 'border-box',
          // marginBottom: "1rem",
          padding: "5px",
          borderRadius: "50%",
          // fontSize: "1rem",
          // fontWeight: 700,
          textTransform: "none",
          backgroundColor: "#1DA1F2",
          width: '20px',
        height: '20px'
        }}
      ><SendIcon sx={{
        width: '20px',
        height: '20px'
      }}/> </Button>
    </Box>
  );
}
InputCreatMessage.propTypes = {
  chatId: PropTypes.number,
};
export default InputCreatMessage;
