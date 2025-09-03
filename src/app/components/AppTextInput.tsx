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
	// onChange?: (event: any) => void;
	// format?: (event: any) => string;
}

export default function AppTextInput(props: Props) {
	const { fieldState, field } = useController({ ...props, defaultValue: '' });
	const { size, required, placeholder, inputComponent } = props;

	const fieldName = props.name;

	const CustomInput = ({ inputRef, ...other }: any) => {
		const InputComponent = inputComponent;
		return (
			<InputComponent
				onReady={(element: any) => {
					inputRef(element);
				}}
				onChange={(event: any) => {
					if (event.complete) {
						field.onChange({ complete: true });
					} else if (event.empty || event.error) {
						field.onChange('');
					}
				}}
				{...other}
			/>
		);
	};
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
				inputComponent={CustomInput}
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
