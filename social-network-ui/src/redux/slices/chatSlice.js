import { createSlice } from "@reduxjs/toolkit";
import {fetchChats} from '../thunks/chatThunk'
import UseUserToken from "../../hooks/useUserToken";
import getUserId from "../../utils/getUserId";
import axios from "axios";

const userId = getUserId()

const initialState = {
  chats: [],
  chatsStorage: [],
  error: null,
  messages: null,
  chatId: null,
    currentPage: 0,
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
    setChatsStorage: (state, action) => {
      return { ...state, chatsStorage: action.payload };
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
      setCurrentPage: (state, action) => {
      return { ...state, currentPage: action.payload };
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

     return {...state, chats: action.payload , chatsStorage: action.payload }
    })
  },
});

export const { setChats, setError, setMessages, setChatId,setCurrentPage,openChatModal,closeChatModal,addChatMember,removeChatMember,setUsers } = chatSlice.actions;

export default chatSlice.reducer;