import { alpha, Chip } from '@mui/material';

const getStatusChipProps = (status: string, theme: any) => {
	switch (status) {
		case 'PaymentReceived':
			return (
				<Chip
					label={status}
					color="success"
					component="a"
					sx={{
						backgroundColor: alpha(theme.palette.success.main, 0.1),
						color: theme.palette.success.main,
						fontWeight: 'bold',
					}}
				/>
			);
		case 'PaymentFailed':
			return (
				<Chip
					label={status}
					color="error"
					component="a"
					sx={{
						backgroundColor: alpha(theme.palette.error.main, 0.1),
						color: theme.palette.error.main,
						fontWeight: 'bold',
					}}
				/>
			);
		default:
			return (
				<Chip
					label={status}
					color="warning"
					component="a"
					sx={{
						backgroundColor: alpha(theme.palette.warning.main, 0.1),
						color: theme.palette.warning.main,
						fontWeight: 'bold',
					}}
				/>
			);
	}
};

export default getStatusChipProps;
