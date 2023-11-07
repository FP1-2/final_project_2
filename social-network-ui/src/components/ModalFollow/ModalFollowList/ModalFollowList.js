import React from 'react'
import PropTypes from 'prop-types'
import ModalFollowListItem from './ModalFollowListItem/ModalFollowListItem'
import { Box } from '@mui/material'

const ModalFollowList = ({ followList }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 3,
				width: '100%',
			}}
		>
			{followList.map(item => (
				<ModalFollowListItem
					item={item}
					key={`${item.id}+${item.createdDate}`}
				/>
			))}
		</Box>
	)
}
ModalFollowList.propTypes = {
	followList: PropTypes.array.isRequired,
}
export default ModalFollowList
