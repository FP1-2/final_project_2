import React, { useState, useEffect } from "react";

import styles from "./TwitterWriteWindow.module.scss";
import ImageInput from "../ImageInput/ImageInput";
import MultilineTextFields from "../WriteInput/MultilineTextFields";
import Avatar from "@mui/material/Avatar";
import postApiPost from "../../../api/postApiPost";
import PropTypes from "prop-types";
import axios from "axios";
import { Image } from "cloudinary-react";
// import UseUserToken from "../../../hooks/useUserToken";
import jwt from 'jwt-decode'

const TwitterWriteWindow = ({
  setTweetPost,
  tweetPosts,
  userPhoto,
  firstName,
  lastName,
  token,
}) => {
  //   console.log(userPhoto);
  //   const { token } = UseUserToken();
  console.log(token);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userId, setUserId] = useState(jwt(token).id); //токен
  console.log(token);

  const handlePhotoInput = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "danit2023");
    axios
      .post("https://api.cloudinary.com/v1_1/dl4ihoods/image/upload", formData)
      .then((response) => {
        setPhoto(response.data.url);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    postApiPost(userId, photo, description, token)
      .then((response) => {
        setTweetPost([response.data, ...tweetPosts]);
        setDescription("");
        setPhoto("");
        console.log(token);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className={styles.writeWindow} onSubmit={handleSubmit}>
        {userPhoto ? (
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={userPhoto}
            sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
          />
        ) : (
          <Avatar
            sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
          >
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </Avatar>
        )}

        <div className={styles.writeWindowBody}>
          <MultilineTextFields
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {photo && (
            <Image
              style={{ width: 360, height: 300 }}
              cloudName="dl4ihoods"
              publicId={photo}
            ></Image>
          )}
          <div className={styles.writeWindowFooter}>
            <div>
              <ImageInput file={photo} onChange={handlePhotoInput} />
            </div>
            <button className={styles.postBtn}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};

TwitterWriteWindow.propTypes = {
  onSubmit: PropTypes.func,
  setTweetPost: PropTypes.func.isRequired,
  tweetPosts: PropTypes.array.isRequired,
  userPhoto: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default TwitterWriteWindow;
