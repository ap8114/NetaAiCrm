import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/contract-jobs";

// ✅ Create contract-jobs
export const createContractJob = createAsyncThunk(
    "contractJobs/create",
    async (contractJobsData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, contractJobsData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All contractJobs
export const fetchAllContractJobs = createAsyncThunk(
    "/contractJobs",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get contractJobs by ID
export const fetchContractJobById = createAsyncThunk(
    "contractJobs/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update contractJobs
export const updateContractJobs = createAsyncThunk(
    "contractJobs/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete contractJobs
export const deleteContractJobs = createAsyncThunk(
    "contractJobs/delete",
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
const contractJobSlice = createSlice({
    name: "contractJobs",
    initialState: {
        contractJobs: [],
        contractJobData: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createContractJob.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createContractJob.fulfilled, (state, action) => {
                state.loading = false;
                state.contractJobs.push(action.payload);
            })
            .addCase(createContractJob.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllContractJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllContractJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.contractJobs = action.payload;
            })
            .addCase(fetchAllContractJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchContractJobById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContractJobById.fulfilled, (state, action) => {
                state.loading = false;
                state.contractJobData = action.payload;
            })
            .addCase(fetchContractJobById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateContractJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateContractJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.contractJobs = state.contractJobs.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateContractJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteContractJobs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteContractJobs.fulfilled, (state, action) => {
                state.loading = false;
                state.contractJobs = state.contractJobs.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteContractJobs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default contractJobSlice.reducer;
