import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('access_token');
const user = localStorage.getItem('user');

const initialState = {
    isAuthenticated: !!token,
    user: user ? JSON.parse(user) : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            Object.assign(state, action.payload);
        },
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;

            localStorage.setItem('access_token', action.payload.token);
            localStorage.setItem('user', JSON.stringify(action.payload.user));
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;

            localStorage.removeItem('access_token');
            localStorage.removeItem('user');
        },
        restoreSession: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
    },
});

export const { login, logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;