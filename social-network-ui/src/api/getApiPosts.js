import axios from "axios";
const urlGETposts =
  "http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/user/9/posts?page=0&size=10";
const getApiPosts = async (endpoint) => {
  try {
    const response = await axios.get(urlGETposts);
    return response.data;
    //  console.log(response.data);
  } catch (error) {
    console.error(error);
  }
  //   throw error;
};

export default getApiPosts;
