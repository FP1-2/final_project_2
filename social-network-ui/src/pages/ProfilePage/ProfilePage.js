import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import AvatarWithoutImg from '../../components/AvatarWithoutImg/AvatarWithoutImg'
import Button from '@mui/material/Button'
import UserTag from '../../components/UserTag/UserTag'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useUserToken from '../../hooks/useUserToken'
import axios from 'axios'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import LinkIcon from '@mui/icons-material/Link'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import LinkText from '../../components/LinkText/LinkText'
import { format } from 'date-fns'
import PostsTypeToogle from '../../components/PostsTypeToogle/PostsTypeToogle'
import getUserData from '../../api/getUserInfo'
import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import ProfilePageSkeleton from './ProfilePageSkeleton/ProfilePageSkeleton'
import getPostsById from '../../api/getPostsById'
import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper'
import CircularProgress from '@mui/material/CircularProgress'
import ModalEdit from '../../components/ModalEdit/ModalEdit'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/slices/modalEditSlice'
import useIsUserFollowing from '../../hooks/useIsUserFollowing'

const theme = createTheme({
	typography: {
		p: {
			fontFamily: 'Segoe UI, sans-serif',
		},
		h3: {
			'@media (max-width: 450px)': {
				letterSpacing: '0.2rem',
			},
			'@media (max-width: 350px)': {
				letterSpacing: '0',
			},
		},
	},
})

const objPosts = {
	0: '/api/v1/profile-posts/',
	1: '/api/v1/profile-reposts/',
	2: '/api/v1/post-user-likes/',
}

const infoBoxStyles = {
	display: 'flex',
	alignItems: 'flex-end',
	gap: '.2rem',
	overflow: 'hidden',
	opacity: 0.6,
	verticalAlign: 'bottom',
}
const typographyInfoUser = {
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
}

