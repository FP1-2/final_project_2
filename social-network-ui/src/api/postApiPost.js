import axios from "axios";

const postApiPost = (userId, photo, description) => {
  return axios.post(
    "http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/user/9/post",
    {
      id: 0,
      userId: userId,
      photo: photo,
      description: description,
    }
  );
};
export default postApiPost;
