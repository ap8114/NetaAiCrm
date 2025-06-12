import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";


// Register
export const registerUser = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/register", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

// Login
export const loginUser = createAsyncThunk(
    "user/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const res = await api.post("/login", credentials);
            console.log(res);

            const { accessToken } = res.data.data;
            // Save token
            localStorage.setItem("token", accessToken);

            return { accessToken };
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


// Add this after registerUser and loginUser
export const addUser = createAsyncThunk(
    "user/add",
    async (userData, { rejectWithValue }) => {
        try {
            const res = await api.post("/users", userData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder
            .addCase(addUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(addUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
