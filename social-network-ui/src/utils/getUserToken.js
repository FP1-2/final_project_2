const getUserToken= () => {
  const userToken = localStorage.getItem('userToken')
  if (userToken) {
    return userToken
  }
    return null
}

export default getUserToken
