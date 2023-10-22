import { createSlice } from "@reduxjs/toolkit";



const chatSlice = createSlice({
  name: "chat",
  initialState: {
    user: {
      chats: {
            messages: ['hell' ]
          }
    }
    
  },
  reducers: {
    addchat: (state, action) => {
      state.chats.push(action.payload);
    },
    clearchat: (state, action) => {
     state.chats = state.chats.filter((chat) => chat.id !== action.payload)
    },
  },
});
export const {addchat, clearchat } = chatSlice.actions
export default chatSlice.reducer;
