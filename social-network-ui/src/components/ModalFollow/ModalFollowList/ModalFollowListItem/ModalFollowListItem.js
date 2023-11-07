import React from 'react'
import { Box, Avatar, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import AvatarWithoutImg from '../../../AvatarWithoutImg/AvatarWithoutImg'
import { Link } from 'react-router-dom'

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
						{item.avatar ? (
							<Avatar
								sx={{
									width: '4.5rem',
									height: '4.5rem',
									border: '1px solid white',
								}}
								src={item.avatar}
							></Avatar>
						) : (
							<AvatarWithoutImg
								border={true}
								userName={item.firstName}
								big={true}
							/>
						)}
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
							<Typography
								variant='p'
								sx={{
									color: 'black',
									opacity: 0.5,
									fontSize: 12,
									textOverflow: 'ellipsis',
									overflow: 'hidden',
									whiteSpace: 'nowrap',
								}}
							>
								@{item.username}
							</Typography>
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
