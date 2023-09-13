import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkText.module.scss'
import PropTypes from 'prop-types'
const LinkText = ({ text, link, isLink }) => {
	return isLink ? (
		<Link to={link} className={styles.authLInks}>
			{text}
		</Link>
	) : (
		<span className={styles.authLInks}>{text}</span>
	)
}

LinkText.propTypes = {
	text: PropTypes.string.isRequired,
	link: PropTypes.string,
	isLink: PropTypes.bool,
}

LinkText.defaultProps = {
	link: '/',
	isLink: true,
}

export default LinkText
