import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

const BASE_URL = "/projects";

// ✅ Create projects
export const createProjects = createAsyncThunk(
    "projects/create",
    async (projectsData, { rejectWithValue }) => {
        try {
            const res = await api.post(BASE_URL, projectsData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get All projects
export const fetchAllProjects = createAsyncThunk(
    "/projects",
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get(BASE_URL);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Get projects by ID
export const fetchProjectsById = createAsyncThunk(
    "projects/fetchById",
    async (id, { rejectWithValue }) => {
        try {
            const res = await api.get(`${BASE_URL}/${id}`);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Update projects
export const updateProjects = createAsyncThunk(
    "projects/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const res = await api.put(`${BASE_URL}/${id}`, data);
            return res.data.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// ✅ Delete projects
export const deleteProjects = createAsyncThunk(
    "projects/delete",
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
const projectsSlice = createSlice({
    name: "projects",
    initialState: {
        projects: [],
        projectsData: null,
        loading: false,
        error: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // Create
            .addCase(createProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects.push(action.payload);
            })
            .addCase(createProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get All
            .addCase(fetchAllProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchAllProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Get by ID
            .addCase(fetchProjectsById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectsById.fulfilled, (state, action) => {
                state.loading = false;
                state.projectsData = action.payload;
            })
            .addCase(fetchProjectsById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.map((c) =>
                    c._id === action.payload._id ? action.payload : c
                );
            })
            .addCase(updateProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = state.projects.filter((c) => c._id !== action.payload);
            })
            .addCase(deleteProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default projectsSlice.reducer;
