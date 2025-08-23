import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router';
import { useAppSelector } from '../../app/store/configureStore';
import BasketSummary from './BasketSummary';
import BasketTable from './BasketTable.tsx';

export function BasketPage() {
	const { basket } = useAppSelector((state) => state.basket);
	if (!basket) return <Typography variant="h3">Basket is empty</Typography>;
	if (basket.basketItems.length === 0)
		return <Typography variant="h3">Basket is empty</Typography>;
	return (
		<>
			<BasketTable items={basket.basketItems} />
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
