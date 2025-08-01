import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Basket} from '../../app/models/basket';
import agent from '../../app/api/agent';

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle',
};

export const addBasketItemAsync = createAsyncThunk<
    Basket,
    { productId: number; quantity?: number }
>('basket/addBasketItemAsync', async ({productId, quantity = 1}, thunkAPI) => {
    try {
        const response = await agent.Basket.addItem(productId, quantity);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue({error: error});
    }
});

export const removeBasketItemAsync = createAsyncThunk<
    void,
    { productId: number; quantity: number }
>('basket/removeBasketItemAsync', async ({productId, quantity}, thunkAPI) => {
    try {
        await agent.Basket.removeItem(productId, quantity);
    } catch (error) {
        console.error('Failed to remove item from basket:', error);
        return thunkAPI.rejectWithValue({error: error});
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
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.basketItems.findIndex(
                (item) => item.productId === productId,
            );
            if (itemIndex == undefined || itemIndex == -1) return;
            state.basket!.basketItems[itemIndex].quantity -= quantity;
            if (state.basket!.basketItems[itemIndex].quantity == 0) {
                state.basket?.basketItems.splice(itemIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });

        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            console.log(action);
            state.basket = action.payload;
            state.status = 'idle';
        });

        builder.addCase(addBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);

        });

        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId;
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
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

        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);

        });
    },
});

export const {setBasket, clearBasket, removeItem} = basketSlice.actions;
