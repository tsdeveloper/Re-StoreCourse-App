import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useAppSelector } from '../store/configureStore.ts';
import { currencyFormat } from '../util/util.ts';

const products = [
	{
		name: 'Professional plan',
		desc: 'Monthly subscription',
		price: '$15.00',
	},
	{
		name: 'Dedicated support',
		desc: 'Included in the Professional plan',
		price: 'Free',
	},
	{
		name: 'Hardware',
		desc: 'Devices needed for development',
		price: '$69.99',
	},
	{
		name: 'Landing page template',
		desc: 'License',
		price: '$49.99',
	},
];

interface InfoProps {
	totalPrice: string;
}

export default function Info() {
	const { basket } = useAppSelector((state) => state.basket);
	const subTotal =
		basket?.basketItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		) ?? 0;

	const deliveryFee = subTotal > 100 ? 0 : 50;

	const total = subTotal + deliveryFee;

	return (
		<>
			<Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
				Total
			</Typography>
			<Typography variant="h4" gutterBottom>
				{currencyFormat(total)}
			</Typography>
			<List disablePadding>
				{basket &&
					basket.basketItems.length > 0 &&
					basket.basketItems.map((item) => (
						<ListItem key={item.productId} sx={{ py: 1, px: 0 }}>
							<ListItemText
								sx={{ mr: 2 }}
								primary={item.name}
								secondary={item.name}
							/>
							<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
								{currencyFormat(item.price)}
							</Typography>
						</ListItem>
					))}
			</List>
		</>
	);
}
