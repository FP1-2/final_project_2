const getUserId = () => {
  const userId = localStorage.getItem('userId')
  if (userId) {
    return userId
  } return null
}

export default getUserId
