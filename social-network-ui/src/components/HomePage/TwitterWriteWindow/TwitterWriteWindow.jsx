import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TwitterWriteWindow.module.scss";
import Avatar from "../../Avatar/Avatar";
import ImageInput from "../ImageInput/ImageInput";
import MultilineTextFields from "../WriteInput/MultilineTextFields";

const TwitterWriteWindow = () => {
  const [tweetPost, setTweetPost] = useState("");

  //   const [tweetImage, setTweetImage] = useState("");

  //   const [appState, setAppState] = useState();

  //   useEffect(() => {
  //     const urlPOST = "/api/v1/user/{user_id}/post";
  //     axios.post(urlPOST).then((resp) => {
  //       const allPersons = resp.data;
  //       console.log(allPersons);
  //       setAppState(allPersons);
  //     });
  //   }, [setAppState]);

  async function handlePostSubmit(e) {
    e.preventDefault();
    console.log({ tweetPost });
    //  console.log(urlPOST);
    //  const urlPOST =
    //    "http://twitterdanit.us-east-1.elasticbeanstalk.com/api/v1/user/3/posts?page=0&size=10";

    //  await axios
    //    .get(urlPOST)
    //    .then((data) => console.log(data.data))
    //    .catch((err) => console.log(err));
  }
  return (
    <div>
      <form className={styles.writeWindow} onSubmit={handlePostSubmit}>
        <Avatar />
        <div className={styles.writeWindowBody}>
          <MultilineTextFields
            value={tweetPost}
            onChange={(e) => setTweetPost(e.target.value)}
          />
          <div className={styles.writeWindowFooter}>
            <div>
              <ImageInput />
            </div>
            <button className={styles.postBtn}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TwitterWriteWindow;
