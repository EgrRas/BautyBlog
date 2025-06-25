import React, {Suspense, useEffect, useState} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {FORGOTT_PASSWORD, LOGIN, MAIN, PAYMENT, REGISTER} from './constans.js';
import { nonAuthorise, authorise, authRoutes } from './routes.js';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuthenticated} from "../../features/Auth/model/selector.js";
import { logout, setIsAuthenticated} from "../../features/Auth/model/slice.js";
import {getUsersStyle} from "../../pages/Lk/api/lkAPI.js";

const AppRouter = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuthenticated);

    const [loading, setLoading] = useState(true);


    const specialRoutesSet = new Set([
        MAIN,
        PAYMENT,
        LOGIN,
        REGISTER,
        FORGOTT_PASSWORD,
    ]);

    useEffect(() => {
        if (specialRoutesSet.has(location.pathname)) {
            setLoading(false);
            return;
        }

        (async () => {
            try {
                await getUsersStyle();
                dispatch(setIsAuthenticated(true));
            } catch {
                dispatch(logout());
            } finally {
                setLoading(false)
            }
        })();
    }, []);

    const PrivateRoute = ({ isAuth, loading, children }) => {
        if (loading) return null;
        return isAuth ? children : <Navigate to={MAIN} replace />;
    };

    if (loading) return <>Загрузка…</>;

    return (
        <Suspense fallback={<>Загрузка…</>}>
            <Routes>
                {authorise.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <PrivateRoute isAuth={isAuth} loading={loading}>
                                <Component />
                            </PrivateRoute>
                        }
                    />
                ))}
                {nonAuthorise.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}

                <Route path="*" element={<Navigate to={MAIN} replace />} />
            </Routes>
        </Suspense>


    );
};

export default AppRouter;