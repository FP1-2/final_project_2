import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkText.module.scss'
import PropTypes from 'prop-types'
const LinkText = ({ text, link }) => {
	return (
		<Link to={link} className={styles.authLInks}>
			{text}
		</Link>
	)
}

LinkText.propTypes = {
	text: PropTypes.string.isRequired,
	link: PropTypes.string,
}

LinkText.defaultProps = {
	link: '/',
}

export default LinkText
