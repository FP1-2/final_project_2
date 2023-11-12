import React, {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseUserToken from "../../hooks/useUserToken";
import ChatMembers from "../ChatMembers/ChatMembers";
import {
  setChatId,
  setMessages,
} from "../../redux/slices/chatSlice";
import { getChatMessages } from "../../api/getChatMessages";
import { Box } from "@mui/material";
import { fetchChats } from "../../redux/thunks/chatThunk";
import InfiniteScroll from "react-infinite-scroll-component";
import { ThemeProvider, createTheme } from '@mui/material/styles'
function Chats() {
  const { token } = UseUserToken();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const error = useSelector((state) => state.chat.error);
  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch, token]);

  async function fetchMessages(chatId) {
    const data = await getChatMessages(chatId, token);

    dispatch(setMessages(data));
    dispatch(setChatId(chatId));
  }
	const theme = createTheme({
		typography: {
	
			fontFamily: 'Segoe UI, sans-serif',

		},
    	})
  return (
        <ThemeProvider theme={theme}>
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%",
       
      }}
    >
      {chats?.map((chat) => (
        <ChatMembers
          key={chat.id}
          fetchMessages={fetchMessages}
          chatmembers={chat}
        />
      ))}
    </Box>
    </ThemeProvider>
  );
}

export default Chats;
