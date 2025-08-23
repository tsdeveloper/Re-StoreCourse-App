import { Checkbox, FormControlLabel } from '@mui/material';
import * as React from 'react';
import { type UseControllerProps, useController } from 'react-hook-form';

interface Props extends UseControllerProps {
	label: string;
	size: 'small';
}

export default function AppCheckbox(props: Props) {
	const { field } = useController({ ...props, defaultValue: false });
	const { size } = props;
	return (
		<FormControlLabel
			control={
				<Checkbox
					{...field}
					size={size}
					checked={field.value}
					color="secondary"
				/>
			}
			label="Use this address for payment details"
		/>
	);
}
