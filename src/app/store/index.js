import { configureStore } from '@reduxjs/toolkit';
import { reducer as productsReducer } from '../reducers';

const store = configureStore({
    reducer: {
        products: productsReducer,
    },
});

export default store;