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

const infoBoxStyles = {
	display: 'flex',
	alignItems: 'flex-end',
	gap: '.2rem',
	overflow: 'hidden',
	opacity: 0.6,
}
const typographyInfoUser = {
	textOverflow: 'ellipsis',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
}

const ProfilePage = () => {
	const { token } = useUserToken()
	const params = useParams()
	const localUserId = useSelector(state => state.user?.userId)
	const [user, setUser] = useState(null)
	const [notEqual, setNotEqual] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	let userBirthdayData = null
	let userJoinedData = null

	useEffect(() => {
		if (token) {
			;(async () => {
				setIsLoading(true)
				const userData = await getUserData(params.userId, token)
				setUser(userData)
				setIsLoading(false)
			})()
		}
		if (Number(localUserId) !== Number(params.userId)) {
			console.log('true')
			console.log(localUserId)
			console.log(params.userId)
			setNotEqual(false)
		} else {
			console.log('false')
			console.log(Number(localUserId))
			console.log(Number(params.userId))
			setNotEqual(true)
		}
	}, [params.userId])

	if (user) {
		userBirthdayData = `Born ${format(new Date(user.birthday), 'MMMM d, yyyy')}`
		userJoinedData = `Joined ${new Intl.DateTimeFormat('en', {
			month: 'short',
		}).format(new Date(user.createdDate))} ${new Date(
			user.createdDate
		).getFullYear()}`
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
								height: '45%',
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
									onClick={() => navigate('/profile/50')}
								>
									<Typography sx={{ fontSize: '0.9rem' }}>
										Edit Profile
									</Typography>
								</Button>
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
					<PostsTypeToogle />
				</Box>
			</Box>
		</ThemeProvider>
	)
}

export default ProfilePage
