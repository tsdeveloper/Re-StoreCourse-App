import MuiCard from '@mui/material/esm/Card';
import { styled } from '@mui/material/esm/styles';

export default function CreditCard() {
	const Card = styled(MuiCard)<{ selected?: boolean }>(({ theme }) => ({
		border: '1px solid',
		borderColor: (theme.vars || theme).palette.divider,
		width: '100%',
		'&:hover': {
			background:
				'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)',
			borderColor: 'primary.light',
			boxShadow: '0px 2px 8px hsla(0, 0%, 0%, 0.1)',
			...theme.applyStyles('dark', {
				background:
					'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
				borderColor: 'primary.dark',
				boxShadow: '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
			}),
		},
		[theme.breakpoints.up('md')]: {
			flexGrow: 1,
			maxWidth: `calc(50% - ${theme.spacing(1)})`,
		},
		variants: [
			{
				props: ({ selected }) => selected,
				style: {
					borderColor: (theme.vars || theme).palette.primary.light,
					...theme.applyStyles('dark', {
						borderColor: (theme.vars || theme).palette.primary.dark,
					}),
				},
			},
		],
	}));

	return (
		<>
			<Card selected={paymentType === 'creditCard'}>
				<CardActionArea
					onClick={() => setPaymentType('creditCard')}
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
								paymentType === 'creditCard' && {
									color: 'primary.main',
								},
							]}
						/>
						<Typography sx={{ fontWeight: 'medium' }}>Card</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</>
	);
}
