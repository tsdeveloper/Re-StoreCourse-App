import {useEffect} from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import {fetchFiltersAsync, fetchProductsAsync, productSelectors} from './catalogSlice';
import ProductList from './ProductList';
import Grid from "@mui/material/Grid";
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    Pagination,
    Paper,
    Radio,
    RadioGroup,
    TextField, Typography
} from "@mui/material";
import {v4 as uuidv4} from 'uuid';

const sortOptions = [
    {id: uuidv4(), value: 'name', label: 'Alphabetical'},
    {id: uuidv4(), value: 'priceDesc', label: 'Price - High to low'},
    {id: uuidv4(), value: 'price', label: 'Price - Low to high'},
];

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {productsLoaded, status, filtersLoaded, types, brands} = useAppSelector((state) => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch]);

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFiltersAsync());

    }, [dispatch, filtersLoaded]);

    if (status.includes('pending'))
        return <LoadingComponent message="Loading product..."/>;
    return (
        <Grid container spacing={4}>
            <Grid size={{xs: 3}}>
                <Paper sx={{mb: 2}}>
                    <TextField
                        label='Search products'
                        variant='outlined'
                        fullWidth
                    />
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormControl>
                        <RadioGroup>
                            {sortOptions.map(({id, value, label}) => (
                                <FormControlLabel key={id} value={value} control={<Radio/>} label={label}/>
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <FormGroup>
                        {brands.map(brand => (
                            <FormControlLabel control={<Checkbox/>} label={brand} key={brand}/>
                        ))}
                    </FormGroup>
                </Paper>

                <Paper sx={{mb: 2, p: 2}}>
                    <FormGroup>
                        {types.map(type => (
                            <FormControlLabel control={<Checkbox/>} label={type} key={type}/>
                        ))}
                    </FormGroup>
                </Paper>
            </Grid>
            <Grid size={{xs: 9}}>
                <ProductList products={products}/>
            </Grid>
            <Grid size={{xs: 9}}>
                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                    <Typography>
                        Displaying 1-6 of 20 items
                    </Typography>
                    <Pagination
                        color={'secondary'}
                        size={'large'}
                        count={products.length}
                        page={2}

                    />
                </Box>
            </Grid>
        </Grid>
    );
}
