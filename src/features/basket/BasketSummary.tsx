import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useStoreContext } from '../../app/context/StoreContext';
import { currencyFormat } from '../../app/util/util';

export default function BasketSummary({ subtotal }: Props) {
  const { basket } = useStoreContext();
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
