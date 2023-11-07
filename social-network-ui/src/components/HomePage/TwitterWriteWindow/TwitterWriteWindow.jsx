import React, { useState } from "react";
import styles from "./TwitterWriteWindow.module.scss";
import ImageInput from "../ImageInput/ImageInput";
import MultilineTextFields from "../WriteInput/MultilineTextFields";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import postApiPost from "../../../api/postApiPost";
import PropTypes from "prop-types";
import axios from "axios";
import { Image } from "cloudinary-react";
import jwt from "jwt-decode";

const TwitterWriteWindow = ({
  setTweetPost,
  tweetPosts,
  userPhoto,
  firstName,
  lastName,
  token,
}) => {
  console.log(token);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userId, setUserId] = useState(jwt(token).id);
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

    //  if (!description.trim()) {
    //    setError("Description is required");
    //    return;
    //  }

    postApiPost(userId, photo, description, token)
      .then((response) => {
        setTweetPost([response.data, ...tweetPosts]);
        setDescription("");
        setPhoto("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={styles.writeWindow} onSubmit={handleSubmit}>
      <Box sx={{ width: "100%", display: "flex" }}>
        {userPhoto ? (
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={userPhoto}
            sx={{ width: 50, height: 50, mr: 2 }}
          />
        ) : (
          <Avatar sx={{ width: 50, height: 50, mr: 2 }}>
            {firstName.charAt(0)}
            {lastName.charAt(0)}
          </Avatar>
        )}

        <MultilineTextFields
          sx={{}}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Box>

      {photo && (
        <Image
          style={{
            width: 360,
            height: 300,
            objectFit: "cover",
            marginTop: "15px",
            marginLeft: "65px",
          }}
          cloudName="dl4ihoods"
          publicId={photo}
        ></Image>
      )}
      <div className={styles.writeWindowFooter}>
        <ImageInput file={photo} onChange={handlePhotoInput} />

        <button className={styles.postBtn}>Post</button>
      </div>
    </form>
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
