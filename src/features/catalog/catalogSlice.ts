import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from '@reduxjs/toolkit';
import agent from '../../app/api/agent';
import type {Product, ProductParams} from '../../app/models/product';
import type { RootState } from '../../app/store/configureStore';
import {MetaData} from "../../app/models/pagination.ts";

interface CatalogState {
	productsLoaded: boolean;
	filtersLoaded: boolean;
	status: string;
	brands: string[],
	types: string[],
	productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productsParams: ProductParams) {
	const params = new URLSearchParams();
	params.append('pageNumber', productsParams.pageNumber.toString())
	params.append('pageSize', productsParams.pageSize.toString())
    const parts = productsParams.orderBy.toString().match(/(Desc|Asc)/);
    params.append('orderBy', productsParams.orderBy.toString().replace("Desc", ""))
	params.append('direction', parts ? parts[0] : productsParams.direction.toString())
	if (productsParams.searchTerm) params.append('searchTerm', productsParams.searchTerm)
	if (productsParams.brands.length > 0) params.append('brands', productsParams.brands.toString())
	if (productsParams.types.length > 0) params.append('types', productsParams.types.toString())
	return params;
}

export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(
	'catalog/fetchProductsAsync',
	async (_, thunkAPI) => {
		const params = getAxiosParams(thunkAPI.getState().catalog.productParams);
		try {
			const response = await agent.Catalog.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData));
			return response.items;
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
        direction: 'asc',
        brands: [],
        types: [],
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
		productParams: initParams(),
        metaData: null,
	}),
	reducers: {
		setProductParams: (state, action ) => {
            state.productsLoaded = false;
			state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
		},
        setPageNumber: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload};
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
		resetProductParams: (state) => {
			state.productParams = initParams();
		}
	},
	extraReducers: (builder ) => {
		builder.addCase(fetchProductsAsync.pending, (state) => {
			state.status = 'pendingFetchProducts';
		});

		builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
			console.log('fetchProductsAsync');
			console.log(action)
            productsAdapter.setAll(state, action.payload);
			state.status = 'idle';
			state.productsLoaded = true;
		});

		builder.addCase(fetchProductsAsync.rejected, (state) => {
			state.status = 'idle';
		});

		builder.addCase(fetchProductAsync.pending, (state) => {
			state.status = 'pendingFetchProduct';
		});

		builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
			productsAdapter.upsertOne(state, action.payload);
			state.status = 'idle';
		});

		builder.addCase(fetchProductAsync.rejected, (state) => {
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

		builder.addCase(fetchFiltersAsync.rejected, (state) => {
			state.status = 'idle';
		});
	},
});

export const productSelectors = productsAdapter.getSelectors(
	(state: RootState) => state.catalog,
);

export const { setProductParams, resetProductParams, setMetaData, setPageNumber} = catalogSlice.actions;