import { useSelector } from 'react-redux'

const useIsAuthenticated = () => {
	const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
	return isAuthenticated
}

export default useIsAuthenticated
