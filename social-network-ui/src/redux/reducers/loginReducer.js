import { LOGIN } from './../actions/loginActions';

const initialValue = false;

const loginReducer = (state = initialValue, action) => {
    switch(action.type) {
        case LOGIN: {
            return action.payload
        }
        default: return state
    }
}

export default loginReducer;