const ProfilePage = () => {
	const { token } = useUserToken()
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { isFollowing, checkIsFollowing } = useIsUserFollowing(params.userId)

	const localUserId = useSelector(state => state.user?.userId)
	const isOpen = useSelector(state => state.modalEdit.modalProps.isOpen)

	const [user, setUser] = useState(null)
	const [notEqual, setNotEqual] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [isLoadingPosts, setIsLoadingPosts] = useState(false)
	const [userPosts, setUserPosts] = useState([])
	const [choosenTypePost, setChoosenTypePost] = useState(0)
	const [isFrstLoad, setIsFrstLoad] = useState(true)

	let userBirthdayData = null
	let userJoinedData = null
	useEffect(() => {
		if (token && !isFrstLoad) {
			;(async () => {
				const userData = await getUserData(params.userId, token)
				setUser(userData)
			})()
		}
	}, [isFollowing, isOpen, params.userId])
	useEffect(() => {
		if (token && isFrstLoad) {
			;(async () => {
				setIsLoading(true)
				const userData = await getUserData(params.userId, token)
				setUser(userData)
				setIsLoading(false)
			})()
		}
		if (Number(localUserId) !== Number(params.userId)) {
			setNotEqual(false)
		} else {
			setNotEqual(true)
		}
		loadNewPosts(choosenTypePost)
		checkIsFollowing(params.userId)
		setIsFrstLoad(false)
	}, [params.userId])

	useEffect(() => {
		loadNewPosts(choosenTypePost)
	}, [choosenTypePost])

	if (user) {
		userBirthdayData = `Born ${format(new Date(user.birthday), 'MMMM d, yyyy')}`
		userJoinedData = `Joined ${new Intl.DateTimeFormat('en', {
			month: 'short',
		}).format(new Date(user.createdDate))} ${new Date(
			user.createdDate
		).getFullYear()}`
	}

	const loadNewPosts = (btnNum = 0) => {
		;(async () => {
			try {
				setIsLoadingPosts(true)
				setUserPosts([]) // change later

				const { data } = await axios.get(
					`${process.env.REACT_APP_SERVER_URL || ''}${objPosts[btnNum]}${
						params.userId
					}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				)
				setUserPosts([...data])
				setIsLoadingPosts(false)
			} catch (error) {
				throw error
			}
		})()
	}

	const handleFollow = async userId => {
		console.log('follow')
		const data = await axios.get(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/subscribe/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		checkIsFollowing(userId)
	}
	const handleUnFollow = async userId => {
		console.log('unfollow')
		const data = await axios.get(
			`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/unsubscribe/${userId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)
		checkIsFollowing(userId)
	}

	const goBackFunc = () => {
		if (!notEqual) {
			navigate(-1)
		}
	}
	if (isLoading) {
		return <ProfilePageSkeleton />
	}
	return (
		<ThemeProvider theme={theme}>
			{user && <ModalEdit user={user} setUser={setUser} />}
			<Box>
				{user && (
					<Box
						sx={{
							height: '560px',
							width: '100%',
						}}
					>
						{!notEqual && (
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									gap: '1.5rem',
									width: '100%',
									maxHeight: '10%',
									paddingX: '1.5rem',
									height: '4.5rem',
									bgcolor: 'white',
								}}
							>
								<Box>
									<KeyboardBackspaceIcon
										sx={{
											fontSize: '28px',
										}}
										onClick={goBackFunc}
									/>
								</Box>
								<Box
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: '0.3rem',
									}}
								>
									<Typography
										sx={{
											fontWeight: 700,
											fontSize: '1.1rem',
										}}
										variant='p'
									>
										{user.firstName}
									</Typography>
									<Typography
										sx={{
											fontSize: '0.95rem',
											opacity: 0.6,
										}}
										variant='p'
									>
										{user.userTweetCount} Tweets
									</Typography>
								</Box>
							</Box>
						)}
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								height: !notEqual ? '35%' : '45%',
								bgcolor: 'rgb(29, 161, 241)',
							}}
						>
							<Typography
								variant='h3'
								sx={{
									paddingX: '1rem',
									wordSpacing: '0.5rem',
									letterSpacing: '0.4rem',
									color: 'white',
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
									userSelect: 'none',
								}}
							>
								{user.firstName} {user.lastName}
							</Typography>
						</Box>
						<Box
							sx={{
								height: '55%',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									position: 'relative',
									paddingX: '1rem',
									marginBottom: '1rem',
									justifyContent: 'flex-end',
									alignItems: 'flex-end',
								}}
							>
								<Box
									sx={{
										position: 'absolute',
										left: '1rem',
										top: '0',
										transform: 'translateY(-50%)',
									}}
								>
									{user.avatar ? (
										<Avatar
											sx={{
												width: '8rem',
												height: '8rem',
												mb: 1,
												border: '3px solid white',
											}}
											src={user.avatar}
										></Avatar>
									) : (
										<AvatarWithoutImg
											border={true}
											userName={user.firstName}
											big={true}
										/>
									)}
								</Box>
								{notEqual && (
									<Button
										sx={{
											marginTop: '1rem',
											p: 1,
											paddingX: '1.1rem',
											border: '1px solid black',
											borderRadius: '3rem',
											textTransform: 'none',
											color: 'black',
										}}
										onClick={() => dispatch(openModal())}
									>
										<Typography sx={{ fontSize: '0.9rem' }}>
											Edit Profile
										</Typography>
									</Button>
								)}
								{!notEqual && (
									<>
										{isFollowing ? (
											<Button
												sx={{
													marginTop: '1rem',
													p: 1,
													paddingX: '1.1rem',
													border: '1px solid black',
													borderRadius: '3rem',
													textTransform: 'none',
													color: 'black',
												}}
												onClick={() => handleUnFollow(params.userId)}
											>
												<Typography sx={{ fontSize: '0.9rem' }}>
													Unfollow
												</Typography>
											</Button>
										) : (
											<Button
												sx={{
													marginTop: '1rem',
													p: 1,
													paddingX: '1.1rem',
													border: '1px solid black',
													borderRadius: '3rem',
													textTransform: 'none',
													color: 'black',
												}}
												onClick={() => handleFollow(params.userId)}
											>
												<Typography sx={{ fontSize: '0.9rem' }}>
													Follow
												</Typography>
											</Button>
										)}
									</>
								)}
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									paddingX: '1rem',
								}}
							>
								<Typography
									variant='h5'
									sx={{
										marginBottom: '0.3rem',
										fontWeight: '700',
									}}
								>
									{user.firstName}
								</Typography>
								<UserTag userTag={user.username} />
								<Typography
									variant='p'
									sx={{
										paddingTop: '1rem',
										marginBottom: 2.5,
										fontSize: '1.3rem',
										color: 'black',
									}}
								>
									{user.userDescribe}
								</Typography>
								<Box
									sx={{
										display: 'flex',
										justifyContent: 'space-between',
										flexWrap: 'nowrap',
										width: '100%',
										marginBottom: 2.5,
										color: 'black',
									}}
								>
									<Box sx={infoBoxStyles} className='infoUserBox'>
										<LocationOnOutlinedIcon />
										<Typography sx={typographyInfoUser} variant='p'>
											{user.address}
										</Typography>
									</Box>
									{user.userLink && (
										<Box sx={infoBoxStyles}>
											<LinkIcon sx={{ transform: 'rotate(-60deg)' }} />
											<Box sx={typographyInfoUser}>
												<LinkText
													href={true}
													link={user.userLink}
													text={user.userLink}
												/>
											</Box>
										</Box>
									)}
									<Box sx={infoBoxStyles}>
										<CakeOutlinedIcon />
										{userBirthdayData && (
											<Typography sx={typographyInfoUser} variant='p'>
												{userBirthdayData}
											</Typography>
										)}
									</Box>
									<Box sx={infoBoxStyles}>
										<CalendarMonthOutlinedIcon />
										{userJoinedData && (
											<Typography sx={typographyInfoUser} variant='p'>
												{userJoinedData}
											</Typography>
										)}
									</Box>
								</Box>
								<Box // need to rework box to links
									sx={{
										display: 'flex',
										justifyContent: 'flex-start',
										alignItems: 'center',
										gap: '30px',
									}}
								>
									<Box sx={{ display: 'flex', gap: '5px' }}>
										<Typography variant='p' sx={{ fontWeight: 700 }}>
											{user.userFollowingCount}
										</Typography>
										<Typography sx={{ opacity: 0.6 }} variant='p'>
											Following
										</Typography>
									</Box>
									<Box sx={{ display: 'flex', gap: '5px' }}>
										<Typography variant='p' sx={{ fontWeight: 700 }}>
											{user.userFollowersCount}
										</Typography>
										<Typography sx={{ opacity: 0.6 }} variant='p'>
											Followers
										</Typography>
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				)}
				<Box sx={{ paddingX: '1rem', borderBottom: '1px solid #C4C4C4' }}>
					<PostsTypeToogle setChoosenTypePost={setChoosenTypePost} />
				</Box>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						minHeight: '35vh',
					}}
				>
					{isLoadingPosts && <CircularProgress size={80} />}
					{userPosts.length !== 0 && (
						<Box
							sx={{
								p: 2,
								width: '100%',
							}}
						>
							<PostWrapper tweets={userPosts} />
						</Box>
					)}
					{!isLoadingPosts && !userPosts.length && (
						<Typography
							sx={{
								fontWeight: 700,
								fontSize: '36px',
								color: 'gray',
								opacity: 0.5,
							}}
						>
							No Posts Available
						</Typography>
					)}
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default ProfilePage

