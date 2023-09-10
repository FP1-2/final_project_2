import { combineReducers } from 'redux'
import modalSlice from './slices/modalSlice'

const rootReducer = combineReducers({
	modal: modalSlice,
})

export default rootReducer
