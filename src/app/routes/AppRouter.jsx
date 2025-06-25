import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MAIN } from './constans.js';
import { nonAuthorise, authorise, authRoutes } from './routes.js';

const AppRouter = () => {
    return (

            <Routes>
                {authorise.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {nonAuthorise.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}
                {authRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))}

                <Route path="*" element={<Navigate to={MAIN} replace />} />
            </Routes>

    );
};

export default AppRouter;