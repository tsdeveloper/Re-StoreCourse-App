import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppSelector } from '../store/configureStore.ts';
import { currencyFormat } from '../util/util.ts';

const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
	{ name: 'Card type:', detail: 'Visa' },
	{ name: 'Card holder:', detail: 'Mr. John Smith' },
	{ name: 'Card number:', detail: 'xxxx-xxxx-xxxx-1234' },
	{ name: 'Expiry date:', detail: '04/2024' },
];

export default function Review() {
	const { basket } = useAppSelector((state) => state.basket);
	const subTotal =
		basket?.basketItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		) ?? 0;

	const deliveryFee = subTotal > 100 ? 0 : 50;

	const total = subTotal + deliveryFee;

	return (
		<Stack spacing={2}>
			<List disablePadding>
				<ListItem sx={{ py: 1, px: 0 }}>
					{basket && (
						<ListItemText
							primary="Products"
							secondary={`${basket.basketItems.length} selected`}
						/>
					)}
					<Typography variant="body2">{currencyFormat(subTotal)}</Typography>
				</ListItem>
				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary="Shipping" secondary="Plus taxes" />
					<Typography variant="body2">{currencyFormat(deliveryFee)}</Typography>
				</ListItem>

				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						{currencyFormat(total)}
					</Typography>
				</ListItem>
			</List>
			<Divider />
			<Stack
				direction="column"
				divider={<Divider flexItem />}
				spacing={2}
				sx={{ my: 2 }}
			>
				<div>
					<Typography variant="subtitle2" gutterBottom>
						Shipment details
					</Typography>
					<Typography gutterBottom>John Smith</Typography>
					<Typography gutterBottom sx={{ color: 'text.secondary' }}>
						{addresses.join(', ')}
					</Typography>
				</div>
				<div>
					<Typography variant="subtitle2" gutterBottom>
						Payment details
					</Typography>
					<Grid container>
						{payments.map((payment) => (
							<React.Fragment key={payment.name}>
								<Stack
									direction="row"
									spacing={1}
									useFlexGap
									sx={{ width: '100%', mb: 1 }}
								>
									<Typography variant="body1" sx={{ color: 'text.secondary' }}>
										{payment.name}
									</Typography>
									<Typography variant="body2">{payment.detail}</Typography>
								</Stack>
							</React.Fragment>
						))}
					</Grid>
				</div>
			</Stack>
		</Stack>
	);
}
