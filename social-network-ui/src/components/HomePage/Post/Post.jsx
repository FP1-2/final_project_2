import React from "react";
import styles from "./Post.module.scss";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material//Repeat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ShareIcon from "@mui/icons-material/Share";
import Avatar from "../../Avatar/Avatar";
const Post = () => {
  return (
    <div className={styles.post}>
      <Avatar />
      <div className={styles.post__body}>
        <div className={styles.body__header}>
          <span className={styles.header__mainName}>
            {/* {post.name} */}
            Devid
          </span>
          {/* <VerifiedUserIcon
            fontSize="small"
       
            className={styles.header__mainName}
          /> */}
          <span className={styles.header__tagName}>
            {/* {post.tagName} */}
            @аываываыаыаыва
          </span>
          <FiberManualRecordIcon style={{ fontSize: 10, color: "#737373" }} />
          <span className={styles.header__time}>12w</span>
        </div>
        <div className={styles.body__main}>
          <p className={styles.main__twitte}>
            {/* {post.twitte} */}
            sdsdaSDAsddfsdfvsdfasdfsdfasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
          </p>
          {/* <img src={image} alt="" /> */}
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

export default Post;
