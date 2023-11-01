import { useSelector } from 'react-redux'

const useUserId = () => {
  const userId = localStorage.getItem('userId')
  return userId
}

export default useUserId
