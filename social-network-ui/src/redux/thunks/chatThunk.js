import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChats } from "../../api/getChats";
import { getChatMessages } from "../../api/getChatMessages";
import { getChatMembers } from "../../api/getChatMembers";
import getUserToken from "../../utils/getUserToken";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      const token = getUserToken();

      if (!userId) {
        return rejectWithValue("User ID not available");
      }

      const chatsIDs = await getChats(userId, token);
      const chatPromises = chatsIDs.map(async (chatId) => {
        const data = await getChatMessages(chatId, token);

        let lastMessage = null;

        if (data.length > 0) {
          lastMessage = data[data.length - 1];
        } else {
          const chatMembers = await getChatMembers(chatId, token);
          lastMessage = {
            text: "",
            // user: chatMembers.length > 1 ? chatMembers[1] : chatMembers[0],
             user:  chatMembers[0]
          };
        }

        return { id: chatId, lastMessage: lastMessage };
      });

      const updatedChats = await Promise.all(chatPromises);

      return updatedChats;
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
      return rejectWithValue(error);
    }
  }
);
