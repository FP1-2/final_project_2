import { useSelector } from 'react-redux'

const useUserId = () => {
  const userId = useSelector(state => state.user.userId)
  return userId
}

export default useUserId
