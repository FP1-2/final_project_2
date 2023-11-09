// TwitterHeader.js
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Box, List, ListItem, ListItemText } from '@mui/material'
import {
	Twitter as TwitterIcon,
	Home as HomeIcon,
	Search as SearchIcon,
	Notifications as NotificationsIcon,
	MailRounded as MailRoundedIcon,
	FavoriteRounded as FavoriteRoundedIcon,
	PersonRounded as PersonRoundedIcon,
} from '@mui/icons-material'
import TweetButton from '../TweetButton/TweetButton'
import { useSelector } from 'react-redux'

const TwitterHeader = () => {
	const location = useLocation()
	const [activeItem, setActiveItem] = useState(null)
	const userId = useSelector(state => state?.user?.userId)

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
				gap: '1.5rem',
				width: '100%',
				paddingX: '1rem',
				height: '100%',
				bgcolor: 'white',
			}}
		>
			<TwitterIcon
				sx={{ color: '#1DA1F2', fontSize: '50px', ml: '15px', mt: '15px' }}
			/>
			<List>
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
						})}
						<ListItemText
							primary={item.label}
							primaryTypographyProps={{
								fontWeight: activeItem === item.label ? 800 : 'normal',
								display: { xs: 'none', sm: 'block', md: 'block' },
							}}
						/>
					</ListItem>
				))}
				<TweetButton />
			</List>
		</Box>
	)
}

export default TwitterHeader
