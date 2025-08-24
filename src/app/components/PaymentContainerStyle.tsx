import { styled } from '@mui/material';

const PaymentContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	width: '100%',
	height: 375,
	padding: theme.spacing(3),
	borderRadius: `calc(${theme.shape.borderRadius}px + 4px)`,
	border: '1px solid ',
	borderColor: (theme.vars || theme).palette.divider,
	background:
		'linear-gradient(to bottom right, hsla(220, 35%, 97%, 0.3) 25%, hsla(220, 20%, 88%, 0.3) 100%)',
	boxShadow: '0px 4px 8px hsla(210, 0%, 0%, 0.05)',
	[theme.breakpoints.up('xs')]: {
		height: 300,
	},
	[theme.breakpoints.up('sm')]: {
		height: 350,
	},
	...theme.applyStyles('dark', {
		background:
			'linear-gradient(to right bottom, hsla(220, 30%, 6%, 0.2) 25%, hsla(220, 20%, 25%, 0.2) 100%)',
		boxShadow: '0px 4px 8px hsl(220, 35%, 0%)',
	}),
}));

export default PaymentContainer;
