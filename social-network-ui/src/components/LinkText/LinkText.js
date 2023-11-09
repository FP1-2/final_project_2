import React from 'react'
//Router
import { Link } from 'react-router-dom'
//styles
import styles from './LinkText.module.scss'
//NPMs
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
		<span className={styles.authLInks}>{text} </span>
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
