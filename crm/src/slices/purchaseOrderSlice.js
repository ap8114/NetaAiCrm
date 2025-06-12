import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";


export const purchaseOrder = createAsyncThunk(
    "/purchase-order",
    async (orderData, { rejectWithValue }) => {
        try {
            const res = await api.post("/purchase-order", orderData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);


const purchaseOrderSlice = createSlice({
    name: "purchaseOrder",
    initialState: {
        order: null,
        loading: false,
        error: null,
    },

    extraReducers: (builder) => {
        builder
            .addCase(purchaseOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(purchaseOrder.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(purchaseOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export default purchaseOrderSlice.reducer;
