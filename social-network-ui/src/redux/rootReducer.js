import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import registerSlice from './slices/registerSlice'
import userSlice from './slices/userSlice'
import chatSlice from './slices/chatSlice'
const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	user: userSlice,
	chat: chatSlice,
})

export default rootReducer
