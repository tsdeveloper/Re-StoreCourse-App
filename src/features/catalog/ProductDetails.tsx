/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Product } from '../../app/models/product';
import Grid from '@mui/material/Grid';
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import NotFound from '../../app/errors/NotFound';
import { currencyFormat } from '../../app/util/util';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from '../basket/basketSlice';

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(0);

  const item = basket?.basketItems.find(
    (item) => item.productId === product?.id,
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.target.value) <= 0) return;
    setQuantity(parseInt(event.target.value));
  }

  function handleUpdateCart() {
    if (quantity <= 0) return;

    if (!item || quantity > item.quantity) {
      const updateQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product!.id!,
          quantity: updateQuantity,
        }),
      );
    } else {
      const updateQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          productId: product!.id!,
          quantity: updateQuantity,
        }),
      );
    }
  }

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, [id, item]);

  console.log(product);

  if (loading) return <LoadingComponent message="Loading product..." />;

  if (!product) return <NotFound />;
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 6 }}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: '100%' }}
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">
          {currencyFormat(product.price)}
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand?.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Qtd</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid size={{ xs: 6 }}>
            <LoadingButton
              loading={status.includes('pending' + item?.productId)}
              onClick={() => handleUpdateCart}
              sx={{ height: '55px' }}
              color="primary"
              variant="contained"
              fullWidth
              value={quantity}
            >
              {item ? 'Update Quantity' : 'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
