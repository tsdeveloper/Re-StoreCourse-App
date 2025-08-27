import {
	Avatar,
	alpha,
	Box,
	Button,
	Chip,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
	useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';
import agent from '../../app/api/agent.ts';
import LoadingComponent from '../../app/layout/LoadingComponent.tsx';
import type { Order } from '../../app/models/order.ts';
import { currencyFormat } from '../../app/util/util.ts';
import OrderDetailed from './OrderDetailed.tsx';

// biome-ignore lint/suspicious/noRedeclare: <explanation>
export default function Order() {
	const theme = useTheme();
	const [orders, setOrders] = useState<Order[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

	useEffect(() => {
		setLoading(true);
		agent.Orders.list()
			.then((orders) => setOrders(orders))
			.catch((error) => console.log(error))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <LoadingComponent message="Loading orders..." />;

	if (selectedOrderNumber > 0) {
		const selectedOrder = orders?.find((o) => o.id === selectedOrderNumber);

		if (selectedOrder)
			return (
				<OrderDetailed
					order={selectedOrder}
					setSelectedOrder={setSelectedOrderNumber}
				/>
			);
	}

	const getStatusChipProps = (status, theme) => {
		switch (status) {
			case 'PaymentReceived':
				return {
					label: status,
					color: 'success',
					component: 'a',
					sx: {
						backgroundColor: alpha(theme.palette.success.main, 0.1),
						color: theme.palette.success.main,
						fontWeight: 'bold',
					},
				};
			case 'PaymentFailed':
				return {
					label: status,
					color: 'success',
					component: 'a',
					sx: {
						backgroundColor: alpha(theme.palette.error.main, 0.1),
						color: theme.palette.error.main,
						fontWeight: 'bold',
					},
				};
			default:
				return {
					label: status,
					color: 'success',
					component: 'a',
					sx: {
						backgroundColor: alpha(theme.palette.warning.main, 0.1),
						color: theme.palette.warning.main,
						fontWeight: 'bold',
					},
				};
		}
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell sx={{ fontWeight: 'bold' }}>Order number</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }} align="right">
							Total
						</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }} align="right">
							Order Date
						</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }} align="right">
							Order Status
						</TableCell>
						<TableCell sx={{ fontWeight: 'bold' }} align="right">
							{' '}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orders?.map((order) => (
						<TableRow
							key={order.id}
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
								'&:hover': {
									backgroundColor: alpha(theme.palette.primary.main, 0.05),
								},
							}}
						>
							<TableCell component="th" scope="row">
								<Box sx={{ display: 'flex', alignItems: 'center' }}>
									<Avatar
										alt={order.id.toString()}
										src={order.id.toString()}
										sx={{ width: 40, height: 40, mr: 2 }}
									/>
									<Typography>#{order.id}</Typography>
								</Box>
							</TableCell>
							<TableCell component="th" scope="row">
								{currencyFormat(order.subTotal)}
							</TableCell>
							<TableCell align="right">{order.orderDate}</TableCell>
							<TableCell align="right">
								<Chip
									{...getStatusChipProps(order.orderStatus.toString(), theme)}
								/>
							</TableCell>
							<TableCell align="right">
								<Button onClick={() => setSelectedOrderNumber(order.id)}>
									View
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
