import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { deepOrange } from "@mui/material/colors";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  console.log(product);

  return (
    <Card>
      <CardHeader
        avatar={
          // <Avatar
          // src={product.pictureUrl}>
          //   {product.name.charAt(0).toUpperCase()}
          // </Avatar>
          <Avatar sx={{ bgcolor: deepOrange[300]}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: "bold", color: "primary.main" },
          variant: "h5"
        }}
        subheader={
          <Typography variant="subtitle2">          
            {product.brand?.name}/{product.type?.name}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: "cover", bgcolor: 'primary.contrastText' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  );
}
