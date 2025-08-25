import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import * as React from 'react';
import CartStyle from './CardStyle.tsx';

interface Props {
	selected?: boolean;
	onClick?: () => void;
	paymentType?: string;
}

export default function BankTransferRadio({
	selected,
	onClick,
	paymentType,
}: Props) {
	return (
		<CartStyle selected={selected}>
			<CardActionArea
				onClick={onClick}
				sx={{
					'.MuiCardActionArea-focusHighlight': {
						backgroundColor: 'transparent',
					},
					'&:focus-visible': {
						backgroundColor: 'action.hover',
					},
				}}
			>
				<CardContent sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<AccountBalanceRoundedIcon
						fontSize="small"
						sx={[
							(theme) => ({
								color: 'grey.400',
								...theme.applyStyles('dark', {
									color: 'grey.600',
								}),
							}),
							paymentType === 'bankTransfer' && {
								color: 'primary.main',
							},
						]}
					/>
					<Typography sx={{ fontWeight: 'medium' }}>Bank account</Typography>
				</CardContent>
			</CardActionArea>
		</CartStyle>
	);
}
