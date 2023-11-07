import UseUserToken from './useUserToken'
import { useSelector } from 'react-redux'
import React, { useState, useEffect } from 'react'
import getUserFollowers from '../api/getUserFollowers'

const useIsUserFollowing = () => {
	const { token } = UseUserToken()
	const localUserId = useSelector(state => state.user?.userId)

	const [isFollowing, setIsFollowing] = useState(false)

	const checkIsFollowing = async userId => {
		if (token && userId && userId !== localUserId) {
			const userFollowingData = await getUserFollowers(userId, token)
			const isFollowing = userFollowingData.some(
				follower => Number(follower.id) === Number(localUserId)
			)
			setIsFollowing(isFollowing)
		}
	}

	useEffect(() => {
		checkIsFollowing(localUserId)
	}, [token, localUserId])

	return { isFollowing, checkIsFollowing }
}

export default useIsUserFollowing
