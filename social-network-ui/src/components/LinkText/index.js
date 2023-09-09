import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LinkText.module.scss'
import PropTypes from 'prop-types'

const LinkText = ({ text }) => {
	return <Link className={styles.authLInks}>{text}</Link>
}

LinkText.propTypes = {
	text: PropTypes.string.isRequired,
}

export default LinkText
