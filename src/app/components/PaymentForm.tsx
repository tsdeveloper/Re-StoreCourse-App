import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { type SetStateAction, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import BankTransfer from './BankTransfer.tsx';
import BankTransferRadio from './BankTransferRadio.tsx';
import CreditCard from './CreditCard.tsx';
import CreditCardRadio from './CreditCardRadio.tsx';

export default function PaymentForm() {
	const [paymentType, setPaymentType] = useState('creditCard');

	const handlePaymentTypeChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setPaymentType(event.target.value);
	};

	return (
		<Stack spacing={{ xs: 2, sm: 3 }} useFlexGap>
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
					<CreditCardRadio
						selected={paymentType === 'creditCard'}
						onClick={() => setPaymentType('creditCard')}
					/>

					<BankTransferRadio
						selected={paymentType === 'bankTransfer'}
						onClick={() => setPaymentType('bankTransfer')}
					/>
				</RadioGroup>
			</FormControl>
			{paymentType === 'creditCard' && <CreditCard />}
			{paymentType === 'bankTransfer' && <BankTransfer />}
		</Stack>
	);
}
