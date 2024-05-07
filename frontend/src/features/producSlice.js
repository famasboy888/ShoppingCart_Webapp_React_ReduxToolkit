// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   items: [],
//   status: null,
//   error: ''
// };

// export const productsFetch = createAsyncThunk(
//   "products/productsFetch",
//   async (id=null, {rejectWithValue}) => {
//     try {
//         const response = await axios.get("http://localhost:5000/products");
//         return response?.data;
//     } catch (error) {
//         return rejectWithValue(error.message);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(productsFetch.pending, (state, action) => {
//       //this is using immer library
//       state.status = "pending";
//     });
//     builder.addCase(productsFetch.fulfilled, (state, action) => {
//       //this is using immer library
//       state.status = "success";
//       state.items = action.payload;
//       state.error = ''
//     });
//     builder.addCase(productsFetch.rejected, (state, action) => {
//       //this is using immer library
//       state.status = "error";
//       state.items = [];
//       state.error = action.payload;
//     });
//   },
// });

// export default productSlice.reducer;
