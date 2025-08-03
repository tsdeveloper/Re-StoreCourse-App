import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
} from '@mui/material';
import { useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';

export default function BasketSummary() {
	const { basket } = useAppSelector((state) => state.basket);
	const subTotal =
		basket?.basketItems.reduce(
			(sum, item) => sum + item.price * item.quantity,
			0,
		) ?? 0;
	const deliveryFee = subTotal > 100 ? 0 : 50;

	return (
		<>
			<TableContainer component={Paper} variant={'outlined'}>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>Subtotal</TableCell>
							<TableCell align="right">{currencyFormat(subTotal)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Delivery fee*</TableCell>
							<TableCell align="right">{currencyFormat(deliveryFee)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell colSpan={2}>Total</TableCell>
							<TableCell align="right">
								{currencyFormat(subTotal + deliveryFee)}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>
								<span style={{ fontStyle: 'italic' }}>
									*Orders over $100 qualify for free delivery
								</span>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
