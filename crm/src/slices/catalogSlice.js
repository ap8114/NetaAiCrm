import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/catalog";

// ✅ Create Catalog
export const createCatalog = createAsyncThunk(
    "catalog/create",
    async (catalogData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, catalogData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All Catalogs
export const fetchAllCatalogs = createAsyncThunk(
    "/catalog",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get Catalog by ID
export const fetchCatalogById = createAsyncThunk(
    "catalog/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update Catalog
export const updateCatalog = createAsyncThunk(
    "catalog/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete Catalog
export const deleteCatalog = createAsyncThunk(
    "catalog/delete",
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
const catalogSlice = createSlice({
    name: "catalog",
    initialState: {
        catalogs: [],
        catalog: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.catalogs.push(action.payload);
            })
            .addCase(createCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllCatalogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllCatalogs.fulfilled, (state, action) => {
                state.loading = false;
                state.catalogs = action.payload;
            })
            .addCase(fetchAllCatalogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchCatalogById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCatalogById.fulfilled, (state, action) => {
                state.loading = false;
                state.catalog = action.payload;
            })
            .addCase(fetchCatalogById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.catalogs = state.catalogs.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteCatalog.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCatalog.fulfilled, (state, action) => {
                state.loading = false;
                state.catalogs = state.catalogs.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteCatalog.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default catalogSlice.reducer;
