import { createSlice } from "@reduxjs/toolkit";
import {fetchChats} from '../thunks/chatThunk'
import getUserId from "../../utils/getUserId";

const userId = getUserId()

const initialState = {
  chats: [],
  error: null,
  messages: null,
  chatId: null,
  newChatMembers: null,
  modalProps: {
		isOpen: false,
	},
  users: []
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChats: (state, action) => {
      return { ...state, chats: action.payload };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
    setMessages: (state, action) => {
      return { ...state, messages: action.payload };
    },
    setChatId: (state, action) => {
      return { ...state, chatId: action.payload };
    },
    addChatMember: (state, action) => {
      return { ...state, newChatMembers: action.payload };
    },
      removeChatMember: (state, action) => {
      return { ...state, newChatMembers: action.payload };
    },
    	openChatModal: (state, action) => {

			state.modalProps.isOpenChat = true
		},
		closeChatModal: state => {
			state.modalProps.isOpenChat = false
		},
    setUsers: (state, action) => {
      return {...state, users: action.payload}
    }
  },
    extraReducers: (builder) => {

    builder.addCase(fetchChats.fulfilled, (state, action) => {

     return {...state, chats: action.payload}
    })
  },
});

export const { setChats, setError, setMessages, setChatId,openChatModal,closeChatModal,addChatMember,removeChatMember,setUsers } = chatSlice.actions;

export default chatSlice.reducer;
