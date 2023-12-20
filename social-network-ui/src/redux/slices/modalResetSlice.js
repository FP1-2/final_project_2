import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	modalProps: {
		isOpenReset: false,
	},
}

const modalResetSlice = createSlice({
	name: 'modalResetSlice',
	initialState,
	reducers: {
		openResetModal: (state, action) => {
			state.modalProps.isOpenReset = true
		},
		closeResetModal: state => {
			state.modalProps.isOpenReset = false
		},
	},
})

export const { openResetModal, closeResetModal} = modalResetSlice.actions
export default modalResetSlice.reducer