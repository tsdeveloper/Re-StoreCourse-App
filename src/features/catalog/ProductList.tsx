import { Product } from '../../app/models/product'
import ProductCard from './ProductCard'
import Grid from '@mui/material/Grid2'

interface Props {
  products: Product[]
}

export default function ProductList({ products }: Props) {
  return (
    <>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid size={{ xs: 3, md: 4 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
