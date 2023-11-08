import React, { useEffect } from "react";
import {
  getAllUsers,
  closeChatModal,
  createChat,
  getChatMembers,
  setChatId,
  setError, fetchChats, getChatMessages, setMessages,
} from '../../redux/slices/chatSlice'
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Checkbox,
  Modal,
  FormLabel,
  InputLabel,
  TextField,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import ModalForm from "./ModalForm";
import UseUserToken from "../../hooks/useUserToken";
import Chats from "../Chats/Chats";

function ModalNewChat() {
   const chatMember = useSelector((state) => state.chat.newChatMembers);
  const dispatch = useDispatch();
  const users = getAllUsers();
  console.log(users);
  const isOpen = useSelector((state) => state.chat.modalProps.isOpenChat);
  const handleCloseModal = () => {
    dispatch(closeChatModal(!isOpen));
  };

  const { token } = UseUserToken();

  async function sendChat() {
    try {
      const chatData = {
        membersChat: [chatMember],
      };

      const chatId = await createChat(chatData, token);
      dispatch(fetchChats(token));
      dispatch(setChatId(chatId));
      const updatedChat = await getChatMessages(chatId, token);
      dispatch(setMessages(updatedChat));
      handleCloseModal()
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
  // useEffect(() => {
  //   dispatch(createChat(token));
  // }, [chat, token]);

  return (
    <Box>
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
            <div>x</div>
            <div>New message</div>
            {<Chats /> && <Button onClick={() => sendChat()}>next</Button>}
          </Box>
          <Box
            sx={{
              width: "100%",
            }}
          >
            <TextField sx={{ width: "100%" }} label="search people"></TextField>
            <Box>
              {users?.map((user) => (
                <ModalForm key={user.id} user={user} />
              ))}
            </Box>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ModalNewChat;
