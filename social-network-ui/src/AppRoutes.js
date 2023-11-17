import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import FavPage from './pages/FavPage/FavPage'
import MessagePage from './pages/MessagePage/MessagePage'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserFollowings } from './redux/thunks/folowingsThunk'
import { setFollowings } from './redux/slices/userSlice'
import UseUserToken from './hooks/useUserToken'
import PostPage from './pages/PostPage/PostPage'
import ExplorePage from './pages/ExplorePage/ExplorePage'
import NotificationPage from './pages/NotificationPage/NotificationPage'

const AppRoutes = () => {
	const dispatch = useDispatch()
	const { token } = UseUserToken()
	const userId = useSelector(state => state.user?.userId)

	useEffect(() => {
		if (token && userId) {
			dispatch(fetchUserFollowings({ token, userId })).then(followings => {
				dispatch(setFollowings(followings.payload))
			})
		}
	}, [dispatch, userId])
	if (token)
		return (
			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<HomePage />} />
				<Route path='/home' element={<HomePage />} />
				<Route path='/explore' element={<ExplorePage />} />
				<Route path='/favourites' element={<FavPage />} />
				<Route path='/notifications' element={<NotificationPage />} />
				<Route path='/messages' element={<MessagePage />} />
				{/* Profile Routes */}
				<Route path='/profile/:userId' element={<ProfilePage />} />
				{/* Post Routes */}
				<Route path='/post/:postId' element={<PostPage />} />
				{/* Error Path */}
				<Route path='*' element={<h1>error</h1>} />
			</Routes>
		)
	if (!token)
		return (
			<Routes>
				{/* Public Routes */}
				<Route path='/' element={<AuthPage />} />
				{/* Auth Routes */}
				<Route path='/signIn' element={<LoginPage />} />
				{/* Error Path */}
				<Route path='*' element={<h1>error</h1>} />
			</Routes>
		)
}

export default AppRoutes
