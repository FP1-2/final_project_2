import React, { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import InputCreatMessage from "../InputCreateMessage/InputCreateMessage";

function Message() {
  const messages = useSelector((state) => state.chat.messages);
  const chatId = useSelector((state) => state.chat.chatId);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
    >
   

        <Box
          sx={{
            width: "100%",
            // overflow: "auto",
            // height: "80vh",
          }}
        >
          
          {messages?.map((message) => {
          return  <MessageItem key={message.id} message={message} />
})}
   

        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            width: "80%",
          }}
        >
          <InputCreatMessage chatId={chatId} />
        </Box>
    </Box>
  );
}

export default Message;
