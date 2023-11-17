import React from 'react'
import styles from './ImageInput.module.scss'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import PropTypes from 'prop-types'
import CustomTooltip from '../../Custom Tooltip/CustomTooltip'

const ImageInput = props => {
  return (
    <div>
      <input
        type='file'
        id={props.inputName}
        name='image'
        className={styles.customFileInput}
        value={props.value}
        onChange={props.onChange}
      />
      <label htmlFor={props.inputName} className={styles.customFileLabel}>
        <CustomTooltip title='Add image'>
          <AddPhotoAlternateIcon sx={{ color: 'grey' }} />
        </CustomTooltip>
      </label>
    </div>
  )
}
ImageInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  inputName: PropTypes.string.isRequired
}
export default ImageInput
