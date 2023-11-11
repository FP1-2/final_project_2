import axios from "axios";

export async function getChats(userId, token) {

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
    console.error('Error fetching chats:', error);
    throw error;
  }
}

