import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import registerSlice from './slices/registerSlice'
import userSlice from './slices/userSlice'

const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	user: userSlice,
})

export default rootReducer
