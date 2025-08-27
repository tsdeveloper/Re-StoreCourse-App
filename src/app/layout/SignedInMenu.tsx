import { Button, Fade, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router';
import { singOut } from '../../features/account/accountSlice.ts';
import { clearBasket } from '../../features/basket/basketSlice.ts';
import { useAppDispatch, useAppSelector } from '../store/configureStore.ts';

export default function SignedInMenu() {
	const dispatch = useAppDispatch();
	const { user } = useAppSelector((state) => state.account);
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<Button color="inherit" onClick={handleClick} sx={{ typography: 'h6' }}>
				{user?.email}
			</Button>
			<Menu
				slotProps={{
					list: {
						'aria-labelledby': 'fade-button',
					},
				}}
				slots={{ transition: Fade }}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem component={Link} to="/orders">
					My Orders
				</MenuItem>
				<MenuItem
					onClick={() => {
						dispatch(clearBasket());
						dispatch(singOut());
					}}
				>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}
