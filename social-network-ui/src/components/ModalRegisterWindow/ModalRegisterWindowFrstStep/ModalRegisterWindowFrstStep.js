import React, { useEffect, useState } from 'react'
//MUI
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Box,
	Typography,
} from '@mui/material'
//redux
import { useDispatch } from 'react-redux'
import { register } from '../../../redux/slices/registerSlice'
//Components
import CustomInput from '../../CustomInput/CustomInput'
import LinkText from '../../LinkText/LinkText'
//NPMs
import { getDaysInMonth, getYear } from 'date-fns'
import { Form, Formik } from 'formik'
import { PropTypes } from 'prop-types'
import * as Yup from 'yup'

const months = [
	// months for date of birth
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

function getYears() {
	// get years for date of birth
	const years = []
	const currentYear = getYear(new Date())
	for (let i = currentYear; i >= currentYear - 100; i--) {
		years.push(i)
	}
	return years
}

const allYears = getYears() // all years for date of birth

const validationSchema = Yup.object({
	email: Yup.string()
		.email('invalid email address')
		.required('Email is required'),
	firstName: Yup.string()
		.required('Name is required')
		.min(3, 'Please enter at least 3 characters'),
})
const validationSchemaAlt = Yup.object({
	phone: Yup.string()
		.required('Phone is required')
		.min(5, 'Please enter at least 6 characters')
		.max(15, 'Please enter at most 15 characters')
		.matches(/^[0-9]*$/, 'Please enter a valid phone number (only numbers)'),

	firstName: Yup.string()
		.required('Name is required')
		.min(3, 'Please enter at least 3 characters'),
})

const initialValuesAlt = {
	firstName: '',
	phone: '',
}

const ModalRegisterWindowFrstStep = ({
	setIsLoading,
	isModalOpen,
	setRegisterStep,
}) => {
	//states

	const [month, setMonth] = useState('')
	const [day, setDay] = useState('')
	const [year, setYear] = useState('')
	const [days, setDays] = useState([])
	const [isPhone, setIsPhone] = useState(false) // phone or email registration

	//redux
	const dispatch = useDispatch()
	//constants
	const years = allYears // years for date of birth
	const initialValues = { firstName: '', email: '', phone: '' }

	const getDays = () => {
		// using month and year for get true days in month
		const daysInMonth = getDaysInMonth(new Date(year, month))
		setDays(prevDays => {
			const newDays = []
			for (let day = 1; day <= daysInMonth; day++) {
				newDays.push(day)
			}
			return newDays
		})
	}

	useEffect(() => {
		//adaptive day picker
		if (month !== '' && year !== '') {
			getDays()
		}
	}, [month, year])

	const handleNextRegistrationStep = obj => {
		// add first part of register data
		dispatch(register(obj))
		// setIsLoading(true)
		// setIsLoading(false)
		setRegisterStep(prevStep => prevStep + 1)
	}
	const resetInfo = () => {
		// reset info on the fields
		setMonth('')
		setDay('')
		setYear('')
	}

	useEffect(() => {
		//reset info if modal cloce
		if (!isModalOpen) {
			resetInfo()
		}
	}, [isModalOpen])

	const onSubmit = (values, { resetForm }) => {
		// submit form
		const newValues = { ...values }
		if (isPhone) {
			// if phone registration
			newValues.email = false
		} else {
			// if email registration
			newValues.phone = false
		}
		const newBirthday = `${year}-${month < 10 ? `0${month + 1}` : month + 1}-${
			day < 10 ? `0${day}` : day
		}`

		const responseObj = {
			// add first part of register data
			...newValues,
			birthday: newBirthday,
		}
		handleNextRegistrationStep(responseObj)
		resetInfo()
		resetForm()
	}
	return (
		<Box
			sx={{
				'@media (max-width: 600px)': {
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
				},
			}}
		>
			<Typography variant='h4' sx={{ mb: 5, fontWeight: '700' }}>
				Create an account
			</Typography>
			<Formik
				initialValues={initialValues}
				validationSchema={isPhone ? validationSchemaAlt : validationSchema}
				onSubmit={onSubmit}
			>
				{({ isValid, isSubmitting, values }) => (
					<Form
						style={{
							width: '100%',
						}}
					>
						<CustomInput
							name='firstName'
							type='text'
							label='Name'
							placeholder='Your First Name'
							autoComplete='firstName'
						/>
						{isPhone === false ? (
							<CustomInput
								name='email'
								type='email'
								label='Email'
								placeholder='Your Email'
								autoComplete='email'
							/>
						) : (
							<CustomInput
								name='phone'
								type='text'
								label='Phone'
								placeholder='Your Phone'
								autoComplete='phone'
							/>
						)}
						<Box
							sx={{
								mb: 2,
								cursor: 'pointer',
								width: 'fit-content',
							}}
							onClick={() =>
								setIsPhone(prevState => {
									return !prevState
								})
							}
						>
							<LinkText
								text={isPhone ? 'Use email' : 'Use phone'}
								isLink={false}
							/>
						</Box>
						<Box
							sx={{
								marginBottom: '2rem',
								'@media (max-width: 600px)': {
									marginBottom: '1.5rem',
								},
							}}
						>
							<Typography
								variant='h6'
								sx={{
									fontWeight: '700',
									marginBottom: '0.1rem',
									'@media (max-width: 600px)': {
										marginBottom: '0.3rem',
									},
								}}
							>
								Date of birth
							</Typography>
							<Typography
								variant='p'
								sx={{
									fontSize: '0.90rem',
									'@media (max-width: 600px)': {
										lineHeight: `1.6em`,
										maxHeight: `130px`,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										display: '-webkit-box',
										WebkitLineClamp: 4,
										WebkitBoxOrient: 'vertical',
									},
								}}
							>
								Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh
								sit. Quis bibendum ante phasellus metus, magna lacinia sed
								augue. Odio enim nascetur leo mauris vel eget. Pretium id
								ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa
								in molestie a sit. Elit congue.
							</Typography>
						</Box>

						<Grid
							container
							spacing={2}
							sx={{
								mb: 5,
							}}
						>
							<Grid item xs={6}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label'>Month</InputLabel>
									<Select
										labelId='demo-simple-select-label'
										id='demo-simple-select'
										value={month}
										label='Month'
										onChange={e => setMonth(e.target.value)}
										MenuProps={{
											PaperProps: {
												style: {
													maxHeight: 150,
												},
											},
										}}
									>
										{months.map((month, index) => (
											<MenuItem key={month} value={index}>
												{month}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label3'>Year</InputLabel>
									<Select
										labelId='demo-simple-select-label3'
										id='demo-simple-select3'
										value={year}
										disabled={month === ''}
										label='Year'
										onChange={e => setYear(e.target.value)}
										MenuProps={{
											PaperProps: {
												style: {
													maxHeight: 150,
												},
											},
										}}
									>
										{years.map(year => (
											<MenuItem key={year} value={year}>
												{year}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={3}>
								<FormControl fullWidth>
									<InputLabel id='demo-simple-select-label2'>Day</InputLabel>
									<Select
										labelId='demo-simple-select-label2'
										id='demo-simple-select2'
										value={day}
										label='Day'
										onChange={e => setDay(e.target.value)}
										disabled={year === ''}
										MenuProps={{
											PaperProps: {
												style: {
													maxHeight: 150,
												},
											},
										}}
									>
										{days.map(day => (
											<MenuItem key={day} value={day}>
												{day}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
						</Grid>
						<Button
							id='submit-button'
							type='submit'
							variant='contained'
							fullWidth
							margin='normal'
							sx={{
								marginBottom: '1.3rem',
								padding: '1.1rem 0',
								borderRadius: '2rem',
								fontSize: '1rem',
								fontWeight: 700,
								textTransform: 'none',
								backgroundColor: '#1DA1F2',
							}}
							disabled={
								!isValid ||
								isSubmitting ||
								day === '' ||
								values.firstName === '' ||
								(isPhone ? values.phone === '' : values.email === '')
							}
						>
							Next
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

ModalRegisterWindowFrstStep.propTypes = {
	isModalOpen: PropTypes.bool.isRequired,
	setIsLoading: PropTypes.func.isRequired,
	setRegisterStep: PropTypes.func.isRequired,
}

export default ModalRegisterWindowFrstStep
