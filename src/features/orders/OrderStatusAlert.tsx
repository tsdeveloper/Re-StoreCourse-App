import { Alert, AlertTitle } from '@mui/material';
import type { Order } from '../../app/models/order.ts';

interface Props {
	order: Order;
}

export default function OrderStatusAlert({ order }: Props) {
	let alertSeverity: 'success' | 'info' | 'warning' | 'error' = 'warning';
	const alertTitle = `${order.id} - ${order.orderStatus}`;
	let alertMessage = '';

	switch (order.orderStatus) {
		case 'PaymentReceived':
			alertSeverity = 'success';
			alertMessage = `Your payment has been received and your order is being processed.`;
			break;
		case 'PaymentFailed':
			alertSeverity = 'error';
			alertMessage = 'Your payment has failed. Please try again.';
			break;
		default:
			alertSeverity = 'warning';
			alertMessage = 'Your payment is pending. Please wait for confirmation.';
			break;
	}

	return (
		<Alert severity={alertSeverity}>
			<AlertTitle>
				{alertTitle} - {alertMessage}
			</AlertTitle>
		</Alert>
	);
}
