import React, { useState, useEffect } from 'react'
//MUI
import { Box } from '@mui/material'
//Custom hooks
import useMenuItems from '../../../hooks/useMenuItems'
//Components
import TwitterHeaderItem from '../TwitterHeaderItem/TwitterHeaderItem'
//router
import { useLocation } from 'react-router-dom'
//NPMs
import PropTypes from 'prop-types'

const TwitterHeaderMobileMenu = ({ onClose }) => {
	//states
	const [activeItem, setActiveItem] = useState(null)
	//router
	const location = useLocation()
	//custom hooks
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
				position: 'fixed',
				minHeight: '100vh',
				minWidth: '100vw',
				bgcolor: 'white',
				zIndex: 9998,
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '30%',
					pt: 20,
					gap: 1,
					margin: '0 auto',
					'@media (max-width: 630px)': {
						width: '50%',
					},
				}}
			>
				{menuItems.map(item => (
					<TwitterHeaderItem
						onClose={onClose}
						big={true}
						location={location}
						activeItem={activeItem}
						item={item}
						key={item.link}
					/>
				))}
			</Box>
		</Box>
	)
}
TwitterHeaderMobileMenu.propTypes = {
	onClose: PropTypes.func,
}
export default TwitterHeaderMobileMenu