// import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
// import { Box, Typography } from '@mui/material'
// import AvatarWithoutImg from '../../components/AvatarWithoutImg/AvatarWithoutImg'
// import Button from '@mui/material/Button'
// import UserTag from '../../components/UserTag/UserTag'
// import { ThemeProvider, createTheme } from '@mui/material/styles'
// import useUserToken from '../../hooks/useUserToken'
// import axios from 'axios'
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
// import LinkIcon from '@mui/icons-material/Link'
// import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
// import LinkText from '../../components/LinkText/LinkText'
// import { format } from 'date-fns'
// import PostsTypeToogle from '../../components/PostsTypeToogle/PostsTypeToogle'
// import getUserData from '../../api/getUserInfo'
// import { useState } from 'react'
// import Avatar from '@mui/material/Avatar'
// import { useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
// import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
// import ProfilePageSkeleton from './ProfilePageSkeleton/ProfilePageSkeleton'
// import getPostsById from '../../api/getPostsById'
// import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper'
// import CircularProgress from '@mui/material/CircularProgress'
// import ModalEdit from '../../components/ModalEdit/ModalEdit'
// import { useDispatch } from 'react-redux'
// import { openModal } from '../../redux/slices/modalEditSlice'

// const theme = createTheme({
// 	typography: {
// 		p: {
// 			fontFamily: 'Segoe UI, sans-serif',
// 		},
// 		h3: {
// 			'@media (max-width: 450px)': {
// 				letterSpacing: '0.2rem',
// 			},
// 			'@media (max-width: 350px)': {
// 				letterSpacing: '0',
// 			},
// 		},
// 	},
// })

