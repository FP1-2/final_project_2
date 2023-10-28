import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL || "";

const getApiPosts = async (token) => {
  try {
    const response = await axios.get(url + "/api/v1/profile-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getApiPosts;
