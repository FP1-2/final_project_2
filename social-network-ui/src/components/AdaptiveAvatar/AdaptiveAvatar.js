import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material'
import AvatarWithoutImg from './../AvatarWithoutImg/AvatarWithoutImg'

const AdaptiveAvatar = ({ src, alt, firstName, big = true, border = true }) => {
	if (src) {
		return (
			<Avatar
				sx={{
					width: big ? '4.5rem' : '2.5rem',
					height: big ? '4.5rem' : '2.5rem',
					border: border ? '1px solid white' : 'none',
				}}
				src={src}
				alt={alt}
			/>
		)
	} else {
		return <AvatarWithoutImg border={border} userName={firstName} big={big} />
	}
}

AdaptiveAvatar.propTypes = {
	src: PropTypes.string,
	alt: PropTypes.string,
	firstName: PropTypes.string.isRequired,
	big: PropTypes.bool,
	border: PropTypes.bool,
}

export default AdaptiveAvatar
