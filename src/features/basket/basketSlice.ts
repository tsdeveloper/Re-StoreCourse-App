import {createAsyncThunk, createSlice, isAnyOf} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import type { Basket } from '../../app/models/basket';
import {getCookie} from "../../app/util/util.ts";

interface BasketState {
	basket: Basket | null;
	status: string;
}

const initialState: BasketState = {
	basket: null,
	status: 'idle',
};

export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try {
            return await agent.Basket.get();
        } catch (error: any) {
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition:() =>  {
            if (!getCookie('buyerId')) return false;
        }
    }
)

export const addBasketItemAsync = createAsyncThunk<
	Basket,
	{ productId: number; quantity?: number }
>(
	'basket/addBasketItemAsync',
	async ({ productId, quantity = 1 }, thunkAPI) => {
		try {
			const response = await agent.Basket.addItem(productId, quantity);
			return response;
		} catch (error: any) {
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	},
);

export const removeBasketItemAsync = createAsyncThunk<
	void,
	{ productId: number; quantity: number }
>('basket/removeBasketItemAsync', async ({ productId, quantity }, thunkAPI) => {
	try {
		await agent.Basket.removeItem(productId, quantity);
	} catch (error: any) {
		console.error('Failed to remove item from basket:', error);
		return thunkAPI.rejectWithValue({ error: error.data });
	}
});

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload;
		},
		clearBasket: (state) => {
			state.basket = null;
		},
		removeItem: (state, action) => {
			const { productId, quantity } = action.payload;
			const itemIndex = state.basket?.basketItems.findIndex(
				(item) => item.productId === productId,
			);
			if (itemIndex === undefined || itemIndex === -1) return;
			state.basket!.basketItems[itemIndex].quantity -= quantity;
			if (state.basket!.basketItems[itemIndex].quantity === 0) {
				state.basket?.basketItems.splice(itemIndex, 1);
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addBasketItemAsync.pending, (state, action) => {
			state.status = 'pendingAddItem' + action.meta.arg.productId;
		});

		builder.addCase(removeBasketItemAsync.pending, (state, action) => {
			state.status = 'pendingRemoveItem' + action.meta.arg.productId;
		});

		builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
			const { productId, quantity } = action.meta.arg;
			const itemIndex = state.basket?.basketItems.findIndex(
				(item) => item.productId === productId,
			);
			if (itemIndex === undefined || itemIndex === -1) return;
			state.basket!.basketItems[itemIndex].quantity -= quantity;
			if (state.basket!.basketItems[itemIndex].quantity === 0) {
				state.basket?.basketItems.splice(itemIndex, 1);
			}
			state.status = 'idle';
		});

        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });

		builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
			state.basket = action.payload;
            state.status = 'idle';
		});

        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            state.status = 'idle';
        });
	},
});

export const { setBasket, clearBasket, removeItem } = basketSlice.actions;
