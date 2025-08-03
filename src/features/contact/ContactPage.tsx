import { Button, ButtonGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { decrementCounter, incrementCounter } from './coutnerSlice';

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  function handleIncrementCounter(amount: number) {
    // This function would dispatch an action to increment the counter
    dispatch(incrementCounter(amount));
  }

  function handleDecrementCounter() {
    // This function would dispatch an action to increment the counter
    dispatch(decrementCounter(1));
  }

  return (
    <>
      <Typography variant="h2">{title}</Typography>
      <Typography>{data}</Typography>
      <ButtonGroup>
        <Button
          variant="contained"
          color="error"
          onClick={handleDecrementCounter}
        >
          Decrement Counter
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleIncrementCounter(1)}
        >
          Increment Counter
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleIncrementCounter(5)}
        >
          Decrement Counter by 5
        </Button>
      </ButtonGroup>
    </>
  );
}
