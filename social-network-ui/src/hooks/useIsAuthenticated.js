import { useSelector } from 'react-redux'

const useIsAuthenticated = () => {
	const isAuthenticated = useSelector(state => state.user.isAuthenticated)
	return isAuthenticated
}

export default useIsAuthenticated
