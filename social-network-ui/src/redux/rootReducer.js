import { combineReducers } from 'redux'
import modalSignUpSlice from './slices/modalSignUpSlice'
import registerSlice from './slices/registerSlice'
import userSlice from './slices/userSlice'
import modalResetSlice from './slices/modalResetSlice'
import modalEditSlice from './slices/modalEditSlice'
import modalFollowSlice from './slices/modalFollowSlice'

const rootReducer = combineReducers({
	register: registerSlice,
	modalSignUp: modalSignUpSlice,
	modalEdit: modalEditSlice,
	user: userSlice,
	modalReset: modalResetSlice,
	modalFollow: modalFollowSlice,
})

export default rootReducer
