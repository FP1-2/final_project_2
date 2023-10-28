import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import registerSlice from './slices/registerSlice'
import userSlice from './slices/userSlice'
import modalEditSlice from './slices/modalEditSlice'
import modalResetSlice from './slices/modalResetSlice'

const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	modalEdit: modalEditSlice,
	user: userSlice,
	modalReset: modalResetSlice,
})

export default rootReducer
