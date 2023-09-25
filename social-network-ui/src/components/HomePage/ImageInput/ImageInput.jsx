import React from "react";
import styles from "./ImageInput.module.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
const ImageInput = () => {
  return (
    <div>
      <input type="file" id="fileInput" className={styles.customFileInput} />
      <label for="fileInput" className={styles.customFileLabel}>
        <AddPhotoAlternateIcon />
      </label>
    </div>
  );
};

export default ImageInput;
