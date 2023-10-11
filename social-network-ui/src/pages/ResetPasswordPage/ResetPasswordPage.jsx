import React from 'react'
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../../redux/slices/modalSlice'
import * as Yup from 'yup'
import ModalResetPassword from '../../components/ModalResetPassword/ModalResetPassword';

const validationSchema = Yup.object({
    	email: Yup.string()
    		.email('invalid email address')
    		.required('Email is required')
    })
    
    const initialValues = {
    	email: '',
        
    }



function ResetPasswordPage() {
  const dispatch = useDispatch();
  const handleModalOpen = () => {
		// open modal window
		dispatch(openModal())
  }
  return (
    <ModalResetPassword
    variant='outlined'
    style={{
      borderColor: 'rgb(29, 161, 242)',
      textTransform: 'none',
    }}
    onClick={handleModalOpen}
    
  
  >
    
  </ModalResetPassword>

  )
}

export default ResetPasswordPage
