import React from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'

const buttonStyles = {
  minWidth: 36,
  minHeight: 36,
  ml: '20px',
  pr: '20px',
  pl: '20px',
  borderRadius: 36,
  backgroundColor: 'rgb(29, 155, 240)',
  color: '#fff',
  fontWeight: 700
}

function PostButton ({ onClick, children }) {
  return (
    <Button onClick={() => onClick()} variant='contained' sx={buttonStyles}>
      {children}
    </Button>
  )
}

export default PostButton

PostButton.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.any
}
