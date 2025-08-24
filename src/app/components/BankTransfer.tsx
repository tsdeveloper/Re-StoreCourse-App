import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Alert, Box, Typography } from '@mui/material';

export default function BankTransfer() {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Alert severity="warning" icon={<WarningRoundedIcon />}>
				Your order will be processed once we receive the funds.
			</Alert>
			<Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
				Bank account
			</Typography>
			<Typography variant="body1" gutterBottom>
				Please transfer the payment to the bank account details shown below.
			</Typography>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Typography variant="body1" sx={{ color: 'text.secondary' }}>
					Bank:
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
					Mastercredit
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Typography variant="body1" sx={{ color: 'text.secondary' }}>
					Account number:
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
					123456789
				</Typography>
			</Box>
			<Box sx={{ display: 'flex', gap: 1 }}>
				<Typography variant="body1" sx={{ color: 'text.secondary' }}>
					Routing number:
				</Typography>
				<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
					987654321
				</Typography>
			</Box>
		</Box>
	);
}
