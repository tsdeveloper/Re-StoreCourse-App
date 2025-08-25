import { an } from '@faker-js/faker/dist/airline-BUL6NtOJ';
import { OutlinedInput, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import type * as React from 'react';
import { type UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
	label: string;
	size: 'small';
	required?: boolean;
	placeholder: string;
	value?: string;
	format?: (event: any) => string;
}

export default function AppTextInput(props: Props) {
	const { fieldState, field } = useController({ ...props, defaultValue: '' });
	const { size, required, placeholder, format, value } = props;

	const handleChange = (event: any) => {
		const formattedValue = format ? format(event) : event.target.value;
		field.onChange(formattedValue);
	};

	return (
		<>
			<FormLabel>
				{props.label}
				{props.required ? '*' : ''}
			</FormLabel>
			<OutlinedInput
				{...field}
				size={size}
				error={!!fieldState.error}
				required={required}
				placeholder={placeholder}
				onChange={handleChange}
			/>
			{fieldState.error?.message && (
				<Typography
					variant="caption"
					color={fieldState.error ? 'error' : 'textSecondary'}
				>
					{fieldState.error?.message}
				</Typography>
			)}
		</>
	);
}
