import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { Box, Typography } from '@mui/material';
import { CardElement, useElements } from '@stripe/react-stripe-js';
import { forwardRef, useImperativeHandle } from 'react';
import { useFormContext } from 'react-hook-form';
import AppTextInput from './AppTextInput.tsx';
import FormGridStyle from './FromGridStyle.tsx';
import PaymentContainer from './PaymentContainerStyle.tsx';
import { StripeCardElement } from './StripeCardElement.tsx';

const CreditCard = forwardRef(function CreditCard(props, ref) {
	const { control } = useFormContext();
	const elements = useElements();

	useImperativeHandle(ref, () => ({
		getCardElement: () => {
			if (!elements) return null;
			return elements.getElement(CardElement);
		},
	}));

	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
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
						gap: 2,
					}}
				>
					<FormGridStyle sx={{ flexGrow: 1 }}>
						<StripeCardElement
							control={control}
							name={'cardNumber'}
							label={'Card number'}
						/>
					</FormGridStyle>
				</Box>
				<Box sx={{ display: 'flex', gap: 2 }}>
					<FormGridStyle sx={{ flexGrow: 1 }}>
						<AppTextInput
							label={'Name'}
							control={control}
							size={'small'}
							placeholder={'Example John Smith'}
							name={'nameOnCard'}
							required={true}
						/>
					</FormGridStyle>
				</Box>
			</PaymentContainer>
		</Box>
	);
});

export default CreditCard;
