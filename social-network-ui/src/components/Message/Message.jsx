import { Box } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import InputCreatMessage from "../InputCreateMessage/InputCreateMessage";


function Message() {
  const messages = useSelector((state) => state.chat.messages);
  return (

 <Box>
     
      {messages?.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
       <InputCreatMessage />
    </Box>
  
   
  );
}

export default Message;
