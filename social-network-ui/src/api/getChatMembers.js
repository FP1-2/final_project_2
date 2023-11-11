import axios from "axios";
export async function getChatMembers(chatID, token) {
   
  try {
    const { data } = await axios.get(
      `${
        process.env.REACT_APP_SERVER_URL || ""
      }/api/v1/get-members-chat/${chatID}`,
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
