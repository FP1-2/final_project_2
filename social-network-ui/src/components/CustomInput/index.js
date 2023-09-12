import React from 'react'
import { useField } from 'formik'
import PropTypes from 'prop-types'
import styles from './CustomInput.module.scss'
import ErrorIcon from '@mui/icons-material/Error'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

function CustomInput({ label, ...props }) {
	const [field, meta] = useField(props)

	return (
		<div className={styles.root}>
			<input
				className={styles.input}
				label={label}
				{...field}
				{...props}
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
		</div>
	)
}

CustomInput.propTypes = {
	label: PropTypes.string,
}

CustomInput.defaultProps = {
	label: '',
}

export default CustomInput
