import { yupResolver } from '@hookform/resolvers/yup';
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import {
	Box,
	Button,
	Card,
	CardContent,
	Grid,
	Stack,
	Step,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { useState } from 'react';
import { type FieldValues, FormProvider, useForm } from 'react-hook-form';
import AddressForm from '../../app/components/AddressForm.tsx';
import { checkoutValidation } from '../../app/components/checkoutValidation.ts';
import Info from '../../app/components/Info';
import InfoMobile from '../../app/components/InfoMobile';
import PaymentForm from '../../app/components/PaymentForm.tsx';
import Review from '../../app/components/Review.tsx';
import SitemarkIcon from '../../app/components/SitemarkIcon';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step: number) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		default:
			throw new Error('Unknown step');
	}
}

export default function CheckoutPage() {
	const [activeStep, setActiveStep] = useState(0);
	const currentValidationSchema = checkoutValidation[activeStep];
	const methods = useForm({
		mode: 'onTouched',
		resolver: yupResolver(currentValidationSchema),
	});

	const handleNext = (data: FieldValues) => {
		if (activeStep === 1) {
			console.log(data);
		}
		setActiveStep(activeStep + 1);
	};
	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};
	return (
		<FormProvider {...methods}>
			<Grid
				container
				sx={{
					height: {
						xs: '100%',
						sm: 'calc(100dvh - var(--template-frame-height, 0px))',
					},
					mt: {
						xs: 4,
						sm: 0,
					},
				}}
			>
				<Grid
					size={{ xs: 12, sm: 5, lg: 4 }}
					sx={{
						display: { xs: 'none', md: 'flex' },
						flexDirection: 'column',
						borderRight: { sm: 'none', md: '1px solid' },
						borderColor: { sm: 'none', md: 'divider' },
						backgroundColor: 'background.default',
						alignItems: 'start',
						pt: 16,
						px: 10,
						gap: 4,
					}}
				>
					<SitemarkIcon />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexGrow: 1,
							width: '100%',
							maxWidth: 500,
						}}
					>
						<Info />
					</Box>
				</Grid>
				<Grid
					size={{ sm: 12, md: 7, lg: 8 }}
					sx={{
						display: 'flex',
						flexDirection: 'column',
						maxWidth: '100%',
						width: '100%',
						backgroundColor: { xs: 'transparent', sm: 'background.paper' },
						alignItems: 'start',
						pt: { xs: 0, sm: 16 },
						px: { xs: 2, sm: 10 },
						gap: { xs: 4, md: 8 },
					}}
				>
					<Box
						sx={{
							display: 'flex',
							justifyContent: { sm: 'space-between', md: 'flex-end' },
							alignItems: 'center',
							width: '100%',
							maxWidth: { sm: '100%', md: 600 },
						}}
					>
						<Box
							sx={{
								display: { xs: 'none', md: 'flex' },
								flexDirection: 'column',
								justifyContent: 'space-between',
								alignItems: 'flex-end',
								flexGrow: 1,
							}}
						>
							<Stepper
								id="desktop-stepper"
								activeStep={activeStep}
								sx={{ width: '100%', height: 40 }}
							>
								{steps.map((label) => (
									<Step
										sx={{ ':first-child': { pl: 0 }, ':last-child': { pr: 0 } }}
										key={label}
									>
										<StepLabel>{label}</StepLabel>
									</Step>
								))}
							</Stepper>
						</Box>
					</Box>
					<Card sx={{ display: { xs: 'flex', md: 'none' }, width: '100%' }}>
						<CardContent
							sx={{
								display: 'flex',
								width: '100%',
								alignItems: 'center',
								justifyContent: 'space-between',
							}}
						>
							<div>
								<Typography variant="subtitle2" gutterBottom>
									Selected products
								</Typography>
								<Typography variant="body1">
									{activeStep >= 2 ? '$144.97' : '$134.98'}
								</Typography>
							</div>
							<InfoMobile
								totalPrice={activeStep >= 2 ? '$144.97' : '$134.98'}
							/>
						</CardContent>
					</Card>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							flexGrow: 1,
							width: '100%',
							maxWidth: { sm: '100%', md: 600 },
							maxHeight: '720px',
							gap: { xs: 5, md: 'none' },
						}}
					>
						<Stepper
							id="mobile-stepper"
							activeStep={activeStep}
							alternativeLabel
							sx={{ display: { sm: 'flex', md: 'none' } }}
						>
							{steps.map((label) => (
								<Step
									sx={{
										':first-child': { pl: 0 },
										':last-child': { pr: 0 },
										'& .MuiStepConnector-root': { top: { xs: 6, sm: 12 } },
									}}
									key={label}
								>
									<StepLabel
										sx={{
											'.MuiStepLabel-labelContainer': { maxWidth: '70px' },
										}}
									>
										{label}
									</StepLabel>
								</Step>
							))}
						</Stepper>
						{activeStep === steps.length ? (
							<Stack spacing={2} useFlexGap>
								<Typography variant="h1">📦</Typography>
								<Typography variant="h5">Thank you for your order!</Typography>
								<Typography variant="body1" sx={{ color: 'text.secondary' }}>
									Your order number is
									<strong>&nbsp;#140396</strong>. We have emailed your order
									confirmation and will update you once its shipped.
								</Typography>
								<Button
									variant="contained"
									sx={{ alignSelf: 'start', width: { xs: '100%', sm: 'auto' } }}
								>
									Go to my orders
								</Button>
							</Stack>
						) : (
							<form onSubmit={methods.handleSubmit(handleNext)}>
								<Grid>
									{getStepContent(activeStep)}
									<Box
										sx={[
											{
												display: 'flex',
												flexDirection: { xs: 'column-reverse', sm: 'row' },
												alignItems: 'end',
												flexGrow: 1,
												gap: 1,
												pb: { xs: 12, sm: 0 },
												mt: { xs: 2, sm: 0 },
												mb: '60px',
											},
											activeStep !== 0
												? { justifyContent: 'space-between' }
												: { justifyContent: 'flex-end' },
										]}
									>
										{activeStep !== 0 && (
											<Button
												startIcon={<ChevronLeftRoundedIcon />}
												onClick={handleBack}
												variant="text"
												sx={{ display: { xs: 'none', sm: 'flex' } }}
											>
												Previous
											</Button>
										)}
										{activeStep !== 0 && (
											<Button
												startIcon={<ChevronLeftRoundedIcon />}
												onClick={handleBack}
												variant="outlined"
												fullWidth
												sx={{ display: { xs: 'flex', sm: 'none' } }}
											>
												Previous
											</Button>
										)}
										<Button
											disabled={!methods.formState.isValid}
											variant="contained"
											endIcon={<ChevronRightRoundedIcon />}
											type="submit"
											sx={{ width: { xs: '100%', sm: 'fit-content' } }}
										>
											{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
										</Button>
									</Box>
								</Grid>
							</form>
						)}
					</Box>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
