import { createSlice } from "@reduxjs/toolkit";

import UseUserToken from "../../hooks/useUserToken";
import useUserId from "../../hooks/useUserId";
import axios from 'axios';

const userId = useUserId()

const initialState = {
  chats: null,
  error: null,
  messages: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      return { ...state, chats: action.payload }
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
    setMessages:(state, action) => {
      return { ...state, messages: action.payload };
    },

    
  },
});

export const { setChats, setError, setMessages } = chatSlice.actions;

export const fetchChats = (token) => async (dispatch) => {
  try {
       const chatsIDs = await getChats();
      const chatPromises = chatsIDs.map(async (chat) => {
    
      const data = await getChatMembers(chat.id, token);
      return { ...chat, members: data };
    });

    const updatedChats = await Promise.all(chatPromises);
    dispatch(setChats(updatedChats));
    console.log(updatedChats);
  } catch (error) {
    if (error.response) {
      dispatch(setError(`Error ${error.response?.status}: ${error.response?.data}`));
    } else if (error.request) {
      dispatch(setError('Error: no response'));
    } else {
      dispatch(setError(`Error: ${error?.message}`));
    }
  }
};
export async function getChatMembers(chatID, token) {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/get-members-chat/${chatID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getChatMessages(chatID, token) {
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/get-messages-chat/${chatID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getChats(user) {
     try {

        // userId

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/get-chats-user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // const data = [
    //     {
    //     id:1,
    //    },
    //     {
    //     id: 2,
    //    },
    //    {
    //      id: 3,
    //    },
    //     {
    //      id: 4,
    //    },
    //     {
    //      id: 5,
    //    },
    //     {
    //      id: 6,
    //    },
    // ];
    return data;
  } catch (error) {
    throw error;
  }
}



export  async function createMessage(message,token) {
	try {
  //    return await axios.post(
  //   `${process.env.REACT_APP_SERVER_URL}` + "/api/v1/message",
  //   {
  //     text: "hfhhhh",
	// chatId: 2,
  //   },
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   }
  // );
		const { data } = await axios.post(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/message`,
      
			message,
        {
       headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      }
		)
		return data
	} catch (error) {
		throw error
	}
}


export default chatSlice.reducer
