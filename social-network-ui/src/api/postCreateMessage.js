import axios from "axios";
export async function createMessage(message, token) {
  try {
    
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL || ""}/api/v1/message`,

      message,
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