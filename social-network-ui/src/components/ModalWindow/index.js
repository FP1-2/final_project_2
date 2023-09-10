import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { closeModal } from '../../redux/slices/modalSlice'
import CircularProgress from '@mui/material/CircularProgress'
import IconTwitter from '../IconTwitter'
import CustomInput from '../CustomInput'
import { Formik, Form } from 'formik'
import Button from '@mui/material/Button'
import * as Yup from 'yup'
import LinkText from '../LinkText'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Grid from '@mui/material/Grid'
import { useState, useEffect } from 'react'
import {
	format,
	addMonths,
	addDays,
	getYear,
	getDaysInMon,
	getDaysInMonth,
} from 'date-fns'

const months = [
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
	const years = []
	const currentYear = getYear(new Date())
	for (let i = currentYear; i >= currentYear - 100; i--) {
		years.push(i)
	}
	return years
}
const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	p: 4.5,
}
const validationSchema = Yup.object({
	email: Yup.string()
		.email('invalid email address')
		.required('Email is required'),
	name: Yup.string()
		.required('Name is required')
		.min(6, 'Please enter at least 6 characters'),
})

const initialValues = { name: '', email: '' }

const ModalWindow = () => {
	const dispatch = useDispatch()
	const [month, setMonth] = useState('')
	const [day, setDay] = useState('')
	const [year, setYear] = useState('')
	const [days, setDays] = useState([])

	const isModalOpen = useSelector(state => state.modal.modalProps.isOpen)
	const modalContent = useSelector(state => state.modal.modalProps?.content)

	const handleClose = () => {
		dispatch(closeModal())
	}
	const onSubmit = (values, { resetForm }) => {
		const responseObj = {
			...values,
			date: {
				month: month,
				day: day,
				year: year,
			},
		}
		console.log('send', responseObj)
		setMonth('')
		setDay('')
		setYear('')
		resetForm()
	}
	const getDays = () => {
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
		if (month !== '' && year !== '') {
			getDays()
		}
	}, [month, year])
	const years = getYears()
	return (
		<Modal
			open={isModalOpen}
			onClose={() => {
				setMonth('')
				setDay('')
				setYear('')
				handleClose()
			}}
		>
			<Box sx={style}>
				{modalContent !== null ? (
					<Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<IconTwitter
								style={{
									margin: '0 auto',
								}}
							/>
						</Box>
						<Typography variant='h4' sx={{ mb: 5, fontWeight: '700' }}>
							{modalContent?.header}
						</Typography>
						<Formik
							initialValues={initialValues}
							validationSchema={validationSchema}
							onSubmit={onSubmit}
						>
							{({ isValid, isSubmitting }) => (
								<Form
									style={{
										width: '100%',
									}}
								>
									{modalContent?.inputs.map(
										(
											{ name, type, label, placeholder, autoComplete },
											index
										) => {
											return (
												<CustomInput
													name={name}
													type={type}
													label={label}
													placeholder={placeholder}
													autoComplete={autoComplete}
													key={index}
												/>
											)
										}
									)}
									<Box
										sx={{
											mb: 2,
										}}
									>
										<LinkText text='Use Phone' />
									</Box>
									<Box
										sx={{
											marginBottom: '2rem',
										}}
									>
										<Typography
											variant='h6'
											sx={{
												fontWeight: '700',
												marginBottom: '0.1rem',
											}}
										>
											{modalContent.mainInfo.title}
										</Typography>
										<Typography
											variant='p'
											sx={{
												fontSize: '0.90rem',
											}}
										>
											{modalContent.mainInfo.text}
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
												<InputLabel id='demo-simple-select-label'>
													Month
												</InputLabel>
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
												<InputLabel id='demo-simple-select-label3'>
													Year
												</InputLabel>
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
												<InputLabel id='demo-simple-select-label2'>
													Day
												</InputLabel>
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
										disabled={!isValid || isSubmitting}
									>
										Log In
									</Button>
								</Form>
							)}
						</Formik>
					</Box>
				) : (
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
						}}
					>
						<CircularProgress />
					</Box>
				)}
			</Box>
		</Modal>
	)
}

export default ModalWindow
