import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";

function AppRouter() {

    return (

        <Routes>

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/"
                element={<Navigate to="/login" />}
            />

        </Routes>

    );

}

export default AppRouter;