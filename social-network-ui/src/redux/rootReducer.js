import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import authSlice from './slices/authSlice'
import registerSlice from './slices/registerSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	auth: authSlice,
	userSlice: userSlice,
})

export default rootReducer
