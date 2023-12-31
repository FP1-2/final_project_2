import React, { useEffect, useState } from 'react'
//Styles
import styles from './CustomInput.module.scss'
//MUI
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import ErrorIcon from '@mui/icons-material/Error'
//NPMs
import { useField } from 'formik'
import PropTypes from 'prop-types'

function CustomInput({ label, ...props }) {
	const [field, meta] = useField(props)
	const { type } = props // input type
	const [showPassword, setShowPassword] = useState(false)

	const handlePasswordVisibility = () => {
		// show/hide password
		setShowPassword(!showPassword)
	}
	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				label={label}
				{...field}
				{...props}
				type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
				error={meta.touched && !!meta.error ? 'true' : 'false'}
				aria-describedby={
					meta.touched && meta.error ? `${field.name}-error-text` : undefined
				}
			/>
			{meta.touched && meta.error && <ErrorIcon className={styles.errorIcon} />}
			{(meta.touched || field.value !== '') && !meta.error && (
				<CheckCircleIcon className={styles.successIcon} />
			)}
			{meta.touched && meta.error && (
				<div className={styles.error}>{meta.error}</div>
			)}
			{type === 'password' &&
				(showPassword ? (
					<VisibilityOffIcon
						sx={{
							position: 'absolute',
							top: '1.25rem',
							right: '3.15rem',
							cursor: 'pointer',
						}}
						onClick={handlePasswordVisibility}
					/>
				) : (
					<VisibilityIcon
						sx={{
							position: 'absolute',
							top: '1.25rem',
							right: '3.15rem',
							cursor: 'pointer',
						}}
						onClick={handlePasswordVisibility}
					/>
				))}
		</div>
	)
}

CustomInput.propTypes = {
	label: PropTypes.string,
	type: PropTypes.string.isRequired,
}

CustomInput.defaultProps = {
	label: '',
}

export default CustomInput
