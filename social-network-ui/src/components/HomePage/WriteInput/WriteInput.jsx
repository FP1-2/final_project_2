import React from "react";
import styles from "./WriteInput.module.scss";

const WriteInput = () => {
  return (
    <div className={styles.writeInput}>
      <input
        rows={4}
        cols={50}
        placeholder="What's happening?!"
        type="text"
        className={styles.inputTweet}
      />
    </div>
  );
};

export default WriteInput;
