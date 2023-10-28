import axios from "axios";

const url = process.env.REACT_APP_SERVER_URL || "";

const postApiPost = async (userId, photo, description, token) => {
  if (!token) {
    throw new Error("Токен користувача не знайдено.");
  }

  return await axios.post(
    url + "/api/v1/post",
    {
      id: 0,
      userId: userId,
      photo: photo,
      description: description,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export default postApiPost;
