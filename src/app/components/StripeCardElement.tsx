import { Box, Typography } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useRef } from 'react';
import {
	type Control,
	Controller,
	type FieldPath,
	type FieldValues,
} from 'react-hook-form';

interface StripeCardElementProps<T extends FieldValues> {
	name: FieldPath<T>;
	control: Control<T>;
	label?: string;
	options?: any;
	error?: boolean;
	helperText?: string;
}

export function StripeCardElement<T extends FieldValues>({
	name,
	control,
	label,
	options,
	error,
	helperText,
}: StripeCardElementProps<T>) {
	const stripe = useStripe();
	const elements = useElements();
	const cardElementRef = useRef<any>(null);

	const defaultOptions = {
		style: {
			base: {
				fontSize: '16px',
				color: '#424770',
				'::placeholder': {
					color: '#aab7c4',
				},
			},
			invalid: {
				color: '#9e2146',
			},
		},
		...options,
	};

	useEffect(() => {
		if (!stripe || !elements) return;

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) return;

		cardElementRef.current = cardElement;

		const handleChange = (event: any) => {};

		cardElement.on('change', handleChange);

		return () => {
			cardElement.off('change', handleChange);
		};
	}, [stripe, elements]);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => (
				<Box>
					{label && (
						<Typography variant="subtitle1" gutterBottom>
							{label}
						</Typography>
					)}
					<Box
						sx={{
							border: error ? '1px solid #d32f2f' : '1px solid #ccc',
							borderRadius: 1,
							p: 2,
							mt: 1,
							'& .StripeElement': {
								minHeight: '20px',
							},
						}}
					>
						<CardElement
							options={defaultOptions}
							onChange={(event) => {
								// Atualiza o valor do campo quando o Stripe detecta mudanças
								field.onChange({
									complete: event.complete,
									error: event.error,
									brand: event.brand,
								});
							}}
						/>
					</Box>
					{helperText && (
						<Typography
							variant="caption"
							color={error ? 'error' : 'textSecondary'}
							sx={{ mt: 0.5, display: 'block' }}
						>
							{helperText}
						</Typography>
					)}
				</Box>
			)}
		/>
	);
}
