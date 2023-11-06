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
    <Box>

<InfiniteScroll

        dataLength={messages.length}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        <Box>
          {messages?.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </Box>
      </InfiniteScroll>
   
      

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
        }}
      >
        <InputCreatMessage chatId={chatId} />
      </Box>
    </Box>
  );
}

export default Message;
