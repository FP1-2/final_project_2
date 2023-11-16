import React from 'react'
//redux
import { useSelector } from 'react-redux'
//MUI
import {
	Home as HomeIcon,
	Search as SearchIcon,
	Notifications as NotificationsIcon,
	MailRounded as MailRoundedIcon,
	FavoriteRounded as FavoriteRoundedIcon,
	PersonRounded as PersonRoundedIcon,
} from '@mui/icons-material'

const useMenuItems = () => {
	//redux
	const userId = useSelector(state => state.user?.userId)

	return [
		{ label: 'Home', link: '/home', icon: <HomeIcon /> },
		{
			label: 'Profile',
			link: `/profile/${userId}`,
			icon: <PersonRoundedIcon />,
		},
		{
			label: 'Notifications',
			link: '/notifications',
			icon: <NotificationsIcon />,
		},
		{ label: 'Messages', link: '/messages', icon: <MailRoundedIcon /> },
		{ label: 'Favourites', link: '/favourites', icon: <FavoriteRoundedIcon /> },
	]
}

export default useMenuItems
