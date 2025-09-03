import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';
import { Box, Typography } from '@mui/material';
import {
	CardCvcElement,
	CardExpiryElement,
	CardNumberElement,
} from '@stripe/react-stripe-js';
import type { StripeElementType } from '@stripe/stripe-js';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import AppTextInput from './AppTextInput.tsx';
import FormGridStyle from './FromGridStyle.tsx';
import PaymentContainer from './PaymentContainerStyle.tsx';

export default function CreditCard() {
	const { control, setValue } = useFormContext();
	const [cardState, setCardState] = useState<{
		elementError: { [key in StripeElementType]?: string };
	}>({ elementError: {} });
	const [cardComplete, setCardComplete] = useState<any>({
		cardNumber: false,
		cardExpiry: false,
		cardCvv: false,
		nameOnCard: false,
	});

	function onCardInputChange(event: any) {
		setCardState({
			...cardState,
			elementError: {
				[event.elementType]: event.error?.message,
			},
		});
		setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
	}

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
						<AppTextInput
							control={control}
							name={'cardNumber'}
							label={'Card number'}
							placeholder="0000 0000 0000 0000"
							size="small"
							inputComponent={CardNumberElement}
						/>
					</FormGridStyle>
					<FormGridStyle sx={{ width: '20%' }}>
						<AppTextInput
							name={'cardCvv'}
							control={control}
							label={'CVV'}
							placeholder={'123'}
							size={'small'}
							inputComponent={CardCvcElement}
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
					<FormGridStyle sx={{ flexGrow: 1 }}>
						<AppTextInput
							label={'Expiration date'}
							size={'small'}
							control={control}
							placeholder={'MM/YY'}
							name={'cardExpiry'}
							required={true}
							inputComponent={CardExpiryElement}
						/>
					</FormGridStyle>
				</Box>
			</PaymentContainer>
		</Box>
	);
}
