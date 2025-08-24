import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AppTextInput from './AppTextInput.tsx';
import FormGridStyle from './FromGridStyle.tsx';
import PaymentContainer from './PaymentContainerStyle.tsx';

export default function CreditCard() {
	const [cvv, setCvv] = useState('');
	const [expirationDate, setExpirationDate] = useState('');
	const { control, setValue, getValues } = useFormContext();

	const handleCardNumberChange = (event) => {
		const value = event.target.value.replace(/\D/g, '');
		const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
		if (value.length <= 16) {
			setValue('nameOnCard', formattedValue); // Atualiza o valor no useForm
		}

		return getValues('nameOnCard');
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
					<FormGridStyle sx={{ flexGrow: 1 }}>
						<AppTextInput
							label={'Card number'}
							size={'small'}
							placeholder={'0000 0000 0000 0000'}
							name={'nameOnCard'}
							required={true}
							control={control}
							format={handleCardNumberChange}
						/>
						{/*<FormLabel htmlFor="card-number" required>*/}
						{/*	Card number*/}
						{/*</FormLabel>*/}
						{/*<OutlinedInput*/}
						{/*	id="card-number"*/}
						{/*	autoComplete="card-number"*/}
						{/*	placeholder="0000 0000 0000 0000"*/}
						{/*	required*/}
						{/*	size="small"*/}
						{/*	value={cardNumber}*/}
						{/*	onChange={handleCardNumberChange}*/}
						{/*/>*/}
					</FormGridStyle>
					<FormGridStyle sx={{ maxWidth: '20%' }}>
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
					</FormGridStyle>
				</Box>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<FormGridStyle sx={{ flexGrow: 1 }}>
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
					</FormGridStyle>
					<FormGridStyle sx={{ flexGrow: 1 }}>
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
					</FormGridStyle>
				</Box>
			</PaymentContainer>
			<FormControlLabel
				control={<Checkbox name="saveCard" />}
				label="Remember credit card details for next time"
			/>
		</Box>
	);
}
