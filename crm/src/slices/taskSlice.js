import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/tasks";

// ✅ Create tasks
export const createTasks = createAsyncThunk(
    "tasks/create",
    async (taskData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, taskData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All tasks
export const fetchAllTasks = createAsyncThunk(
    "/tasks",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get tasks by ID
export const fetchTaskById = createAsyncThunk(
    "tasks/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update tasks
export const updateTasks = createAsyncThunk(
    "tasks/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete tasks
export const deleteTasks = createAsyncThunk(
    "tasks/delete",
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
const TaskSlice = createSlice({
    name: "tasks",
    initialState: {
        tasks: [],
        taskData: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(createTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchAllTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchTaskById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.loading = false;
                state.taskData = action.payload;
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default TaskSlice.reducer;
