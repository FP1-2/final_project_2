import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'
import style from './PostButton.module.scss'

function PostButton ({ onClick, children, disabled }) {
  return (
    <Button
      disabled={disabled}
      onClick={() => onClick()}
      variant='contained'
      className={style.postButton}
    >
      {children}
    </Button>
  )
}

export default PostButton

PostButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  disabled: PropTypes.bool
}
