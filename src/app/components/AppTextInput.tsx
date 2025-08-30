import { OutlinedInput, Typography } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import type * as React from 'react';
import { type UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
	label: string;
	size: 'small';
	required?: boolean;
	placeholder: string;
	inputComponent?: any;
	onChange?: (event: any) => void;
	format?: (event: any) => string;
}

export default function AppTextInput(props: Props) {
	const { fieldState, field } = useController({ ...props, defaultValue: '' });
	const { size, required, placeholder, inputComponent, onChange, format } =
		props;

	const handleChange = (event: any) => {
		const formattedValue = onChange ? onChange(event) : event.target.value;
		field.onChange(formattedValue);
	};

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
				inputComponent={inputComponent}
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
