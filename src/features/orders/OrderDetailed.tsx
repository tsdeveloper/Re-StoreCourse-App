import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import type { BasketItem } from '../../app/models/basket.ts';
import type { Order } from '../../app/models/order.ts';
import BasketSummary from '../basket/BasketSummary.tsx';
import BasketTable from '../basket/BasketTable.tsx';
import OrderStatusAlert from './OrderStatusAlert.tsx';

interface Props {
	order: Order;
	setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
	const subtotal =
		order?.orderItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		) ?? 0;

	return (
		<>
			{order && (
				<>
					<Box display={'flex'} justifyContent={'space-between'}>
						<Typography variant="h6" sx={{ flexGrow: 1, p: 2 }} gutterBottom>
							{<OrderStatusAlert order={order} />}
						</Typography>
						<Button
							onClick={() => setSelectedOrder(0)}
							sx={{ m: 2 }}
							size="small"
							variant="contained"
						>
							Back to Orders
						</Button>
					</Box>
					<BasketTable
						items={order.orderItems as BasketItem[]}
						isBasket={false}
					/>
					<Grid container>
						<Grid size={{ xs: 6 }} />
						<Grid size={{ xs: 6 }}>
							<BasketSummary subtotal={subtotal} />
						</Grid>
					</Grid>
				</>
			)}
		</>
	);
}
