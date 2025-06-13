import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/products";

// ✅ Create products
export const createProducts = createAsyncThunk(
    "products/create",
    async (productsData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, productsData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All products
export const fetchAllProducts = createAsyncThunk(
    "/products",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get products by ID
export const fetchProductsById = createAsyncThunk(
    "products/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update products
export const updateProducts = createAsyncThunk(
    "products/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete products
export const deleteProducts = createAsyncThunk(
    "products/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`${BASE_URL}/${id}`);
            return id;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// 🔽 Slice Definition
const ProductSlice = createSlice({
    name: "products",
    initialState: {
        products: [],
        productData: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            })
            .addCase(createProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(fetchAllProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchProductsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProductsById.fulfilled, (state, action) => {
                state.loading = false;
                state.productData = action.payload;
            })
            .addCase(fetchProductsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = state.products.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ProductSlice.reducer;
