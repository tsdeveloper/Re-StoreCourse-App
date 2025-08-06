import {useEffect} from 'react';
import LoadingComponent from '../../app/layout/LoadingComponent';
import {useAppDispatch, useAppSelector} from '../../app/store/configureStore';
import {fetchFiltersAsync, fetchProductsAsync, productSelectors, setProductParams} from './catalogSlice';
import ProductList from './ProductList';
import Grid from "@mui/material/Grid";
import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Pagination,
    Paper,
    Typography
} from "@mui/material";
import {v4 as uuidv4} from 'uuid';
import ProductSearch from "./ProductSearch.tsx";
import RadioButtonGroup from "../../app/components/RadioButtonGroup.tsx";

const sortOptions = [
    {value: 'name', nameOrderby: "name",  label: 'Alphabetical', direction: "asc"},
    {value: 'priceDesc', nameOrderby: "price", label: 'Price - High to low', direction: "desc"},
    {value: 'price', nameOrderby: "price", label: 'Price - Low to high', direction: "asc"},
];

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const {
        productsLoaded,
        status,
        filtersLoaded,
        types,
        brands,
        productParams
    } = useAppSelector((state) => state.catalog);
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
                    <ProductSearch/>
                </Paper>
                <Paper sx={{mb: 2, p: 2}}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={(selectOption) => {
                            if (selectOption)
                            dispatch(setProductParams({
                                orderBy: selectOption.nameOrderby,
                            direction: selectOption.direction}
                            ))}
                        }
                    />
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
