import axios  from "axios";
export async function getAllUsers(username, token) {
  try {
 if (username.length == 0) {
  username = 'z'
 }

    const { data } = await axios.get(
      `${process.env.REACT_APP_SERVER_URL || ''}/api/v1/find-user/${username}`,
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