// const objPosts = {
// 	0: '/api/v1/profile-posts/',
// 	1: '/api/v1/profile-reposts/',
// 	2: '/api/v1/post-user-likes/',
// }

// const infoBoxStyles = {
// 	display: 'flex',
// 	alignItems: 'flex-end',
// 	gap: '.2rem',
// 	overflow: 'hidden',
// 	opacity: 0.6,
// 	verticalAlign: 'bottom',
// }
// const typographyInfoUser = {
// 	textOverflow: 'ellipsis',
// 	overflow: 'hidden',
// 	whiteSpace: 'nowrap',
// }

// const ProfilePage = () => {
// 	const { token } = useUserToken()

// 	const [user, setUser] = useState(null)
// 	const [notEqual, setNotEqual] = useState(false)
// 	const [isLoading, setIsLoading] = useState(true)
// 	const [isLoadingPosts, setIsLoadingPosts] = useState(false)
// 	const [userPosts, setUserPosts] = useState([])
// 	const [choosenTypePost, setChoosenTypePost] = useState(0)
// 	const [page, setPage] = useState(-1)
// 	const [hasMorePosts, setHasMorePosts] = useState(true)

// 	const params = useParams()
// 	const navigate = useNavigate()
// 	const dispatch = useDispatch()
// 	const localUserId = useSelector(state => state.user?.userId)

// 	let userBirthdayData = null
// 	let userJoinedData = null

// 	useEffect(() => {
// 		if (token) {
// 			;(async () => {
// 				setIsLoading(true)
// 				const userData = await getUserData(params.userId, token)
// 				setUser(userData)
// 				setIsLoading(false)
// 			})()
// 		}

// 		if (Number(localUserId) !== Number(params.userId)) {
// 			setNotEqual(false)
// 		} else {
// 			setNotEqual(true)
// 		}
// 		loadNewPosts(choosenTypePost)
// 	}, [params.userId])

// 	useEffect(() => {
// 		loadNewPosts(choosenTypePost)
// 	}, [choosenTypePost, page])

// 	if (user) {
// 		userBirthdayData = `Born ${format(new Date(user.birthday), 'MMMM d, yyyy')}`
// 		userJoinedData = `Joined ${new Intl.DateTimeFormat('en', {
// 			month: 'short',
// 		}).format(new Date(user.createdDate))} ${new Date(
// 			user.createdDate
// 		).getFullYear()}`
// 	}

// 	const loadNewPosts = async () => {
// 		if (!hasMorePosts) {
// 			return
// 		}

// 		try {
// 			setIsLoadingPosts(true)

// 			const nextPage = page + 1

// 			console.log(objPosts[choosenTypePost])

// 			const { data } = await axios.get(
// 				`${process.env.REACT_APP_SERVER_URL || ''}${objPosts[choosenTypePost]}${
// 					params.userId
// 				}?page=${nextPage}&size=10`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			)
// 			if (data.length === 0) {
// 				console.log(data)
// 				console.log('123')

// 				setHasMorePosts(false)
// 			}

// 			setUserPosts([...userPosts, ...data])
// 			setPage(nextPage)
// 			setIsLoadingPosts(false)
// 		} catch (error) {
// 			throw error
// 		}
// 	}

