import React, { useState, useEffect } from 'react'
//router
import { useLocation } from 'react-router-dom'
//MUI
import { Box, List } from '@mui/material'
//Components
import TweetButton from '../TweetButton/TweetButton'
import IconTwitter from '../IconTwitter/IconTwitter'
import TwitterHeaderUser from './TwitterHeaderUser/TwitterHeaderUser'
import useMenuItems from '../../hooks/useMenuItems'
import TwitterHeaderItem from './TwitterHeaderItem/TwitterHeaderItem'

const TwitterHeader = () => {
	//state
	const [activeItem, setActiveItem] = useState(null)
	//router
	const location = useLocation()
	//custom hook
	const menuItems = useMenuItems()

	useEffect(() => {
		//init active item after change location
		const initialActiveItem = menuItems.find(
			item => item.link === location.pathname
		)
		if (initialActiveItem) {
			setActiveItem(initialActiveItem.label)
		}
	}, [location.pathname])

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
						mb: 2.5
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
						<TwitterHeaderItem
							location={location}
							activeItem={activeItem}
							item={item}
							key={item.link}
						/>
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
