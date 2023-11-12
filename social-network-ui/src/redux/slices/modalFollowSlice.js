import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalProps: {
		isOpen: false,
		modalContent: null,
	},
}

const modalFollowSlice = createSlice({
	name: 'modalFollow',
	initialState,
	reducers: {
		openModal: (state, actions) => {
			state.modalProps.isOpen = true
			state.modalProps.modalContent = actions.payload
		},
		closeModal: state => {
			state.modalProps.isOpen = false
			state.modalProps.modalContent = null
		},
	},
})

export const { openModal, closeModal } = modalFollowSlice.actions
export default modalFollowSlice.reducer
