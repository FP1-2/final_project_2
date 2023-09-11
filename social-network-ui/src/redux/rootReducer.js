import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import authSlice from './slices/authSlice'
import registerSlice from './slices/registerSlice'

const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	auth: authSlice,
})

export default rootReducer
