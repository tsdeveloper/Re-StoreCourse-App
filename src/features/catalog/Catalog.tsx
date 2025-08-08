import {useEffect} from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import {fetchFiltersAsync, fetchProductsAsync, productSelectors, setPageNumber, setProductParams} from './catalogSlice';
import ProductList from './ProductList';
import Grid from "@mui/material/Grid";
import {
    Paper
} from "@mui/material";
import ProductSearch from "./ProductSearch.tsx";
import RadioButtonGroup from "../../app/components/RadioButtonGroup.tsx";
import CheckboxButtons from "../../app/components/CheckboxButtons.tsx";
import AppPagination from "../../app/components/AppPagination.tsx";

const sortOptions = [
    {value: 'name', label: 'Alphabetical'},
    {value: 'priceDesc', label: 'Price - High to low'},
    {value: 'price', label: 'Price - Low to high'},
];

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        status,
        filtersLoaded,
        types,
        brands,
        productParams,
        metaData,
    } = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded]);

    if (!filtersLoaded)
        return <LoadingComponent message="Loading product..."/>;

    console.log(`products:`)
    console.log(products)
    return (
        <Grid container columnSpacing={4}>
            <Grid size={{xs: 3}}>
                <Paper sx={{mb: 2}}>
                    <ProductSearch/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        // onChange={(e) => dispatch(setProductParams({orderBy: e.value}))}
                        onChange={(options) => {
                            if (options)
                                dispatch(setProductParams({
                                    orderBy: options.value
                                }));
                        }
                        }
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons
                        items={brands}
                        checked={productParams.brands}
                        onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
                    />
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
                    />
                </Paper>
            </Grid>

            <Grid size={{xs: 9}}>
                <ProductList products={products}/>
            </Grid>

            <Grid size={{xs: 9}} sx={{mt: 3 }}>
                {metaData &&
                <AppPagination
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />
                }

            </Grid>
        </Grid>
    );
}
