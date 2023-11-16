import React from 'react'
//MUI
import { Box } from '@mui/material'
//Components
import ModalFollowListItem from './ModalFollowListItem/ModalFollowListItem'
//NPMs
import PropTypes from 'prop-types'

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
