import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch('https://dummyjson.com/products');
        return await response.json();
    }
);

export const createProduct = createAsyncThunk(
    'products/createProduct',
    async (product) => {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product),
        });
        return await response.json();
    }
);

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ productId, title }) => {
        console.log('productId, title', productId, title)
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        return await response.json();
    }
);

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (productId) => {
        const response = await fetch(`https://dummyjson.com/products/${productId}`, {
            method: 'DELETE',
        });
        return await response.json();
    }
);

const initialState = {
    products: [],
    product: null,
    loading: false,
};

const slice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.products = [action.payload, ...state.products];
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const updatedProduct = action.payload;
                state.products = state.products.map(product =>
                    product.id === updatedProduct.id ? updatedProduct : product
                );
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.products = state.products.filter(product => product.id !== action.payload.id);
            })
    },
});

export const { reducer } = slice;
