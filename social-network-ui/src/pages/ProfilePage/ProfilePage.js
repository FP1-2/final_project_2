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

const user = {
	id: 50,
	username: 'Camel_wafas',
	firstName: 'Jack',
	lastName: 'Petrov',
	email: 'asda@gmail.com',
	birthday: '1992-04-04',
	avatar: null,
	address: 'Poltava',
	createdDate: '2023-10-16T10:59:39.842808',
	userDescribe: 'I am a good person',
	userLink: 't.me/adadsa',
	bgProfileImage: null,
	userTweetCount: 55,
	userFollowersCount: 12,
	userFollowingCount: 34,
}

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
	let userBirthdayData = null
	let userJoinedData = null

	if (user) {
		userBirthdayData = `Born ${format(new Date(user.birthday), 'MMMM d, yyyy')}`
		userJoinedData = `Joined ${new Intl.DateTimeFormat('en', {
			month: 'short',
		}).format(new Date(user.createdDate))} ${new Date(
			user.createdDate
		).getFullYear()}`
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
									wordSpacing: '0.5rem',
									letterSpacing: '0.4rem',
									color: 'white',
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
									<AvatarWithoutImg
										border={true}
										userName={user.firstName}
										big={true}
									/>
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
