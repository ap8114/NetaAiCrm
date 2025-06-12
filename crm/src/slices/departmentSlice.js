import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/departments";

// ✅ Create departments
export const createDepartments = createAsyncThunk(
    "departments/create",
    async (departmentData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, departmentData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All departments
export const fetchAllDepartments = createAsyncThunk(
    "/departments",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get Client by ID
export const fetchDepartmentsById = createAsyncThunk(
    "departments/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update departments
export const updateDepartments = createAsyncThunk(
    "departments/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete departments
export const deleteDepartments = createAsyncThunk(
    "departments/delete",
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
const departmentSlice = createSlice({
    name: "departments",
    initialState: {
        departments: [],
        departmentData: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments.push(action.payload);
            })
            .addCase(createDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = action.payload;
            })
            .addCase(fetchAllDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchDepartmentsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDepartmentsById.fulfilled, (state, action) => {
                state.loading = false;
                state.departmentData = action.payload;
            })
            .addCase(fetchDepartmentsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = state.departments.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteDepartments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteDepartments.fulfilled, (state, action) => {
                state.loading = false;
                state.departments = state.departments.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteDepartments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default departmentSlice.reducer;
