import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
// import { getMembers, setChatId } from "../../redux/slices/chatSlice";
import UseUserToken from "../../hooks/useUserToken";
import ChatMembers from "../ChatMembers/ChatMembers";
import {
  // fetchChats,
   setChatId,
  setMessages,
  // createMessage,
  // setError,
} from "../../redux/slices/chatSlice";
import {getChatMessages} from '../../api/getChatMessages';

import { Box } from "@mui/material";
import PropTypes from "prop-types";
import {fetchChats} from '../../redux/thunks/chatThunk'

function Chats() {
  const { token } = UseUserToken();

  //  const [chats, setChats] = useState(null)
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  //  const userId = useSelector(state => state.user?.userId)
  //  console.log(userId);
console.log(chats);
  const error = useSelector((state) => state.chat.error);
  useEffect(() => {
    dispatch(fetchChats(token));
  }, [dispatch, token]);

  async function fetchMessages(chatId) {
    console.log(chatId);
    const data = await getChatMessages(chatId, token);

    dispatch(setMessages(data));
    dispatch(setChatId(chatId));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
      }}
    >
      {/* <div onClick={() => {}} style={{width: '100%'}}> */}
      {chats?.map((chat) => (
   
        <ChatMembers
         key={chat.id}
          fetchMessages={fetchMessages}
         
          chatmembers={chat}
        />
      ))}
      {/* </div> */}
    </Box>
  );
}

export default Chats;
