import React from "react";
import styles from "./ImageInput.module.scss";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PropTypes from "prop-types";

const ImageInput = (props) => {
  return (
    <div>
      <input
        type="file"
        id="fileInput"
        name="image"
        className={styles.customFileInput}
        value={props.value}
        onChange={props.onChange}
      />
      <label for="fileInput" className={styles.customFileLabel}>
        <AddPhotoAlternateIcon />
      </label>
    </div>
  );
};
ImageInput.propTypes = {
  value: PropTypes.string.isRequired, // Пропс 'text' має бути рядком і обов'язковим
  onChange: PropTypes.func.isRequired, // Пропс 'onChange' має бути функцією і обов'язковим
};
export default ImageInput;
