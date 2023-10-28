import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import registerSlice from './slices/registerSlice'
import userSlice from './slices/userSlice'
import modalEditSlice from './slices/modalEditSlice'

const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	modalEdit: modalEditSlice,
	user: userSlice,
})

export default rootReducer
