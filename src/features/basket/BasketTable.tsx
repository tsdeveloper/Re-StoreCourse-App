import { Add, Delete, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
	Box,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import { Link } from 'react-router';
import type { BasketItem } from '../../app/models/basket.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../app/store/configureStore.ts';
import { currencyFormat } from '../../app/util/util.ts';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice.ts';

interface Props {
	items: BasketItem[];
	isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
	const { status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Product</TableCell>
						<TableCell align="right">Price</TableCell>
						<TableCell align="right">Quantity</TableCell>
						<TableCell align="right">Subtotal</TableCell>
						{isBasket && <TableCell align="right"></TableCell>}
					</TableRow>
				</TableHead>
				<TableBody>
					{items.map((item) => (
						<TableRow
							key={item.productId}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								<Box
									component={Link}
									to={`/catalog/${item.productId}`}
									display={'flex'}
									alignItems={'center'}
									sx={{ textDecoration: 'none' }}
								>
									<img
										src={item.pictureUrl}
										alt={item.name}
										style={{ height: 50, marginRight: 20 }}
									/>
									<span>{item.name}</span>
								</Box>
							</TableCell>
							<TableCell align="right" component="th" scope="row">
								{currencyFormat(item.price)}
							</TableCell>
							<TableCell align="right">
								{isBasket && (
									<LoadingButton
										loading={status.includes(
											'pendingRemoveItem' + item.productId,
										)}
										color="error"
										onClick={() =>
											dispatch(
												removeBasketItemAsync({
													productId: item.productId,
													quantity: 1,
												}),
											)
										}
									>
										<Remove />
									</LoadingButton>
								)}
								{item.quantity}
								{isBasket && (
									<LoadingButton
										color="secondary"
										loading={status === 'pendingAddItem' + item.productId}
										onClick={() =>
											dispatch(
												addBasketItemAsync({ productId: item.productId }),
											)
										}
									>
										<Add />
									</LoadingButton>
								)}
							</TableCell>
							<TableCell align="right">
								{currencyFormat(item.quantity * item.price)}
							</TableCell>
							{isBasket && (
								<TableCell align="right">
									<LoadingButton
										color="error"
										onClick={() =>
											dispatch(
												removeBasketItemAsync({
													productId: item.productId,
													quantity: item.quantity,
												}),
											)
										}
										loading={status === 'pendingRemoveItem' + item.productId}
									>
										<Delete />
									</LoadingButton>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
