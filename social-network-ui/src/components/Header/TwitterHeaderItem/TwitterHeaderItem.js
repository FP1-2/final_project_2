import React from 'react'
//MUI
import { ListItem, ListItemText } from '@mui/material'
//Router
import { Link } from 'react-router-dom'
//NPMs
import PropTypes from 'prop-types'

const TwitterHeaderItem = ({ big, location, item, activeItem, onClose }) => {
	return (
		<ListItem
			key={item.label}
			button
			sx={{ gap: '1rem', borderRadius: '2rem' }}
			component={Link}
			to={item.link}
			onClick={() => {
				onClose(false)
			}}
		>
			{React.cloneElement(item.icon, {
				color: location.pathname === item.link ? 'primary' : 'action',
				sx: {
					fontSize: big ? '34px' : '26px',
				},
			})}
			<ListItemText
				primary={item.label}
				primaryTypographyProps={{
					fontWeight: activeItem === item.label ? 800 : 'normal',
					fontSize: big ? '26px' : '16px',
				}}
			/>
		</ListItem>
	)
}
TwitterHeaderItem.propTypes = {
	item: PropTypes.object,
	activeItem: PropTypes.string,
	location: PropTypes.object,
	big: PropTypes.bool,
	onClose: PropTypes.func,
}

TwitterHeaderItem.defaultProps = {
	onClose: () => {},
}

export default TwitterHeaderItem
