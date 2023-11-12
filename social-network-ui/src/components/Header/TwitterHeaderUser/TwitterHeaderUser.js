import React, { useEffect, useState } from 'react'
//MUI
import { Box, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { ThemeProvider, createTheme } from '@mui/material/styles'
//Components
import AdaptiveAvatar from '../../AdaptiveAvatar/AdaptiveAvatar'
import UserTag from '../../UserTag/UserTag'
import DropdownMenu from './DropdownMenu/DropdownMenu'
//refux
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from '../../../redux/slices/userSlice'
//router
import { Link, useNavigate } from 'react-router-dom'
//custom hooks
import UseUserToken from '../../../hooks/useUserToken'
import useScreenSize from '../../../hooks/useScreenSize'

const theme = createTheme({
	typography: {
		p: {
			fontFamily: 'Segoe UI, sans-serif',
		},
	},
})

const TwitterHeaderUser = () => {
	//states
	const [isActive, setIsActive] = useState(false)
	//redux
	const userData = useSelector(state => state.user?.userData)
	const userId = useSelector(state => state.user?.userId)
	const dispatch = useDispatch()
	//router
	const navigate = useNavigate()
	//custom hooks
	const { removeToken } = UseUserToken()
	const screen = useScreenSize()

	const handleLogout = () => {
		//logout
		removeToken()
		dispatch(logOut())
		navigate(`/signIn`)
	}

	return (
		<ThemeProvider theme={theme}>
			{userData && userId && (
				<Box sx={{ position: 'relative' }}>
					{isActive && (
						<DropdownMenu
							onLogout={handleLogout}
							username={userData.username}
						/>
					)}

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
							width: '100%',
							p: 1,
							borderRadius: 2,
							transition: 'background-color 0.4s',
							'&:hover': {
								backgroundColor: '#C0C0C0',
							},
						}}
					>
						<Box
							component={Link}
							to={`/profile/${userId}`}
							sx={{
								display: 'flex',
								width: screen === 'desktop' ? '100%' : '60%',
								alignItems: 'center',
								justifyContent:
									screen === 'desktop' ? 'center' : 'space-between',
								textDecoration: 'none',
								gap: 0.5,
							}}
						>
							<AdaptiveAvatar
								src={userData.avatar}
								big={false}
								border={false}
								firstName={userData.firstName}
							/>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									alignItems: 'flex-start',
									gap: 0.5,
								}}
							>
								<Typography
									sx={{
										color: 'black',
										fontSize: 16,
										textOverflow: 'ellipsis',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
									}}
									variant='p'
								>{`${userData.firstName}`}</Typography>
								{screen === 'desktop' && (
									<UserTag maxWidth='20' userTag={userData.username} />
								)}
							</Box>
						</Box>
						<MoreVertIcon
							onClick={() => {
								setIsActive(prev => !prev)
							}}
							sx={{
								fontSize: '28px',
								cursor: 'pointer',
								color: isActive ? '#42a5f5' : 'black',
							}}
						/>
					</Box>
				</Box>
			)}
		</ThemeProvider>
	)
}

export default TwitterHeaderUser
