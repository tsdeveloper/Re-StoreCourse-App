import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { type SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const PaymentContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: '100%',
	height: 375,
	padding: theme.spacing(3),
	borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
	border: '1px solid ',
	borderColor: (theme.vars || theme).palette.divider,
	background:
		'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
	boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
	[theme.breakpoints.up('xs')]: {
		height: 300,
	},
	[theme.breakpoints.up('sm')]: {
		height: 350,
	},
	...theme.applyStyles('dark', {
		background:
			'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
		boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
	}),
}));

const FormGrid = styled('div')(() => ({
	display: 'flex',
	flexDirection: 'column',
}));

export default function PaymentForm() {
	const [paymentType, setPaymentType] = useState('creditCard');
	const [cardNumber, setCardNumber] = useState('');
	const [cvv, setCvv] = useState('');
	const [expirationDate, setExpirationDate] = useState('');
	const { control } = useFormContext();

	const handlePaymentTypeChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setPaymentType(event.target.value);
	};

	const handleCardNumberChange = (event: { target: { value: string } }) => {
		const value = event.target.value.replace(/\D/g, '');
		const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
		if (value.length <= 16) {
			setCardNumber(formattedValue);
		}
	};

	const handleCvvChange = (event: { target: { value: string } }) => {
		const value = event.target.value.replace(/\D/g, '');
		if (value.length <= 3) {
			setCvv(value);
		}
	};

	const handleExpirationDateChange = (event: { target: { value: string } }) => {
		const value = event.target.value.replace(/\D/g, '');
		const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
		if (value.length <= 4) {
			setExpirationDate(formattedValue);
		}
	};

	return (
		<Stack spacing={{ xs: 3, sm: 6 }} useFlexGap>
			<FormControl component="fieldset" fullWidth>
				<RadioGroup
					aria-label="Payment options"
					name="paymentType"
					value={paymentType}
					onChange={handlePaymentTypeChange}
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						gap: 2,
					}}
				>
					<Card selected={paymentType === 'bankTransfer'}>
						<CardActionArea
							onClick={() => setPaymentType('bankTransfer')}
							sx={{
								'.MuiCardActionArea-focusHighlight': {
									backgroundColor: 'transparent',
								},
								'&:focus-visible': {
									backgroundColor: 'action.hover',
								},
							}}
						>
							<CardContent
								sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
							>
								<AccountBalanceRoundedIcon
									fontSize="small"
									sx={[
										(theme) => ({
											color: 'grey.400',
											...theme.applyStyles('dark', {
												color: 'grey.600',
											}),
										}),
										paymentType === 'bankTransfer' && {
											color: 'primary.main',
										},
									]}
								/>
								<Typography sx={{ fontWeight: 'medium' }}>
									Bank account
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</RadioGroup>
			</FormControl>
			{paymentType === 'creditCard' && (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<PaymentContainer>
						<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
							<Typography variant="subtitle2">Credit card</Typography>
							<CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
						</Box>
						<SimCardRoundedIcon
							sx={{
								fontSize: { xs: 48, sm: 56 },
								transform: 'rotate(90deg)',
								color: 'text.secondary',
							}}
						/>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%',
								gap: 2,
							}}
						>
							<FormGrid sx={{ flexGrow: 1 }}>
								<FormLabel htmlFor="card-number" required>
									Card number
								</FormLabel>
								<OutlinedInput
									id="card-number"
									autoComplete="card-number"
									placeholder="0000 0000 0000 0000"
									required
									size="small"
									value={cardNumber}
									onChange={handleCardNumberChange}
								/>
							</FormGrid>
							<FormGrid sx={{ maxWidth: '20%' }}>
								<FormLabel htmlFor="cvv" required>
									CVV
								</FormLabel>
								<OutlinedInput
									id="cvv"
									autoComplete="CVV"
									placeholder="123"
									required
									size="small"
									value={cvv}
									onChange={handleCvvChange}
								/>
							</FormGrid>
						</Box>
						<Box sx={{ display: 'flex', gap: 2 }}>
							<FormGrid sx={{ flexGrow: 1 }}>
								<FormLabel htmlFor="card-name" required>
									Name
								</FormLabel>
								<OutlinedInput
									id="card-name"
									autoComplete="card-name"
									placeholder="John Smith"
									required
									size="small"
								/>
							</FormGrid>
							<FormGrid sx={{ flexGrow: 1 }}>
								<FormLabel htmlFor="card-expiration" required>
									Expiration date
								</FormLabel>
								<OutlinedInput
									id="card-expiration"
									autoComplete="card-expiration"
									placeholder="MM/YY"
									required
									size="small"
									value={expirationDate}
									onChange={handleExpirationDateChange}
								/>
							</FormGrid>
						</Box>
					</PaymentContainer>
					<FormControlLabel
						control={<Checkbox name="saveCard" />}
						label="Remember credit card details for next time"
					/>
				</Box>
			)}
			{paymentType === 'bankTransfer' && (
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
					<Alert severity="warning" icon={<WarningRoundedIcon />}>
						Your order will be processed once we receive the funds.
					</Alert>
					<Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
						Bank account
					</Typography>
					<Typography variant="body1" gutterBottom>
						Please transfer the payment to the bank account details shown below.
					</Typography>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Typography variant="body1" sx={{ color: 'text.secondary' }}>
							Bank:
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
							Mastercredit
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Typography variant="body1" sx={{ color: 'text.secondary' }}>
							Account number:
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
							123456789
						</Typography>
					</Box>
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Typography variant="body1" sx={{ color: 'text.secondary' }}>
							Routing number:
						</Typography>
						<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
							987654321
						</Typography>
					</Box>
				</Box>
			)}
		</Stack>
	);
}
