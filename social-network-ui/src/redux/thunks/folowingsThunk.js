import { createAsyncThunk } from '@reduxjs/toolkit'
import getMyFollowings from '../../api/getMyFollowings'

export const fetchUserFollowings = createAsyncThunk(
	'user/fetchFollowings',
	async ({ token, userId }) => {
		try {
			const followings = await getMyFollowings(token, userId)
			return followings
		} catch (error) {
			return error?.message
		}
	}
)
