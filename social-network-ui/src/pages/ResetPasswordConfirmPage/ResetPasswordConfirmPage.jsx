import React from 'react'
import ModalConfirm from '../../components/ModalConfirm/ModalConfirm'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../redux/slices/modalSlice'

function ResetPasswordConfirmPage() {
  const dispatch = useDispatch();
  const handleModalOpen = () => {
		// open modal window
		dispatch(openModal())
  }
  return (
    <ModalConfirm
    variant='outlined'
    style={{
      borderColor: 'rgb(29, 161, 242)',
      textTransform: 'none',
    }}
    onClick={handleModalOpen}
    
  
  >
    
  </ModalConfirm>
  )
}

export default ResetPasswordConfirmPage