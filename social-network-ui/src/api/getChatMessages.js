import axios from "axios";
export async function getChatMessages(chatID, token, page = 0, size = 10) {
  
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_SERVER_URL || ""
      }/api/v1/get-messages-chat/${chatID}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          page,
          size,
        }
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}