import { FormLabel, OutlinedInput, Typography } from '@mui/material';
import type * as React from 'react';
import { type UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
	label: string;
	size: 'small';
	required?: boolean;
	placeholder: string;
}

export default function AppTextInput(props: Props) {
	const { fieldState, field } = useController({ ...props, defaultValue: '' });
	const { size, required, placeholder } = props;

	// const handleChange = (event: any) => {
	// 	const formattedValue = onChange ? onChange(event) : event.target.value;
	// 	field.onChange(formattedValue);
	// };

	return (
		<>
			<FormLabel>
				{props.label}
				{required ? '*' : ''}
			</FormLabel>
			<OutlinedInput
				{...field}
				size={size}
				error={!!fieldState.error}
				placeholder={placeholder}
				// onChange={handleChange}
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
