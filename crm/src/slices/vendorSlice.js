import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/vendor";

// ✅ Create Vendor
export const createVendor = createAsyncThunk(
    "vendor/create",
    async (vendorData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, vendorData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All Vendors
export const fetchAllVendors = createAsyncThunk(
    "/vendor",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get Vendor by ID
export const fetchVendorById = createAsyncThunk(
    "vendor/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update Vendor
export const updateVendor = createAsyncThunk(
    "vendor/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete Vendor
export const deleteVendor = createAsyncThunk(
    "vendor/delete",
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
const vendorSlice = createSlice({
    name: "vendor",
    initialState: {
        vendors: [],
        vendor: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createVendor.fulfilled, (state, action) => {
                state.loading = false;
                state.vendors.push(action.payload);
            })
            .addCase(createVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllVendors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllVendors.fulfilled, (state, action) => {
                state.loading = false;
                state.vendors = action.payload;
            })
            .addCase(fetchAllVendors.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchVendorById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVendorById.fulfilled, (state, action) => {
                state.loading = false;
                state.vendor = action.payload;
            })
            .addCase(fetchVendorById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateVendor.fulfilled, (state, action) => {
                state.loading = false;
                state.vendors = state.vendors.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteVendor.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVendor.fulfilled, (state, action) => {
                state.loading = false;
                state.vendors = state.vendors.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteVendor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default vendorSlice.reducer;
