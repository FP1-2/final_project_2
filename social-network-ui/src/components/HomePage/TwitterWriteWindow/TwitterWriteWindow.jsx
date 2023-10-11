import React, { useState, useEffect } from "react";

import styles from "./TwitterWriteWindow.module.scss";
import ImageInput from "../ImageInput/ImageInput";
import MultilineTextFields from "../WriteInput/MultilineTextFields";
import Avatar from "@mui/material/Avatar";
import postApiPost from "../../../api/postApiPost";
import PropTypes from "prop-types";
import axios, { Axios } from "axios";
import { Image, CloudinaryContext, Transformation } from "cloudinary-react";
import cloudinaryCore from "../../../api/cloudinaryConfig";

const TwitterWriteWindow = ({
  setTweetPost,
  tweetPosts,
  userPhoto,
  firstName,
  lastName,
}) => {
  console.log(userPhoto);
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [userId, setUserId] = useState(9); //токен

  //   const handleTextInput = (event) => {
  //     setDescription(event.target.value);
  //   };

  const handlePhotoInput = (event) => {
    //  console.log(files[0]);
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "danit2023");
    axios
      .post("https://api.cloudinary.com/v1_1/dl4ihoods/image/upload", formData)
      .then((response) => {
        setPhoto(response.data.url);
      });

    //   setPhoto(event.target.value);
  }; // переписати для клаудінарі

  const handleSubmit = (event) => {
    event.preventDefault();

    // Form validation
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    //  if (!photo) {
    //    setError("Photo is required");
    //    return;
    //  }
    postApiPost(userId, photo, description)
      .then((response) => {
        setTweetPost([response.data, ...tweetPosts]);
        setDescription(""); // Clear input fields on successful submission
        setPhoto("");
        //   setError("");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form className={styles.writeWindow} onSubmit={handleSubmit}>
        {userPhoto ? ( // Перевірка наявності фото у користувача
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={userPhoto}
            sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
          />
        ) : (
          // Якщо фото відсутнє, виводимо ініціали імені та прізвища
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
          {/* <Image cloudName="dl4ihoods" src={photo} /> */}

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
};

export default TwitterWriteWindow;
