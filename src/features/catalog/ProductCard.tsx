import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { Product } from '../../app/models/product';
import { deepOrange } from '@mui/material/colors';
import { Link } from 'react-router';
import agent from '../../app/api/agent';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useStoreContext } from '../../app/context/StoreContext';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);
  const { setBasket } = useStoreContext();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId, 1)
      .then((basket) => setBasket(basket))
      .then(() => console.log('Item added to basket'))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardHeader
        avatar={
          // <Avatar
          // src={product.pictureUrl}>
          //   {product.name.charAt(0).toUpperCase()}
          // </Avatar>
          <Avatar sx={{ bgcolor: deepOrange[300] }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' },
          variant: 'h5',
        }}
        subheader={
          <Typography variant="subtitle2">
            {product.brand?.name}/{product.type?.name}
          </Typography>
        }
      />
      <CardMedia
        sx={{
          height: 140,
          backgroundSize: 'cover',
          bgcolor: 'primary.contrastText',
        }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
        >
          Add to Cart
        </LoadingButton>
        <Button component={Link} to={`/catalog/${product.id}`} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
