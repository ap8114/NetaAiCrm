import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/services";

// ✅ Create services
export const createServices = createAsyncThunk(
    "services/create",
    async (servicesData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, servicesData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All services
export const fetchAllServices = createAsyncThunk(
    "/services",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get services by ID
export const fetchServicesById = createAsyncThunk(
    "services/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update services
export const updateServices = createAsyncThunk(
    "services/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete services
export const deleteServices = createAsyncThunk(
    "services/delete",
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
const ServiceSlice = createSlice({
    name: "services",
    initialState: {
        services: [],
        serviceData: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services.push(action.payload);
            })
            .addCase(createServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = action.payload;
            })
            .addCase(fetchAllServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchServicesById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchServicesById.fulfilled, (state, action) => {
                state.loading = false;
                state.serviceData = action.payload;
            })
            .addCase(fetchServicesById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = state.services.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteServices.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteServices.fulfilled, (state, action) => {
                state.loading = false;
                state.services = state.services.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default ServiceSlice.reducer;
