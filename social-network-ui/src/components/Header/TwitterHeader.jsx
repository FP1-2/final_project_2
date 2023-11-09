import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import {
	Home as HomeIcon,
	Search as SearchIcon,
	Notifications as NotificationsIcon,
	MailRounded as MailRoundedIcon,
	FavoriteRounded as FavoriteRoundedIcon,
	PersonRounded as PersonRoundedIcon,
} from '@mui/icons-material'
import TweetButton from '../TweetButton/TweetButton'
import { useSelector } from 'react-redux'
import IconTwitter from '../IconTwitter/IconTwitter'
import TwitterHeaderUser from './TwitterHeaderUser/TwitterHeaderUser'

const TwitterHeader = () => {
	const location = useLocation()
	const [activeItem, setActiveItem] = useState(null)
	const userId = useSelector(state => state?.user?.userId)

	useEffect(() => {
		const initialActiveItem = menuItems.find(
			item => item.link === location.pathname
		)
		if (initialActiveItem) {
			setActiveItem(initialActiveItem.label)
		}
	}, [location.pathname])

	const handleItemClick = itemName => {
		setActiveItem(itemName)
	}

	const menuItems = [
		{ label: 'Home', link: '/home', icon: <HomeIcon /> },
		{ label: 'Explore', link: '/explore', icon: <SearchIcon /> },
		{
			label: 'Notifications',
			link: '/notifications',
			icon: <NotificationsIcon />,
		},
		{ label: 'Messages', link: '/messages', icon: <MailRoundedIcon /> },
		{ label: 'Favourites', link: '/favourites', icon: <FavoriteRoundedIcon /> },
		{
			label: 'Profile',
			link: `/profile/${userId}`,
			icon: <PersonRoundedIcon />,
		},
	]

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				height: '100%',
			}}
		>
			<Box
				sx={{
					gap: '1.5rem',
					width: '100%',
					px: 2,
					height: '100%',
					bgcolor: 'white',
				}}
			>
				<Box
					sx={{
						px: 3,
						pt: 1.5,
					}}
				>
					<IconTwitter link='home' md={true} />
				</Box>
				<List
					sx={{
						mb: 3,
					}}
				>
					{menuItems.map(item => (
						<ListItem
							key={item.label}
							button
							sx={{ gap: '1rem', borderRadius: '2rem' }}
							component={Link}
							to={item.link}
							onClick={() => handleItemClick(item.label)}
						>
							{React.cloneElement(item.icon, {
								color: location.pathname === item.link ? 'primary' : 'action',
								sx: {
									fontSize: '26px',
								},
							})}
							<ListItemText
								primary={item.label}
								primaryTypographyProps={{
									fontWeight: activeItem === item.label ? 800 : 'normal',
								}}
							/>
						</ListItem>
					))}
				</List>
				<TweetButton />
			</Box>
			<Box
				sx={{
					mb: 15,
					px: 2,
				}}
			>
				<TwitterHeaderUser />
			</Box>
		</Box>
	)
}

export default TwitterHeader
