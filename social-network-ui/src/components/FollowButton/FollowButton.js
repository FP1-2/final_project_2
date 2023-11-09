import React from 'react'
//MUI
import { Button } from '@mui/material'
//NPMs
import PropTypes from 'prop-types'

const FollowButton = ({ userId, isFollowing, handleFollowChange }) => {
	return (
		<>
			{isFollowing ? (
				<Button
					onClick={() => handleFollowChange(userId, false)}
					sx={{
						marginTop: '1rem',
						p: 1,
						paddingX: '1.1rem',
						border: '1px solid black',
						borderRadius: '3rem',
						textTransform: 'none',
						color: 'black',
					}}
				>
					Unfollow
				</Button>
			) : (
				<Button
					onClick={() => handleFollowChange(userId, true)}
					sx={{
						marginTop: '1rem',
						p: 1,
						paddingX: '1.1rem',
						border: '1px solid black',
						borderRadius: '3rem',
						textTransform: 'none',
						color: 'black',
					}}
				>
					Follow
				</Button>
			)}
		</>
	)
}

FollowButton.propTypes = {
	isFollowing: PropTypes.bool.isRequired,
	handleFollowChange: PropTypes.func.isRequired,
	userId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default FollowButton
