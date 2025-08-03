import {useEffect} from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import {fetchFiltersAsync, fetchProductsAsync, productSelectors} from './catalogSlice';
import ProductList from './ProductList';
import Grid from "@mui/material/Grid";
import {FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField} from "@mui/material";
import {v4 as uuidv4 } from 'uuid';

const sortOptions = [
    { id: uuidv4(), value: 'name', label: 'Alphabetical'},
    { id: uuidv4(), value: 'priceDesc', label: 'Price - High to low'},
    { id: uuidv4(), value: 'name', label: 'Price - Low to high'},
];

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded} = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded]);


    console.log(sortOptions)

    if (status.includes('pending'))
        return <LoadingComponent message="Loading product..."/>;
    return (
        <Grid container spacing={4}>
            <Grid size={{ xs: 3}}>
                <Paper sx={{ mb: 2}}>
                    <TextField
                    label='Search products'
                    variant='outlined'
                    fullWidth
                    />
                </Paper>
                <Paper sx={{ mb: 2, p: 2}}>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup>
                            {sortOptions.map(({id, value, label}) => (
                                <FormControlLabel key={id} value={value} control={<Radio />} label={label} />
                                ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
            </Grid>
            <Grid size={{ xs: 9}}>
                <ProductList products={products}/>
            </Grid>
        </Grid>
    );
}
