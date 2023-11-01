import { createSlice } from "@reduxjs/toolkit";
import getChatMembers from '../../api/getChatMembers'
import UseUserToken from "../../hooks/useUserToken";


const initialState = {
    members: [],
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        getMembers: (state, action) => {
          console.log(action);
            state.members = getChatMembers(action.payload, token)
            
        },
    },
})

export const {getMembers} = chatSlice.actions
export default chatSlice.reducer