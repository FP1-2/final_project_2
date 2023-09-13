import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalProps: {
		isOpen: false,
		content: null,
	},
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action) => {
			state.modalProps.isOpen = true
			if (action.payload) {
				state.modalProps.content = action.payload
			}
		},
		closeModal: state => {
			state.modalProps.isOpen = false
			state.modalProps.content = null
		},
	},
})

export const { openModal, closeModal } = modalSlice.actions
export default modalSlice.reducer