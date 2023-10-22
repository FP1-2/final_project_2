import React from 'react'
import { useState } from 'react'

const UseUserToken = () => {
	const [token, setToken] = useState(localStorage.getItem('userToken'))

	const saveToken = userToken => {
		localStorage.setItem('userToken', userToken)
		setToken(userToken)
	}
	const removeToken = () => {
		localStorage.removeItem('userToken')
		setToken(null)
	}
	return { token, saveToken, removeToken }
}

export default UseUserToken
