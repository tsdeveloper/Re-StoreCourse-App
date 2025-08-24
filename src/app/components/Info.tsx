import {
	Divider,
	List,
	ListItem,
	ListItemText,
	Typography,
} from '@mui/material';
import * as React from 'react';
import { useAppSelector } from '../store/configureStore.ts';
import { currencyFormat } from '../util/util.ts';

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
						<>
							<ListItem key={item.productId} sx={{ py: 1, px: 0 }}>
								<ListItemText
									sx={{ mr: 2 }}
									primary={item.name}
									secondary={`${item.quantity} x quantity`}
								/>
								<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
									{currencyFormat(item.price * item.quantity)}
								</Typography>
							</ListItem>
							<Divider component="li" />
						</>
					))}
			</List>
		</>
	);
}
