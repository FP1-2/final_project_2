import UseUserToken from './useUserToken'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import getUserFollowers from '../api/getUserFollowers'

const UseIsUserFollowing = userId => {
	const { token } = UseUserToken()
	const localUserId = useSelector(state => state.user?.userId)

	const [isFollowing, setIsFollowing] = useState(false)

	useEffect(() => {
		if (token && userId && userId !== localUserId) {
			;(async () => {
				const userFollowingData = await getUserFollowers(userId, token)
				console.log('123')
				console.log(userFollowingData)
				const isFollowing = userFollowingData.some(
					follower => Number(follower.id) === Number(localUserId)
				)
				setIsFollowing(isFollowing)
			})()
		}
	}, [token, userId, localUserId])

	return { isFollowing }
}

export default UseIsUserFollowing
