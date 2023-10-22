import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkText.module.scss'
import PropTypes from 'prop-types'
const LinkText = ({ text, link, isLink, href }) => {
	return isLink ? (
		href ? (
			<a
				href={`https://${link}`}
				target='_blank'
				rel='noreferrer'
				className={styles.authLInks}
			>
				{text}
			</a>
		) : (
			<Link to={link} className={styles.authLInks}>
				{text}
			</Link>
		)
	) : (
		<span className={styles.authLInks}>{text}</span>
	)
}

LinkText.propTypes = {
	text: PropTypes.string.isRequired,
	link: PropTypes.string,
	isLink: PropTypes.bool,
	href: PropTypes.bool,
}

LinkText.defaultProps = {
	link: '/',
	isLink: true,
	href: false,
}

export default LinkText
