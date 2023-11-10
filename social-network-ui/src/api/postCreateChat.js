import axios from "axios";
export   async function createChat(chat, token) {
  try {
    
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL || ""}/api/v1/create-chat`,

      chat,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    throw error;
  }
}