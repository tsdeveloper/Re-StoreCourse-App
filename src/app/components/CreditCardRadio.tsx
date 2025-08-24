import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import { useState } from 'react';
import CartStyle from './CardStyle.tsx';

interface Props {
	selected?: boolean;
	onClick?: () => void;
	paymentType?: string;
}

export default function CreditCardRadio({
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
					<CreditCardRoundedIcon
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
					<Typography sx={{ fontWeight: 'medium' }}>Card</Typography>
				</CardContent>
			</CardActionArea>
		</CartStyle>
	);
}
