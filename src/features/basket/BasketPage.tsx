import { Add, Remove } from '@mui/icons-material';
import Delete from '@mui/icons-material/Delete';
import { LoadingButton } from '@mui/lab';
import {
    Box,
    Button, Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { currencyFormat } from '../../app/util/util';
import BasketSummary from './BasketSummary';
import { addBasketItemAsync, removeBasketItemAsync } from './basketSlice';

export function BasketPage() {
	const { basket, status } = useAppSelector((state) => state.basket);
	const dispatch = useAppDispatch();

	if (!basket) return <Typography variant="h3">Basket is empty</Typography>;
	return (
		<>
            <TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Product</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Quantity</TableCell>
							<TableCell align="right">Subtotal</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.basketItems.map((item) => (
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
									{item.quantity}
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
								</TableCell>
								<TableCell align="right">
									{currencyFormat(item.quantity * item.price)}
								</TableCell>
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
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<Grid container>
				<Grid size={{ xs: 6 }} />
				<Grid size={{ xs: 6 }}>
					<BasketSummary />
					<Button
						component={Link}
						to="/checkout"
						variant="contained"
						size="large"
						fullWidth
					>
						Checkout
					</Button>
				</Grid>
			</Grid>
		</>
	);
}
