import { createAsyncThunk } from '@reduxjs/toolkit'
import getMyFollowings from '../../api/getMyFollowings'

export const fetchUserFollowings = createAsyncThunk(
  'user/fetchFollowings',
  async () => {
    try {
        const followings = await getMyFollowings()
      return followings
    } catch (error) {
      return error?.message
    }
  }
)
