import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalProps: {
		isOpen: false,
	},
}

const modalEditSlice = createSlice({
	name: 'modalEdit',
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

export const { openModal, closeModal } = modalEditSlice.actions
export default modalEditSlice.reducer
