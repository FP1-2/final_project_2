import React from "react";
import styles from "./Avatar.module.scss";
const Avatar = () => {
  return (
    <div className={styles.avatar}>
      <img
        className={styles.avatar__img}
        src="https://variety.com/wp-content/uploads/2021/04/Avatar.jpg"
        alt=""
      />
    </div>
  );
};

export default Avatar;
