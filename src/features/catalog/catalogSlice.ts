import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import type {Product, ProductParams} from '../../app/models/product';
import type { RootState } from '../../app/store/configureStore';

interface CatalogState {
	productsLoaded: boolean;
	filtersLoaded: boolean;
	status: string;
	brands: string[],
	types: string[],
	productParams: ProductParams;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productsParams: ProductParams) {
	const params = new URLSearchParams();
	params.append('pageNumber', productsParams.pageNumber.toString())
	params.append('pageSize', productsParams.pageSize.toString())
	params.append('orderBy', productsParams.orderBy.toString())
	params.append('direction', productsParams.direction.toString())
    console.log(`URLSearchParams direction ${productsParams.direction.toString()}`);
	if (productsParams.searchTerm) params.append('searchTerm', productsParams.searchTerm)
	if (productsParams.brands) params.append('brands', productsParams.brands.toString())
	if (productsParams.types) params.append('types', productsParams.types.toString())
	return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
	'catalog/fetchProductsAsync',
	async (_, thunkAPI) => {


		console.log(thunkAPI.getState());
		const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
		try {
			const response = await agent.Catalog.list(params);
			return response;
		} catch (error: any) {
			console.error('Failed to fetch products:', error);
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	},
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
	'catalog/fetchProductAsync',
	async (productId, thunkAPI) => {
		try {
			const response = await agent.Catalog.details(productId);
			return response;
		} catch (error: any) {
			console.error('Failed to fetch products:', error);
			return thunkAPI.rejectWithValue({ error: error.data });
		}
	},
);

export const fetchFiltersAsync = createAsyncThunk(
	'catalog/fetchFilters',
	async (_, thunkAPI) => {
	try {
		return await agent.Catalog.fetchFilters();
	}
	catch (error: any) {
		return thunkAPI.rejectWithValue({ error: error.data });

	}
})

function initParams() {
	return {
		pageNumber: 1,
		pageSize: 6,
		orderBy: 'name',
        direction: 'asc'
	}
}

export const catalogSlice = createSlice({
	name: 'catalog',
	initialState: productsAdapter.getInitialState<CatalogState>({
		productsLoaded: false,
		filtersLoaded: false,
		status: 'idle',
		brands: [],
		types: [],
		productParams: initParams()
	}),
	reducers: {
		setProductParams: (state, action) => {
			console.log(action)
            state.productsLoaded = false;
			state.productParams = {...state.productParams, ...action.payload};
		},
		resetProductParams: (state) => {
			state.productParams = initParams();
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsAsync.pending, (state) => {
			state.status = 'pendingFetchProducts';
		});

		builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
			productsAdapter.setAll(state, action.payload);
			state.status = 'idle';
			state.productsLoaded = true;
		});

		builder.addCase(fetchProductsAsync.rejected, (state, action) => {
			console.log(action.payload);
			state.status = 'idle';
		});

		builder.addCase(fetchProductAsync.pending, (state) => {
			state.status = 'pendingFetchProduct';
		});

		builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
			productsAdapter.upsertOne(state, action.payload);
			state.status = 'idle';
		});

		builder.addCase(fetchProductAsync.rejected, (state, action) => {
			console.log(action);
			state.status = 'idle';
		});

		builder.addCase(fetchFiltersAsync.pending, (state) => {
			state.status = 'pendingFetchFilters';
		});

		builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
			state.brands = action.payload.brands;
			state.types = action.payload.types;
			state.filtersLoaded = true;
			state.status = 'idle';
		});

		builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
			console.log(action);
			state.status = 'idle';
		});
	},
});

export const productSelectors = productsAdapter.getSelectors(
	(state: RootState) => state.catalog,
);

export const { setProductParams, resetProductParams} = catalogSlice.actions;