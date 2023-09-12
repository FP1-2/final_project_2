import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'
import authSlice from './slices/authSlice'
import registerSlice from './slices/registerSlice'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
	register: registerSlice,
	modal: modalSlice,
	auth: authSlice,
    login: loginReducer
})

export default rootReducer
