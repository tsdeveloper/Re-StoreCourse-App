import { Button, Container, Divider, Paper, Typography } from '@mui/material';
import { Link } from 'react-router';

export default function NotFound() {
	return (
		<Container component={Paper} sx={{ height: 400 }}>
			<Typography gutterBottom variant="h3">
				Oops - we can't find what you're looking for
			</Typography>
			<Divider />
			<Button fullWidth component={Link} to="/catalog">
				Go back to shop
			</Button>
		</Container>
	);
}