// 	const goBackFunc = () => {
// 		if (!notEqual) {
// 			navigate(-1)
// 		}
// 	}
// 	if (isLoading) {
// 		return <ProfilePageSkeleton />
// 	}
// 	return (
// 		<ThemeProvider theme={theme}>
// 			{user && <ModalEdit user={user} setUser={setUser} />}
// 			<Box>
// 				{user && (
// 					<Box
// 						sx={{
// 							height: '560px',
// 							width: '100%',
// 						}}
// 					>
// 						{!notEqual && (
// 							<Box
// 								sx={{
// 									display: 'flex',
// 									alignItems: 'center',
// 									gap: '1.5rem',
// 									width: '100%',
// 									maxHeight: '10%',
// 									paddingX: '1.5rem',
// 									height: '4.5rem',
// 									bgcolor: 'white',
// 								}}
// 							>
// 								<Box>
// 									<KeyboardBackspaceIcon
// 										sx={{
// 											fontSize: '28px',
// 										}}
// 										onClick={goBackFunc}
// 									/>
// 								</Box>
// 								<Box
// 									sx={{
// 										display: 'flex',
// 										flexDirection: 'column',
// 										gap: '0.3rem',
// 									}}
// 								>
// 									<Typography
// 										sx={{
// 											fontWeight: 700,
// 											fontSize: '1.1rem',
// 										}}
// 										variant='p'
// 									>
// 										{user.firstName}
// 									</Typography>
// 									<Typography
// 										sx={{
// 											fontSize: '0.95rem',
// 											opacity: 0.6,
// 										}}
// 										variant='p'
// 									>
// 										{user.userTweetCount} Tweets
// 									</Typography>
// 								</Box>
// 							</Box>
// 						)}
// 						<Box
// 							sx={{
// 								display: 'flex',
// 								justifyContent: 'center',
// 								alignItems: 'center',
// 								height: !notEqual ? '35%' : '45%',
// 								bgcolor: 'rgb(29, 161, 241)',
// 							}}
// 						>
// 							<Typography
// 								variant='h3'
// 								sx={{
// 									paddingX: '1rem',
// 									wordSpacing: '0.5rem',
// 									letterSpacing: '0.4rem',
// 									color: 'white',
// 									textOverflow: 'ellipsis',
// 									overflow: 'hidden',
// 									whiteSpace: 'nowrap',
// 									userSelect: 'none',
// 								}}
// 							>
// 								{user.firstName} {user.lastName}
// 							</Typography>
// 						</Box>
// 						<Box
// 							sx={{
// 								height: '55%',
// 							}}
// 						>
// 							<Box
// 								sx={{
// 									display: 'flex',
// 									position: 'relative',
// 									paddingX: '1rem',
// 									marginBottom: '1rem',
// 									justifyContent: 'flex-end',
// 									alignItems: 'flex-end',
// 								}}
// 							>
// 								<Box
// 									sx={{
// 										position: 'absolute',
// 										left: '1rem',
// 										top: '0',
// 										transform: 'translateY(-50%)',
// 									}}
// 								>
// 									{user.avatar ? (
// 										<Avatar
// 											sx={{
// 												width: '8rem',
// 												height: '8rem',
// 												mb: 1,
// 												border: '3px solid white',
// 											}}
// 											src={user.avatar}
// 										></Avatar>
// 									) : (
// 										<AvatarWithoutImg
// 											border={true}
// 											userName={user.firstName}
// 											big={true}
// 										/>
// 									)}
// 								</Box>
// 								{notEqual && (
// 									<Button
// 										sx={{
// 											marginTop: '1rem',
// 											p: 1,
// 											paddingX: '1.1rem',
// 											border: '1px solid black',
// 											borderRadius: '3rem',
// 											textTransform: 'none',
// 											color: 'black',
// 										}}
// 										onClick={() => dispatch(openModal())}
// 									>
// 										<Typography sx={{ fontSize: '0.9rem' }}>
// 											Edit Profile
// 										</Typography>
// 									</Button>
// 								)}
// 								{!notEqual && (
// 									<Button
// 										sx={{
// 											marginTop: '1rem',
// 											p: 1,
// 											paddingX: '1.1rem',
// 											border: '1px solid black',
// 											borderRadius: '3rem',
// 											textTransform: 'none',
// 											color: 'black',
// 										}}
// 									>
// 										<Typography sx={{ fontSize: '0.9rem' }}>Follow</Typography>
// 									</Button>
// 								)}
// 							</Box>
// 							<Box
// 								sx={{
// 									display: 'flex',
// 									flexDirection: 'column',
// 									paddingX: '1rem',
// 								}}
// 							>
// 								<Typography
// 									variant='h5'
// 									sx={{
// 										marginBottom: '0.3rem',
// 										fontWeight: '700',
// 									}}
// 								>
// 									{user.firstName}
// 								</Typography>
// 								<UserTag userTag={user.username} />
// 								<Typography
// 									variant='p'
// 									sx={{
// 										paddingTop: '1rem',
// 										marginBottom: 2.5,
// 										fontSize: '1.3rem',
// 										color: 'black',
// 									}}
// 								>
// 									{user.userDescribe}
// 								</Typography>
// 								<Box
// 									sx={{
// 										display: 'flex',
// 										justifyContent: 'space-between',
// 										flexWrap: 'nowrap',
// 										width: '100%',
// 										marginBottom: 2.5,
// 										color: 'black',
// 									}}
// 								>
// 									<Box sx={infoBoxStyles} className='infoUserBox'>
// 										<LocationOnOutlinedIcon />
// 										<Typography sx={typographyInfoUser} variant='p'>
// 											{user.address}
// 										</Typography>
// 									</Box>
// 									{user.userLink && (
// 										<Box sx={infoBoxStyles}>
// 											<LinkIcon sx={{ transform: 'rotate(-60deg)' }} />
// 											<Box sx={typographyInfoUser}>
// 												<LinkText
// 													href={true}
// 													link={user.userLink}
// 													text={user.userLink}
// 												/>
// 											</Box>
// 										</Box>
// 									)}
// 									<Box sx={infoBoxStyles}>
// 										<CakeOutlinedIcon />
// 										{userBirthdayData && (
// 											<Typography sx={typographyInfoUser} variant='p'>
// 												{userBirthdayData}
// 											</Typography>
// 										)}
// 									</Box>
// 									<Box sx={infoBoxStyles}>
// 										<CalendarMonthOutlinedIcon />
// 										{userJoinedData && (
// 											<Typography sx={typographyInfoUser} variant='p'>
// 												{userJoinedData}
// 											</Typography>
// 										)}
// 									</Box>
// 								</Box>
// 								<Box
// 									sx={{
// 										display: 'flex',
// 										justifyContent: 'flex-start',
// 										alignItems: 'center',
// 										gap: '30px',
// 									}}
// 								>
// 									<Box sx={{ display: 'flex', gap: '5px' }}>
// 										<Typography variant='p' sx={{ fontWeight: 700 }}>
// 											{user.userFollowingCount}
// 										</Typography>
// 										<Typography sx={{ opacity: 0.6 }} variant='p'>
// 											Following
// 										</Typography>
// 									</Box>
// 									<Box sx={{ display: 'flex', gap: '5px' }}>
// 										<Typography variant='p' sx={{ fontWeight: 700 }}>
// 											{user.userFollowersCount}
// 										</Typography>
// 										<Typography sx={{ opacity: 0.6 }} variant='p'>
// 											Followers
// 										</Typography>
// 									</Box>
// 								</Box>
// 							</Box>
// 						</Box>
// 					</Box>
// 				)}
// 				<Box sx={{ paddingX: '1rem', borderBottom: '1px solid #C4C4C4' }}>
// 					<PostsTypeToogle setChoosenTypePost={setChoosenTypePost} />
// 				</Box>
// 				<Box
// 					sx={{
// 						display: 'flex',
// 						flexDirection: 'column',
// 						justifyContent: 'center',
// 						alignItems: 'center',
// 						width: '100%',
// 						minHeight: '35vh',
// 					}}
// 				>
// 					{isLoadingPosts && <CircularProgress size={80} />}
// 					{userPosts.length !== 0 && (
// 						<Box
// 							sx={{
// 								p: 2,
// 							}}
// 						>
// 							<PostWrapper tweets={userPosts} />
// 						</Box>
// 					)}
// 					{hasMorePosts && !isLoadingPosts && !userPosts.length && (
// 						<div
// 							className='infinite-scroll-trigger'
// 							style={{ height: '1px' }}
// 						></div>
// 					)}
// 					{!hasMorePosts && !isLoadingPosts && !userPosts.length && (
// 						<Typography
// 							sx={{
// 								fontWeight: 700,
// 								fontSize: '36px',
// 								color: 'gray',
// 								opacity: 0.5,
// 							}}
// 						>
// 							No Posts Available
// 						</Typography>
// 					)}
// 				</Box>
// 			</Box>
// 		</ThemeProvider>
// 	)
// }

// export default ProfilePage
