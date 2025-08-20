import Grid from '@mui/material/Grid';
import type { Product } from '../../app/models/product';
import ProductCard from './ProductCard';
import {useAppSelector} from "../../app/store/configureStore.ts";
import ProductCardSkeleton from "./ProductCardSkeleton.tsx";

interface Props {
	products: Product[];
}

export default function ProductList({ products }: Props) {
	const {productsLoaded} = useAppSelector(state => state.catalog);
    return (
			<Grid container spacing={4}>
				{products.map((product) => (
					<Grid size={{ xs: 3, md: 4 }} key={product.id}>
                        {!productsLoaded ? (
                         <ProductCardSkeleton />
                        ) : (
						<ProductCard product={product} />
                        )}
					</Grid>
				))}
			</Grid>
	);
}
