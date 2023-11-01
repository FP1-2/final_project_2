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

			console.log(state.modalProps.isOpenReset)
			state.modalProps.isOpenReset = true
		},
		closeResetModal: state => {
			state.modalProps.isOpenReset = false
		},
	},
})

export const { openResetModal, closeResetModal} = modalResetSlice.actions
export default modalResetSlice.reducer