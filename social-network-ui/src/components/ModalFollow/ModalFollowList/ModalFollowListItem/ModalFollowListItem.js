import React from 'react'
//MUI
import { Box, Typography } from '@mui/material'
//Router
import { Link } from 'react-router-dom'
//Components
import UserTag from '../../../UserTag/UserTag'
import AdaptiveAvatar from '../../../AdaptiveAvatar/AdaptiveAvatar'
//NPMs
import PropTypes from 'prop-types'

const ModalFollowListItem = ({ item }) => {
	return (
		<>
			{item && (
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-around',
						alignItems: 'center',
						p: 1,
						bgcolor: '#DCDCDC',
						borderRadius: 2,
						transition: 'background-color 0.4s',
						'&:hover': {
							backgroundColor: '#C0C0C0',
						},
					}}
				>
					<Link to={`/profile/${item.id}`}>
						<AdaptiveAvatar src={item.avatar} firstName={item.firstName} />
					</Link>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							width: '50%',
							gap: 0.5,
						}}
					>
						<Link to={`/profile/${item.id}`} style={{ textDecoration: 'none' }}>
							<Typography
								sx={{
									color: 'black',
									fontSize: 18,
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
								variant='p'
							>{`${item.firstName} ${item.lastName}`}</Typography>
						</Link>
						<Link to={`/profile/${item.id}`} style={{ textDecoration: 'none' }}>
							<UserTag userTag={item.username} />
						</Link>
					</Box>
				</Box>
			)}
		</>
	)
}
ModalFollowListItem.propTypes = {
	item: PropTypes.object.isRequired,
}
export default ModalFollowListItem
