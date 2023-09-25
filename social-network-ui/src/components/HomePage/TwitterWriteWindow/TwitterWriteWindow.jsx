import React from "react";
import styles from "./TwitterWriteWindow.module.scss";
import Avatar from "../../Avatar/Avatar";
import ImageInput from "../ImageInput/ImageInput";
import WriteInput from "../WriteInput/WriteInput";

const TwitterWriteWindow = () => {
  return (
    <div>
      <form className={styles.writeWindow}>
        <Avatar />
        <div className={styles.writeWindowBody}>
          <WriteInput />
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
