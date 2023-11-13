import React, { useEffect } from "react";
import { setChatId, setError, setMessages } from "../../redux/slices/chatSlice";
import { getAllUsers } from "../../api/getAllUsers";
import { closeChatModal, setUsers } from "../../redux/slices/chatSlice";
import { getChatMessages } from "../../api/getChatMessages";
import { createChat } from "../../api/postCreateChat";
import { useDispatch, useSelector } from "react-redux";
import { fetchChats } from "../../redux/thunks/chatThunk";
import { Box, Modal, ThemeProvider, TextField, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import ModalForm from "./ModalForm";
import UseUserToken from "../../hooks/useUserToken";
import Chats from "../Chats/Chats";

function ModalNewChat() {
  const { token } = UseUserToken();
  const chatMember = useSelector((state) => state.chat.newChatMembers);
  const users = useSelector((state) => state.chat.users);
   const userId = useSelector((state) => state.user?.userId);
  const dispatch = useDispatch();

  const isOpen = useSelector((state) => state.chat.modalProps.isOpenChat);
  const handleCloseModal = () => {
    dispatch(closeChatModal(!isOpen));
  };

  async function findUsers(event) {
    const username = event.target.value;
    const users = await getAllUsers(username, token);

    dispatch(setUsers(users));
  }
  async function sendChat() {
    try {
      const chatData = {
        membersChat: [chatMember],
      };

      const chatId = await createChat(chatData, token);
      dispatch(fetchChats(userId));
      dispatch(setChatId(chatId));
      const updatedChat = await getChatMessages(chatId, token);
      dispatch(setMessages(updatedChat));
      handleCloseModal();
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
const theme = createTheme({
	// custom theme
	typography: {
		h3: {
			fontSize: "2.5rem",
			fontWeight: 700,
		},
	},
});
  return (
    <ThemeProvider theme={theme}>
    <Box >
      <Modal open={isOpen} onClose={() => handleCloseModal()}>
        <Box
          sx={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "60%",
            p: 1,
            pb: 32,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxHeight: "95vh",
            overflowY: "auto",
            bgcolor: "white",
            boxShadow: 24,
            borderRadius: "7px",
            "@media (max-width: 600px)": {
              width: "100%",
              height: "100%",
              maxHeight: "100vh",
              borderRadius: "0px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Box onClick={() => handleCloseModal()} sx={{
              cursor: 'pointer'
            }}>&#10005;</Box>
            <Box>New message</Box>
            {<Chats /> && <Button onClick={() => sendChat()}>next</Button>}
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <TextField
              onChange={findUsers}
              sx={{ width: "100%" }}
              label="search people"
            ></TextField>
            <Box>
              {users &&
                users?.map((user) => <ModalForm key={user.id} user={user} />)}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
    </ThemeProvider>
  );
}

export default ModalNewChat;
