import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TwitterWriteWindow.module.scss";
import Avatar from "../../Avatar/Avatar";
import ImageInput from "../ImageInput/ImageInput";
import MultilineTextFields from "../WriteInput/MultilineTextFields";

const TwitterWriteWindow = () => {
  const [tweetPost, setTweetPost] = useState("");

  const [tweetImage, setTweetImage] = useState("");

  const [appState, setAppState] = useState();

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
    const urlPOST = "/api/v1/user/{user_id}/post";
    const user = {
      id: 22,
      user: {
        id: 22,
        username: "Sn",
        firstName: "SN",
        lastName: "KN",
        email: "string",
        birthday: "string",
        avatar: "string",
      },
      description: "string",
      photo: "string",
      createdDate: "2023-09-28T19:37:05.432Z",
      timeWhenWasPost: "string",
      usersReposts: [
        {
          id: 0,
          username: "string",
          firstName: "string",
          lastName: "string",
          email: "string",
          birthday: "string",
          avatar: "string",
        },
      ],
      isRepost: true,
    };

    await axios({
      method: "post",
      url: urlPOST,
      data: {
        user,
      },
    })
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
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
