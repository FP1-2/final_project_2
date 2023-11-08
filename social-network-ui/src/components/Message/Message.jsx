import React, { useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import InputCreatMessage from "../InputCreateMessage/InputCreateMessage";
import InfiniteScroll from "react-infinite-scroll-component";

function Message() {
  const messages = useSelector((state) => state.chat.messages);
  const chatId = useSelector((state) => state.chat.chatId);
  const [hasMore, setHasMore] = useState(true);
 
  return (
    <Box sx={{
      width: '100%',
      display: 'flex'
    }}>

        <Box
          sx={{
            width: '100%',
            //  position: "fixed",
            // top: 0,
            height: "80%",
          }}
        >
          {messages?.map((message) => (
            <MessageItem key={message.id} message={message} />
          )).slice(-5)}
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
