import Box from '@mui/material/Box'
import { PropTypes } from 'prop-types'
import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {closeResetModal, openResetModal} from '../../../redux/slices/modalResetSlice'
import {Form, Formik} from "formik";
import Modal from '@mui/material/Modal';
import CustomInput from "../../CustomInput/CustomInput";
import IconTwitter from '../../IconTwitter/IconTwitter'
import { createTheme } from '@mui/material/styles'
import {Button, ThemeProvider, } from "@mui/material";
import * as Yup from "yup";
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'



const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '47%',
	minHeight: '50vh',
	bgcolor: 'background.paper',
	border: '1px solid #000',
	boxShadow: 24,
	borderRadius: '7px',
	p: 4.5,
	'@media (min-width: 1800px)': {
		width: '40%',
	},
	'@media (max-width: 1380px)': {
		width: '55%',
	},
	'@media (max-width: 1280px)': {
		width: '60%',
	},
	'@media (max-width: 1180px)': {
		width: '70%',
	},
	'@media (max-width: 960px)': {
		width: '80%',
	},
	'@media (max-width: 780px)': {
		width: '90%',
	},
	'@media (max-width: 600px)': {
		width: '100%',
		minHeight: '100vh',
	},
}

const theme = createTheme({
	// custom theme
	typography: {
		h3: {
			fontSize: '2.5rem',
			fontWeight: 700,
		},
	},
})

const validationSchema = Yup.object({
	activationCode: Yup.string()
		.required('Activation code is required'),
	newPassword: Yup.string()
		.required('Password is required')
		.min(6, 'Password is too short'),
})

const initialValues = {
	activationCode: '',
	newPassword: ''
}

function ModalConfirm({setIsEmailSend}) {
	const dispatch = useDispatch()
	const [resetModal, setResetModal] = useState(true);
	const handleClose = () => {
		dispatch(closeResetModal())
	}
	const handleBackReset = () => {
		setIsEmailSend(0)
	};

	const navigate   = useNavigate();
	const onSubmit = async(values) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_SERVER_URL || ''}/api/v1/reset/confirm`,
				values
			);
			
			if (response.status === 200) {
				setTimeout(() => {
					// navigate('/signIn');
					handleClose();
				}, 1000);
			}
			console.log("send", values);

			resetForm();

			console.log("send", values);
		} catch (error) {
			ErrorMessage('Error:', error);
		}
	}



	return (
		<ThemeProvider theme={theme}>
			<Modal open={resetModal} onClose={handleClose}>
				<Box sx={style}>
					<Box
						sx={{
							position: "relative",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
							}}
						>
							<IconTwitter
								style={{
									margin: "0 auto",
								}}
							/>
							<Box
								sx={{
									margin: 1,
									fontWeight: 400,
									fontSize: "1rem",
									textAlign: "center",
								}}
							>
								We have sent you the code Check if you have received a
								confirmation code to your email. If you need to request a new
								code, return to the previous screen and select a verification
								method again.
							</Box>

							<Formik
								initialValues={initialValues}
								validationSchema={validationSchema}
								onSubmit={onSubmit}
							>
								{({ isValid, isSubmitting, dirty }) => (
									<Form
										style={{
											width: "100%",
										}}
									>
										<CustomInput
											name="activationCode"
											type="text"
											label="Activation Code"
											placeholder="Code "
											error="true"
										/>
										<CustomInput
											name="newPassword"
											type="text"
											label="New Password"
											placeholder="New Password "
											error="true"
										/>

										<Button
											type="submit"
											variant="contained"
											fullWidth
											margin="normal"
											sx={{
												marginBottom: "1.3rem",
												padding: "1.1rem 0",
												borderRadius: "2rem",
												fontSize: "1rem",
												fontWeight: 700,
												textTransform: "none",
												backgroundColor: "#1DA1F2",
											}}
											disabled={!(dirty && isValid) || isSubmitting}
										>
											Confirm
										</Button>

										<Button
											onClick={handleBackReset}
											variant="contained"
											fullWidth
											margin="normal"
											sx={{
												marginBottom: "1.3rem",
												padding: "1.1rem 0",
												borderRadius: "2rem",
												fontSize: "1rem",
												fontWeight: 700,
												textTransform: "none",
												backgroundColor: "#1DA1F2",
											}}
										>
											Back to
										</Button>
									</Form>
								)}
							</Formik>
						</Box>

						<Box
							sx={{
								display: "flex",
								width: "100%",
								fontWeight: "400",
								fontSize: "1rem",
							}}
						>
						</Box>
					</Box>
				</Box>
			</Modal>
		</ThemeProvider>
	);
}
ModalConfirm.propTypes = {
	setIsEmailSend: PropTypes.func.isRequired
}
export default ModalConfirm
