import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/client";

// ✅ Create Client
export const createClient = createAsyncThunk(
    "client/create",
    async (clientData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, clientData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All Clients
export const fetchAllClients = createAsyncThunk(
    "/client",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(`/client`);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get Client by ID
export const fetchClientById = createAsyncThunk(
    "client/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update Client
export const updateClient = createAsyncThunk(
    "client/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete Client
export const deleteClient = createAsyncThunk(
    "client/delete",
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
const clientSlice = createSlice({
    name: "client",
    initialState: {
        clients: [],
        client: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients.push(action.payload);
            })
            .addCase(createClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllClients.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload;
            })
            .addCase(fetchAllClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchClientById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchClientById.fulfilled, (state, action) => {
                state.loading = false;
                state.client = action.payload;
            })
            .addCase(fetchClientById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = state.clients.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteClient.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = state.clients.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default clientSlice.reducer;
