import { createAsyncThunk } from '@reduxjs/toolkit';
import {getChats} from '../../api/getChats'
import {getChatMessages} from '../../api/getChatMessages'
import {getChatMembers} from '../../api/getChatMembers'
import getUserToken from '../../utils/getUserToken'
import getUserId from '../../utils/getUserId'
// import {useSelector} from 'react-redux'
const token = getUserToken()
const userId = getUserId()
// const userId = useSelector(state => state.user?.userId)
	
export const fetchChats = createAsyncThunk(
  'chats/fetchChats',
  async (token, { dispatch, getState, rejectWithValue }) => {
    try {
        const chatsIDs = await getChats(userId, token);
     console.log(chatsIDs);
      const chatPromises = chatsIDs.map(async (chatId) => {
          console.log(chatId);
        const data = await getChatMessages(chatId, token);
        console.log(data);
        let lastMessage = null;
        if (data.length > 0) {
          lastMessage = data[data.length - 1];
        } else {
          const chatMembers = await getChatMembers(chatId, token);
          lastMessage = {
            text: '',
            user: chatMembers.length > 1 ? chatMembers[1] : chatMembers[0],
          };
        }
        return { id: chatId, lastMessage: lastMessage };
      });

      const updatedChats = await Promise.all(chatPromises);
      console.log(updatedChats);
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