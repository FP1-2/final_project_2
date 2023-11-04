import React, { useState, useEffect } from "react";
import styles from "./Chats.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import getChatMembers from '../../api/getChatMembers'
import getUserData from "../../api/getUserInfo";
import { getMembers } from "../../redux/slices/chatSlice";
import UseUserToken from "../../hooks/useUserToken";
import ChatMembers from "../ChatMembers/ChatMembers";
import {
  fetchChats,
  getChatMessages,
  setMessages,
  createMessage,
} from "../../redux/slices/chatSlice";
import { Box } from "@mui/material";
import PropTypes from "prop-types";

function Chats() {
  const { token } = UseUserToken();

  //  const [chats, setChats] = useState(null)
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const error = useSelector((state) => state.chat.error);
  useEffect(() => {
    dispatch(fetchChats(token));
    // dispatch(fetchMessages(chatId))
  }, [dispatch, token]);

  async function fetchMessages(chatId) {
    //      const create = await createMessage( {
    //   text: "after 2",
    // chatId: 6,
    // }, token)
    const data = await getChatMessages(chatId, token);

    dispatch(setMessages(data));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      {/* <div onClick={() => {}} style={{width: '100%'}}> */}
      {chats?.map((chat) => (
        <ChatMembers
          fetchMessages={fetchMessages}
          key={chat.id}
          chatmembers={chat}
        />
      ))}
      {/* </div> */}
    </Box>
  );
}

export default Chats;
