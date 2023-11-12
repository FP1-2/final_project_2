import axios from "axios";
export async function getChatMessages(chatID, token) {
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_SERVER_URL || ""
      }/api/v1/get-messages-chat/${chatID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}