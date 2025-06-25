import {lazy} from "react";
import {FORGOTT_PASSWORD, LK, LOGIN, MAIN, PAYMENT, REGISTER} from "./constans.js";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const WhereMoney = lazy(() => import("../../pages/LK/WhereMoney.jsx"));
const lk = lazy(() => import("../../pages/LK/LK.jsx"));
const Login = lazy(() => import("../../pages/Auth/Login/Login.jsx"));
const Register = lazy(() => import("../../pages/Auth/Register/Register.jsx"));
const ForgotPassword = lazy(() => import("../../pages/Auth/ForgotPassword/ForgotPassword.jsx"));



export const nonAuthorise = [
    {
        path: MAIN,
        Component: HomePage,
    },
    {
        path: PAYMENT,
        Component: WhereMoney,
    }
]

export const authorise = [
    {
        path: LK,
        Component: lk,
    },
]

export const authRoutes = [
    {
        path: LOGIN,
        Component: Login,
    },
    {
        path: REGISTER,
        Component: Register,
    },
    {
        path: FORGOTT_PASSWORD,
        Component: ForgotPassword,
    }
]