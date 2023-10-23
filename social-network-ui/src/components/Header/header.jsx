import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Button from '@mui/material/Button'
import { NavLink, Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home'
import SearchIcon from '@mui/icons-material/Search'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import styles from './header.module.scss'
import PropTypes from 'prop-types'
import { setIsLogin } from '../../redux/slices/userSlice'
import deleteAllCookies from '../../utils/deleteAllCookies'
import { ReactComponent as Logo } from '../../logo.svg'
import useMediaQuery from '@mui/material/useMediaQuery'
import { MIN_WIDTH } from './../../constants'

const drawerWidth = 240

export default function PermanentDrawerLeft({ pageName, children }) {
	const isLoggedIn = useSelector(state => state.user.isAuthenticated)
	let links = []
	isLoggedIn
		? (links = [
				'home',
				'explore',
				'notifications',
				'messages',
				'favourites',
				'profile',
		  ])
		: (links = ['home', 'explore'])

	const dispatch = useDispatch()

	function toggleLogin() {
		isLoggedIn && deleteAllCookies()
		dispatch(setIsLogin(!isLoggedIn))
	}

	const matches = useMediaQuery(MIN_WIDTH)

	if (matches) {
		return (
			<Box sx={{ display: 'flex' }}>
				<CssBaseline />

				<Drawer
					sx={{
						width: drawerWidth,
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							// width: drawerWidth,
							// width: '100%',
							boxSizing: 'border-box',
						},
					}}
					variant='permanent'
					anchor='left'
				>
					<Toolbar> </Toolbar>
					<AppBar
						position='fixed'
						sx={
							{
								// width: `calc(100% - ${drawerWidth}px)`,
								// ml: `${drawerWidth}px`
							}
						}
					>
						<Toolbar>
							<Link to='/home' className={styles.link}>
								{' '}
								<div className={styles.logo}>
									<Logo height='3rem' color='white' />
								</div>
							</Link>
							<Typography
								sx={{ ml: '24px' }}
								variant='h6'
								noWrap
								component='div'
							>
								{pageName}
							</Typography>
						</Toolbar>
					</AppBar>
					<Divider />
					<List>
						{links.map(text => (
							<NavLink to={'/' + text} key={text} className={styles.navlink}>
								<ListItem disablePadding>
									<ListItemButton>
										<ListItemIcon>
											{text === 'home' && <HomeIcon />}
											{text === 'explore' && <SearchIcon />}
											{text === 'notifications' && <NotificationsNoneIcon />}
											{text === 'messages' && <MailOutlineIcon />}
											{text === 'favourites' && <FavoriteBorderIcon />}
											{text === 'profile' && <PermIdentityIcon />}
										</ListItemIcon>
										{text}
									</ListItemButton>
								</ListItem>
							</NavLink>
						))}
					</List>
					<Divider />
					{isLoggedIn ? (
						<Button
							onClick={() => toggleLogin()}
							sx={{
								justifyContent: 'left',
								mt: '5px',
								width: '100%',
								pl: '16px',
								color: 'rgb(108, 101, 101)',
								textTransform: 'none',
								fontWeight: '700',
								fontSize: '1rem',
							}}
						>
							<div className={styles.logoutIcon}>
								<LogoutIcon />
							</div>
							Logout
						</Button>
					) : (
						<Button
							onClick={() => toggleLogin()}
							sx={{
								justifyContent: 'left',
								mt: '5px',
								width: '100%',
								pl: '16px',
								textTransform: 'none',
								fontWeight: '700',
								fontSize: '1rem',
							}}
						>
							<div className={styles.logoutIcon}>
								<LoginIcon />
							</div>
							Login
						</Button>
					)}
				</Drawer>
				<Box
					component='main'
					sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
				>
					{children}
					<Toolbar />
				</Box>
			</Box>
		)
	} else {
		return (
			<>
				<AppBar position='static'>
					<Container maxWidth='xl'>
						<Toolbar disableGutters>
							<Box
								sx={{
									flexGrow: 1,
									display: 'flex',
									justifyContent: 'space-between',
								}}
							>
								<Link to='/home' className={styles.link}>
									<Logo height='40px' />
								</Link>
								{isLoggedIn ? (
									<Button onClick={() => toggleLogin()}>
										<div className={styles.logoutIconMob}>
											<LogoutIcon />
										</div>
									</Button>
								) : (
									<Button onClick={() => toggleLogin()}>
										<div className={styles.logoutIconMob}>
											<LoginIcon />
										</div>
									</Button>
								)}
							</Box>
						</Toolbar>
					</Container>
				</AppBar>
				<Box
					component='main'
					sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
				>
					{children}
				</Box>
				<AppBar
					position='fixed'
					color='primary'
					sx={{ top: 'auto', bottom: 0 }}
				>
					<Toolbar>
						<div className={styles.toolbar}>
							<NavLink
								to='/home'
								style={({ isActive }) => ({
									color: isActive ? 'red' : 'white',
								})}
							>
								<IconButton color='inherit' aria-label='home'>
									<HomeIcon />
								</IconButton>
							</NavLink>
							<NavLink to='/explore'>
								<IconButton color='inherit' aria-label='explore'>
									<SearchIcon />
								</IconButton>
							</NavLink>
							{isLoggedIn ? (
								<>
									<NavLink to='/notifications'>
										<IconButton color='inherit' aria-label='notifications'>
											<NotificationsNoneIcon />
										</IconButton>
									</NavLink>
									<NavLink to='/messages'>
										<IconButton color='inherit' aria-label='messages'>
											<MailOutlineIcon />
										</IconButton>
									</NavLink>
								</>
							) : null}
						</div>
					</Toolbar>
				</AppBar>
			</>
		)
	}
}

PermanentDrawerLeft.propTypes = {
	pageName: PropTypes.string,
	children: PropTypes.node,
}
