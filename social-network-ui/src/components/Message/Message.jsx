import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import InputCreatMessage from "../InputCreateMessage/InputCreateMessage";
import { setMessages, setCurrentPage } from "../../redux/slices/chatSlice";
import { getChatMessages } from "../../api/getChatMessages";
import UseUserToken from "../../hooks/useUserToken";
import axios from "axios";
function Message() {
  const messages = useSelector((state) => state.chat.messages);
  const chatId = useSelector((state) => state.chat.chatId);
  const currentPage = useSelector((state) => state.chat.currentPage);
  const { token } = UseUserToken();
  const [isLoading, setIsLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const scrollContainerRef = useRef(null);
  const topRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (fetching) {
      axios
        .get(
          `${
            process.env.REACT_APP_SERVER_URL || ""
          }/api/v1/get-messages-chat/${chatId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              page: currentPage,
              size: 10,
            },
          }
        )
        .then((response) => {
          dispatch(setMessages([...messages, ...response.data]));
          dispatch(setCurrentPage(currentPage + 1));
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  const handleScroll = (e) => {
    if (e.target.documentElement.scrollTop <= 10) {
      setFetching(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          ref={scrollContainerRef}
          sx={{
            width: "100%",
            flexGrow: 1,
            overflowY: "auto",
          }}
        >
          {messages
            ?.map((message, index) => (
              <div
                key={message.id}
                ref={index === messages.length - 1 ? topRef : null}
              >
                <MessageItem message={message} />
              </div>
            ))
            .reverse()}
          {isLoading && <div>Loading...</div>}
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
