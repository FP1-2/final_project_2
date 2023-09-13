import { LOGIN } from './../actions/loginActions';

export const setIsLogin = (isLoggedIn) => ({type: LOGIN, payload: isLoggedIn})

