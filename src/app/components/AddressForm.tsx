import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import AppCheckbox from './AppCheckbox.tsx';
import AppTextInput from './AppTextInput.tsx';

const FormGrid = styled(Grid)(() => ({
	display: 'flex',
	flexDirection: 'column',
}));

export default function AddressForm() {
	const { control } = useFormContext();

	return (
		<Grid container spacing={3}>
			<FormGrid size={{ xs: 12, md: 12 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'fullName'}
					label={'Full name'}
					required={true}
					placeholder={'Full name'}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 12 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'address1'}
					label={'Address line 1'}
					placeholder={'Address line 1'}
					required={true}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 12 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'address2'}
					label={'Address line 2'}
					required={false}
					placeholder={'Apartment, suite, unit, etc. (optional)'}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 6 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'city'}
					label={'City'}
					required={true}
					placeholder={'New York'}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 6 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'state'}
					label={'State'}
					required={true}
					placeholder={'NY'}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 6 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'zip'}
					label={'Zip / Postal code'}
					required={true}
					placeholder={'12345'}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 6 }}>
				<AppTextInput
					size={'small'}
					control={control}
					name={'country'}
					label={'Country'}
					required={true}
					placeholder={'United States'}
				/>
			</FormGrid>
			<FormGrid size={{ xs: 12 }}>
				<AppCheckbox
					size={'small'}
					name={'saveAddress'}
					label={'Use this address for payment details'}
					control={control}
				/>
			</FormGrid>
		</Grid>
	);
}
