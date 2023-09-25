import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalProps: {
		isOpen: false,
	},
}

const modalSlice = createSlice({
	name: 'modal',
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

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer
