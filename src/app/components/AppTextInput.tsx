import { OutlinedInput, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';
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
