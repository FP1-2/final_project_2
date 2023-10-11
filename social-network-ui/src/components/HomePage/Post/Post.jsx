import React from "react";
import styles from "./Post.module.scss";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material//Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "@mui/material/Avatar";

import PropTypes from "prop-types";

const Post = ({ tweet }) => {
  console.log(tweet);
  return (
    <div className={styles.post}>
      {tweet.user.avatar ? ( // Перевірка наявності фото у користувача
        <Avatar
          alt={`${tweet.user.firstName} ${tweet.user.lastName}`}
          src={tweet.user.avatar}
          sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}
        />
      ) : (
        // Якщо фото відсутнє, виводимо ініціали імені та прізвища
        <Avatar sx={{ width: 50, height: 50, mr: 2, alignSelf: "flex-start" }}>
          {tweet.user.firstName.charAt(0)}
          {tweet.user.lastName.charAt(0)}
        </Avatar>
      )}
      <div className={styles.post__body}>
        <div className={styles.body__header}>
          <span className={styles.header__mainName}>
            {`${tweet.user.firstName} ${tweet.user.lastName}`}
          </span>
          <span className={styles.header__tagName}>{tweet.user.username}</span>
          <FiberManualRecordIcon style={{ fontSize: 10, color: "#737373" }} />
          <span className={styles.header__time}>{tweet.timeWhenWasPost}</span>
        </div>
        <div className={styles.body__main}>
          <p className={styles.main__twitte}>{tweet.description}</p>

          {tweet.photo && (
            <img src={tweet.photo} alt="" width={350} height={250} />
          )}
        </div>
        <div className={styles.body__footer}>
          <ChatBubbleOutlineIcon fontSize="small" />
          <span className={styles.counter}>1</span>
          <RepeatIcon fontSize="small" />
          <span className={styles.counter}>1</span>
          <FavoriteBorderIcon fontSize="small" />
          <span className={styles.counter}>1</span>
          <VisibilityIcon fontSize="small" />
          <span className={styles.counter}>1</span>
          <ShareIcon fontSize="small" />
          <span className={styles.counter}>1</span>
        </div>
      </div>
    </div>
  );
};
Post.propTypes = {
  tweet: PropTypes.object.isRequired, // Пропс 'text' має бути рядком і обов'язковим
  //   onChange: PropTypes.func.isRequired, // Пропс 'onChange' має бути функцією і обов'язковим
};

export default Post;
