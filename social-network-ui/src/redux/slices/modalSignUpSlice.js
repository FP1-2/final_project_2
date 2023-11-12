import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalProps: {
		isOpen: false,
	},
}

const modalSignUpSlice = createSlice({
	name: 'modalSignUp',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.modalProps.isOpen = true
		},
		closeModal: state => {
			state.modalProps.isOpen = false
		},
	},
})

export const { openModal, closeModal } = modalSignUpSlice.actions
export default modalSignUpSlice.reducer
