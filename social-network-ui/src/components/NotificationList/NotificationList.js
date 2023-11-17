import React from 'react'
//MUI
import { Box } from '@mui/material'
//Components
import NotificationListItem from './NotificationListItem/NotificationListItem'
//NPMs
import PropTypes from 'prop-types'

const NotificationList = ({ notifications }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				width: '100%',
				gap: 2.5,
				py: 2,
			}}
		>
			{notifications.map(notification => (
				<NotificationListItem key={notification.id} data={notification} />
			))}
		</Box>
	)
}

NotificationList.propTypes = {
	notifications: PropTypes.array,
}
export default NotificationList
