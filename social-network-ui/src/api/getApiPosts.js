import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL || "";

const getApiPosts = async (token, userId) => {
  try {
    const response = await axios.get(url + "/api/v1/profile-posts/" + userId, {
      // const response = await axios.get(url + "/api/v1/all-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error
  }
};

export default getApiPosts;
