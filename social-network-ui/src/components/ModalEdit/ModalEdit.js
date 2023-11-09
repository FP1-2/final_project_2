import React, { useState } from 'react'
// MUI
import { Button, Modal, Box, InputLabel, Avatar } from '@mui/material'
import { Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
// Redux
import { closeModal } from '../../redux/slices/modalEditSlice'
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '../../redux/slices/userSlice'
// Formik и Yup
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
// Components
import CustomInput from '../CustomInput/CustomInput'
import AvatarWithoutImg from '../AvatarWithoutImg/AvatarWithoutImg'
import IconTwitter from '../IconTwitter/IconTwitter'
//NPMs
import styled from '@emotion/styled'
import axios from 'axios'
//API
import editUserProfile from '../../api/editUserProfile'
//Custom Hooks
import UseUserToken from '../../hooks/useUserToken'
import PropTypes from 'prop-types'

//validation schema for edit form
const validationSchema = Yup.object({
	firstName: Yup.string().min(3, 'Please enter at least 3 characters'),
	lastName: Yup.string().min(3, 'Please enter at least 3 characters'),
	address: Yup.string().min(3, 'Please enter at least 3 characters'),
	username: Yup.string().min(6, 'Please enter at least 6 characters'),
	birthday: Yup.string().matches(
		/^\d{4}-\d{2}-\d{2}$/,
		'Please enter a correct date'
	),
	userDescribe: Yup.string().max(60, 'Please enter 60 characters or less'),
})

const VisuallyHiddenInput = styled('input')`
	clip: rect(0 0 0 0);
	clip-path: inset(50%);
	height: 1px;
	overflow: hidden;
	position: absolute;
	bottom: 0;
	left: 0;
	white-space: nowrap;
	width: 1px;
`

const ModalEdit = ({ user, setUser }) => {
	//redux state
	const isOpen = useSelector(state => state.modalEdit.modalProps.isOpen)
	//redux
	const dispatch = useDispatch()
	//custom hooks
	const { token } = UseUserToken()
	//state >>>
	const [imageUrl, setImageUrl] = useState('') // image url
	const [backgroundImageUrl, setBackgroundImageUrl] = useState('') // bg
	//>>//Loading state
	const [error, setError] = useState('') // error
	const [isBtnLoading, setIsBtnLoading] = useState(false)
	const [isAvatarLoading, setIsAvatarLoading] = useState(false)
	const [isBgLoading, setIsBgLoading] = useState(false)
	//<<<< state

	//env
	const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME // Cloudinary cloud name
	const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET // Cloudinary upload preset

	const handleImageUpload = async (event, type) => {
		// image upload
		const file = event.target.files[0]

		if (!file) return

		const formData = new FormData()
		formData.append('file', file)
		formData.append('upload_preset', uploadPreset)
		if (type === 'avatar') setIsAvatarLoading(true)
		if (type === 'background') setIsBgLoading(true)

		try {
			const response = await axios.post(
				`https://api.cloudinary.com/v1_1/${cloudName}/upload`,
				formData
			)

			if (response.status === 200) {
				const uploadedImageUrl = response.data.secure_url
				if (type === 'avatar') {
					setImageUrl(uploadedImageUrl)
				} else if (type === 'background') {
					console.log('123')
					setBackgroundImageUrl(uploadedImageUrl)
				}
				setError('')
			} else {
				setError('Something went wrong')
			}
		} catch (err) {
			setError('Something went wrong')
		}
		if (type === 'avatar') setIsAvatarLoading(false)
		if (type === 'background') setIsBgLoading(false)
	}

	const handleCloseModal = () => {
		// need add reset form
		dispatch(closeModal())
	}

	return (
		<Modal open={isOpen} onClose={() => handleCloseModal()}>
			<Box
				sx={{
					position: 'absolute',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					width: '70%',
					p: 2,
					pt: 32,
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					maxHeight: '95vh',
					overflowY: 'auto',
					bgcolor: 'white',
					boxShadow: 24,
					borderRadius: '7px',
					'@media (max-width: 600px)': {
						width: '100%',
						height: '100%',
						maxHeight: '100vh',
						borderRadius: '0px',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: 'auto',
					}}
				>
					<IconTwitter notLink={() => handleCloseModal()} />
				</Box>

				<Formik
					initialValues={{
						firstName: user.firstName,
						lastName: user.lastName,
						username: user.username,
						address: user.address,
						userLink: user.userLink || '',
						birthday: user.birthday,
						userDescribe: user.userDescribe || '',
					}}
					onSubmit={async values => {
						setIsBtnLoading(true)
						const newValues = {
							...values,
							avatar: imageUrl || user.avatar,
							bgProfileImage: backgroundImageUrl || user.bgProfileImage,
						}

						try {
							const data = await editUserProfile(newValues, token)
							dispatch(setUserData(data))
							handleCloseModal()
						} catch (error) {
							console.log(error)
						}
						setIsBtnLoading(false)
					}}
					validationSchema={validationSchema}
				>
					<Form>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									width: '100%',
									pt: 2,
									borderRadius: '30px',
									backgroundImage: backgroundImageUrl
										? `url(${backgroundImageUrl})`
										: 'none',
									backgroundSize: 'cover',
								}}
							>
								{!imageUrl && !user.avatar && (
									<AvatarWithoutImg userName={user.firstName} />
								)}
								{(imageUrl || user.avatar) && (
									<Avatar
										sx={{
											width: '6rem',
											height: '6rem',
											mb: 1,
											border: '3px solid rgb(29, 161, 242)',
										}}
										src={imageUrl || user.avatar}
									></Avatar>
								)}
								<Button
									component='label'
									variant='contained'
									href='#file-upload'
									sx={{
										display: 'flex',
										gap: 2,
										mb: 1,
										bgcolor: 'rgb(29, 161, 241)',
										borderRadius: '2rem',
									}}
								>
									Update Avatar
									{isAvatarLoading && <CircularProgress size={25} />}
									<VisuallyHiddenInput
										type='file'
										onChange={e => handleImageUpload(e, 'avatar')}
									/>
								</Button>
								<Button
									component='label'
									variant='contained'
									href='#file-upload'
									sx={{
										display: 'flex',
										gap: 1,
										bgcolor: 'rgb(29, 161, 241)',
										borderRadius: '2rem',
										mb: 4,
									}}
								>
									Update Background Image
									{isBgLoading && <CircularProgress size={25} />}
									<VisuallyHiddenInput
										type='file'
										onChange={e => handleImageUpload(e, 'background')}
									/>
								</Button>
							</Box>
							<Box
								sx={{
									display: 'flex',
									gap: 5,
								}}
							>
								<Box>
									<InputLabel
										sx={{
											p: 1,
											cursor: 'pointer',
										}}
										htmlFor='firstName'
									>
										Your Name
									</InputLabel>
									<CustomInput type='text' id='firstName' name='firstName' />
								</Box>
								<Box sx={{}}>
									<InputLabel
										sx={{
											p: 1,
											cursor: 'pointer',
										}}
										htmlFor='lastName'
									>
										Your Surname
									</InputLabel>
									<CustomInput type='text' id='lastName' name='lastName' />
								</Box>
							</Box>
							<Box
								sx={{
									width: '100%',
								}}
							>
								<InputLabel
									sx={{
										p: 1,
										cursor: 'pointer',
									}}
									htmlFor='username'
								>
									Your @Tag
								</InputLabel>
								<CustomInput type='text' id='username' name='username' />
							</Box>
							<Box
								sx={{
									width: '100%',
								}}
							>
								<InputLabel
									sx={{
										p: 1,
										cursor: 'pointer',
									}}
									htmlFor='userDescribe'
								>
									Your Profile Description
								</InputLabel>
								<CustomInput
									type='text'
									id='userDescribe'
									name='userDescribe'
								/>
							</Box>
							<Box
								sx={{
									display: 'flex',
									gap: 5,
								}}
							>
								<Box
									sx={{
										minWidth: '35%',
									}}
								>
									<InputLabel
										sx={{
											p: 1,
											cursor: 'pointer',
										}}
										htmlFor='address'
									>
										Your City
									</InputLabel>
									<CustomInput type='text' id='address' name='address' />
								</Box>
								<Box>
									<InputLabel
										sx={{
											p: 1,
											cursor: 'pointer',
										}}
										htmlFor='birthday'
									>
										Your Birthday{' '}
										<Typography
											variant='p'
											sx={{
												opacity: 0.3,
												fontSize: 12,
												textTransform: 'uppercase',
												cursor: 'pointer',
											}}
										>
											(yyyy-mm-dd)
										</Typography>
									</InputLabel>
									<CustomInput type='text' id='birthday' name='birthday' />
								</Box>
							</Box>
							<Box
								sx={{
									width: '100%',
									textAlign: 'center',
								}}
							>
								<InputLabel
									sx={{
										p: 1,
										cursor: 'pointer',
									}}
									htmlFor='userLink'
								>
									Your Personal Site Link
								</InputLabel>
								<CustomInput type='text' id='userLink' name='userLink' />
							</Box>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							<Button
								disabled={isBtnLoading}
								sx={{
									display: 'flex',
									gap: 5,
									width: '77%',
									marginBottom: '1.3rem',
									padding: '1.1rem 0',
									borderRadius: '2rem',
									fontSize: '1rem',
									fontWeight: 700,
									textTransform: 'none',
									backgroundColor: '#1DA1F2',
									color: 'white',
									boxSizing: 'border-box',
									':hover': {
										color: '#1DA1F2',
										backgroundColor: 'white',
										border: '1px solid #1DA1F2',
									},
								}}
								type='submit'
							>
								Save Updates
								{isBtnLoading && <CircularProgress size={25} />}
							</Button>
						</Box>
					</Form>
				</Formik>
			</Box>
		</Modal>
	)
}
ModalEdit.propTypes = {
	user: PropTypes.object.isRequired,
	setUser: PropTypes.func.isRequired,
}

export default ModalEdit
