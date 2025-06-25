import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsAuthenticated(state , action) {
            state.isAuthenticated = action.payload;
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            localStorage.setItem('access_token', action.payload.access_token);
            localStorage.setItem('refresh_token', action.payload.refresh_token);
        },
        logout: (state) => {
            state.isAuthenticated = false;

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        },
    },
});

export const { login, logout , setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;