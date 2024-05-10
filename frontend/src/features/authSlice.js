import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { db_url } from "./api";
import { jwtDecode } from "jwt-decode";

const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${db_url}/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      //store in localstorage
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.error("This is a bad error here:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (values, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${db_url}/login`, {
        email: values.email,
        password: values.password,
      });

      //store in localstorage
      localStorage.setItem("token", token.data);

      return token.data;
    } catch (error) {
      console.error("This is a bad error here:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser: (state, action) => {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        state.token = token;
        state.name = user.name;
        state.email = user.email;
        state._id = user._id;
        state.userLoaded = true;
      }
    },
    logoutUser: (state, action) => {
      localStorage.removeItem("token");
      return {
        ...state,
        token: localStorage.getItem("token"),
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },
  extraReducers: (builder) => {
    //Register user
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerStatus = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      console.log("Its a success");
      if (action.payload) {
        const user = jwtDecode(action.payload);
        state.token = action.payload;
        state.name = user.name;
        state.email = user.email;
        state._id = user._id;
        state.registerStatus = "success";
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerStatus = "rejected";
      state.registerError = action.payload;
    });

    //Login user
    builder.addCase(loginUser.pending, (state, action) => {
      state.loginStatus = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("Its a success");
      if (action.payload) {
        const user = jwtDecode(action.payload);
        state.token = action.payload;
        state.name = user.name;
        state.email = user.email;
        state._id = user._id;
        state.loginStatus = "success";
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loginStatus = "rejected";
      state.loginError = action.payload;
    });
  },
});

export default authSlice.reducer;
export const { loadUser, logoutUser } = authSlice.actions;
