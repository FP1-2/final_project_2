import React, { useEffect, useState } from 'react'
//MUI
import { Box, Typography } from '@mui/material'
//Router
import { Link } from 'react-router-dom'
//Redux
import { useSelector } from 'react-redux'
//Components
import UserTag from '../../../UserTag/UserTag'
import AdaptiveAvatar from '../../../AdaptiveAvatar/AdaptiveAvatar'
import FollowButton from '../../../FollowButton/FollowButton'
//Custom hooks
import UseUserToken from '../../../../hooks/useUserToken'
import useIsUserFollowing from '../../../../hooks/useIsUserFollowing'
//NPMs
import PropTypes from 'prop-types'
import axios from 'axios'

const ModalFollowListItem = ({ item }) => {
	//states
	const [loadIsDone, setLoadIsDone] = useState(false)
	//Custom hooks
	const { isFollowing, checkIsFollowing } = useIsUserFollowing()
	const { token } = UseUserToken()

	useEffect(() => {
		if (item.id) {
			checkIsFollowing(item.id)
			setLoadIsDone(true)
		}
	}, [item.id])

	const handleFollowChange = async (userId, follow) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/${
					follow ? 'subscribe' : 'unsubscribe'
				}/${userId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			console.log(`user is ${follow ? 'subscribe' : 'unsubscribe'}`)
		} catch (error) {
			console.error(error)
		} finally {
			checkIsFollowing(userId)
		}
	}

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
						<Box
							component={Link}
							sx={{
								maxWidth: '90%',
								textOverflow: 'ellipsis',
								overflow: 'hidden',
								whiteSpace: 'nowrap',
							}}
							to={`/profile/${item.id}`}
							style={{ textDecoration: 'none' }}
						>
							<Typography
								sx={{
									color: 'black',
									fontSize: 18,
								}}
								variant='p'
							>{`${item.firstName} ${item.lastName}`}</Typography>
						</Box>
						<Link to={`/profile/${item.id}`} style={{ textDecoration: 'none' }}>
							<UserTag userTag={item.username} />
						</Link>
					</Box>
					{loadIsDone && (
						<FollowButton
							handleFollowChange={handleFollowChange}
							userId={item.id}
							isFollowing={isFollowing}
						/>
					)}
				</Box>
			)}
		</>
	)
}
ModalFollowListItem.propTypes = {
	item: PropTypes.object.isRequired,
}
export default ModalFollowListItem
