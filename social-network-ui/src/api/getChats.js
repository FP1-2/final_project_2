import axios from "axios";

export async function getChats(userId, token) {
  console.log(userId);
  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/get-chats-user/${userId}`,
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