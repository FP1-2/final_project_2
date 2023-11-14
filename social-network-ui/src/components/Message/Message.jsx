import React, { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import InputCreatMessage from "../InputCreateMessage/InputCreateMessage";

function Message() {
  const messages = useSelector((state) => state.chat.messages);
  const chatId = useSelector((state) => state.chat.chatId);

  const scrollContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  return (
    <>
      <Box
        className="ref"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Box
          ref={scrollContainerRef}
          sx={{
            width: "100%",
            flexGrow: 1,
          }}
        >
          {messages?.map((message, index) => (
            <div
              key={message.id}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <MessageItem message={message} />
            </div>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignContent: "flex-end",
          alignItems: "center",
          mt: "30px",
        }}
      >
        <InputCreatMessage chatId={chatId} />
      </Box>
    </>
  );
}

export default Message;
