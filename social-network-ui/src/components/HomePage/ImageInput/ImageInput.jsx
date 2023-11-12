import React from 'react';
import styles from './ImageInput.module.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import PropTypes from 'prop-types';

const ImageInput = (props) => {
  return (
    <div>
      <input
        type='file'
        id='fileInput'
        name='image'
        className={styles.customFileInput}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor='fileInput' className={styles.customFileLabel}>
        <AddPhotoAlternateIcon />
      </label>
    </div>
  );
};
ImageInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default ImageInput;
