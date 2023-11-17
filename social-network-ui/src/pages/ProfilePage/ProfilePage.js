import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
//MUI
import {
	Box,
	Typography,
	Button,
	Avatar,
	CircularProgress,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
//MUI icons
import LinkIcon from '@mui/icons-material/Link'
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
//Components
import AvatarWithoutImg from '../../components/AvatarWithoutImg/AvatarWithoutImg'
import UserTag from '../../components/UserTag/UserTag'
import LinkText from '../../components/LinkText/LinkText'
import PostsTypeToogle from '../../components/PostsTypeToogle/PostsTypeToogle'
import PostWrapper from '../../components/HomePage/PostWrapper/PostWrapper'
import ModalEdit from '../../components/ModalEdit/ModalEdit'
import ProfilePageSkeleton from './ProfilePageSkeleton/ProfilePageSkeleton'
import FollowButton from '../../components/FollowButton/FollowButton'
import ModalFollow from '../../components/ModalFollow/ModalFollow'
//Custom Hooks
import useUserToken from '../../hooks/useUserToken'
import useIsUserFollowing from '../../hooks/useIsUserFollowing'
//Redux
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { openModal } from '../../redux/slices/modalEditSlice'
import { openModal as openFollowModal } from '../../redux/slices/modalFollowSlice'
import { closeModal as closeFollowModal } from '../../redux/slices/modalFollowSlice'
//Router
import { useNavigate } from 'react-router-dom'
//API
import getUserData from '../../api/getUserInfo'
//NPMs
import axios from 'axios'
import { format } from 'date-fns'
import { debounce } from 'lodash'
import AdaptiveAvatar from '../../components/AdaptiveAvatar/AdaptiveAvatar'

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

const itemsPerPage = 10

const ProfilePage = () => {
	//navigate hooks
	const params = useParams()
	const navigate = useNavigate()
	//custom hooks
	const { token } = useUserToken()
	const { isFollowing, checkIsFollowing } = useIsUserFollowing(params.userId)
	//redux
	const dispatch = useDispatch()
	const localUserId = useSelector(state => state.user?.userId)
	const isOpen = useSelector(state => state.modalEdit.modalProps.isOpen)
	const followingsCount = useSelector(state => state.user?.followings)
	//user state
	const [user, setUser] = useState(null)
	const [userFollowersCountState, setUserFollowersCountState] = useState(0)
	const [userFollowingCountState, setUserFollowingCountState] = useState(null)
	const [notEqual, setNotEqual] = useState(false)
	//post state
	const [isLoadingPosts, setIsLoadingPosts] = useState(false)
	const [userPosts, setUserPosts] = useState([])
	const [choosenTypePost, setChoosenTypePost] = useState(0)
	//loading state
	const [isLoading, setIsLoading] = useState(false)
	const [isFrstLoad, setIsFrstLoad] = useState(true)
	const [isLoadingMore, setIsLoadingMore] = useState(false)
	const [isLoadingMoreFull, setIsLoadingMoreFull] = useState(false)
	//size state
	const [userPostsHeight, setUserPostsHeight] = useState(null)
	const [userScrollHeight, setUserScrollHeight] = useState(null)
	//page state
	const [page, setPage] = useState(1)
	//refs
	const scrollHeight = useRef()
	const postRef = useRef()
	const profileRef = useRef()
	//user const
	let userBirthdayData = null
	let userJoinedData = null

	useEffect(() => {
		if (scrollHeight.current) {
			scrollHeight.current.focus()
		}
	}, [scrollHeight.current])

	useEffect(() => {
		//user profile info load/upd
		if (token && !isOpen) {
			;(async () => {
				if (isFrstLoad) setIsLoading(true)
				const userData = await getUserData(params.userId, token)
				console.log(userData)
				setUser(userData)
				setUserFollowersCountState(userData.userFollowersCount)
				setUserFollowingCountState(userData.userFollowingCount)
				if (isFrstLoad) setIsLoading(false)
			})()
		}
	}, [isOpen, params.userId])

	useEffect(() => {
		//set equal bool, frst load posts, check follow
		if (Number(localUserId) !== Number(params.userId)) {
			setNotEqual(false)
		} else {
			setNotEqual(true)
		}

		loadNewPosts(choosenTypePost)
		checkIsFollowing(params.userId)
		dispatch(closeFollowModal())
	}, [params.userId])

	useEffect(() => {
		//load posts when user change post type
		loadNewPosts(choosenTypePost)
		setIsLoadingMoreFull(false)
		setPage(1)
	}, [choosenTypePost])

	if (user) {
		//create right format date
		userBirthdayData = `Born ${format(new Date(user.birthday), 'MMMM d, yyyy')}`
		userJoinedData = `Joined ${new Intl.DateTimeFormat('en', {
			month: 'short',
		}).format(new Date(user.createdDate))} ${new Date(
			user.createdDate
		).getFullYear()}`
	}

	const loadNewPosts = (btnNum = 0) => {
		//firs load posts
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

	const handleFollowChange = async (userId, follow) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/${
					follow ? 'subscribe' : 'unsubscribe'
				}/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			console.log(`user is ${follow ? 'subscribe' : 'unsubscribe'}`)
			setUserFollowersCountState(prev => (follow ? prev + 1 : prev - 1))
		} catch (error) {
			console.error(error)
		} finally {
			checkIsFollowing(userId)
		}
	}

	//pagination >>>>

	useEffect(() => {
		//scroll listener for inf pagination
		const myElement = scrollHeight.current

		const handleScroll = debounce(() => {
			if (myElement) {
				const scrollPosition = myElement.scrollTop
				setUserScrollHeight(scrollPosition)
			}
		}, 100)

		if (myElement) {
			myElement.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (myElement) {
				myElement.removeEventListener('scroll', handleScroll)
			}
		}
	}, [scrollHeight.current, isLoading])

	useEffect(() => {
		//inf pagination logic
		if (userScrollHeight && userPostsHeight) {
			if (
				userScrollHeight >= userPostsHeight * 0.5 &&
				Number(user.userTweetCount) !== userPosts.length &&
				!isLoadingMore
			) {
				loadMorePosts()
			}
			if (Number(user.userTweetCount) === userPosts.length) {
				setIsLoadingMoreFull(true)
			}
		}
	}, [userScrollHeight])

	useEffect(() => {
		//set user post height for inf pag
		if (postRef.current) {
			setUserPostsHeight(postRef.current?.scrollHeight)
		}
	}, [postRef.current, userScrollHeight, userPosts])

	const loadMorePosts = async () => {
		//load more posts with pagination
		if (isLoadingMore || isLoadingMoreFull) return

		setIsLoadingMore(true)

		try {
			const { data } = await axios.get(
				`${process.env.REACT_APP_SERVER_URL || ''}${objPosts[choosenTypePost]}${
					params.userId
				}?page=${page}&itemsPerPage=${itemsPerPage}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			if (data.length > 0) {
				setUserPosts(prevPosts => [...prevPosts, ...data])
				setPage(prevPage => prevPage + 1)
			} else {
				setIsLoadingMoreFull(true)
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoadingMore(false)
		}
	}

	//<<<< pagination

	const goBackFunc = () => {
		//navigation back
		if (!notEqual) {
			navigate(-1)
		}
	}
	if (isLoading) {
		//skeleton
		return <ProfilePageSkeleton />
	}
	return (
		<ThemeProvider theme={theme}>
			{user && <ModalEdit user={user} setUser={setUser} />}
			<ModalFollow />
			<Box
				ref={scrollHeight}
				tabIndex={0}
				sx={{
					overflow: 'scroll',
					height: '100vh',
					outline: 'none',
					'&::-webkit-scrollbar': {
						width: '0',
					},
					// '&::-webkit-scrollbar-thumb': {
					// 	background: 'red',
					// },
				}}
			>
				{user && (
					<Box
						ref={profileRef}
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
											cursor: 'pointer',
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
							{user.bgProfileImage ? (
								<Box
									component='img'
									sx={{ width: '100%', height: '100%' }}
									src={user.bgProfileImage}
								/>
							) : (
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
							)}
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
									<AdaptiveAvatar
										src={user.avatar}
										border={true}
										size={'8rem'}
										firstName={user.firstName}
									/>
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
									<FollowButton
										userId={params.userId}
										handleFollowChange={handleFollowChange}
										isFollowing={isFollowing}
									/>
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
								{userFollowersCountState !== (null || undefined) &&
									followingsCount && (
										<Box
											sx={{
												display: 'flex',
												justifyContent: 'flex-start',
												alignItems: 'center',
												gap: '30px',
											}}
										>
											<Box
												sx={{ display: 'flex', gap: '5px', cursor: 'pointer' }}
												onClick={() => dispatch(openFollowModal('followings'))}
											>
												<Typography variant='p' sx={{ fontWeight: 700 }}>
													{notEqual
														? followingsCount.length
														: userFollowingCountState}
												</Typography>
												<Typography sx={{ opacity: 0.6 }} variant='p'>
													Following
												</Typography>
											</Box>
											<Box
												sx={{ display: 'flex', gap: '5px', cursor: 'pointer' }}
												onClick={() => dispatch(openFollowModal('followers'))}
											>
												<Typography variant='p' sx={{ fontWeight: 700 }}>
													{userFollowersCountState}
												</Typography>
												<Typography sx={{ opacity: 0.6 }} variant='p'>
													Followers
												</Typography>
											</Box>
										</Box>
									)}
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
								outline: 'none',
							}}
							ref={postRef}
						>
							<PostWrapper tweets={userPosts} />
						</Box>
					)}
					{!isLoadingPosts && !userPosts.length && !isLoadingMoreFull && (
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
					{isLoadingMoreFull && !isLoadingPosts && (
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
