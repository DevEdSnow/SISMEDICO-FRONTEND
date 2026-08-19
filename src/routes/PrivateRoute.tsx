import {
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";

function PrivateRoute() {
    const location = useLocation();

    const {
        isAuthenticated,
    } = useAppSelector(
        (state) => state.auth
    );

    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
                state={{
                    from: location,
                }}
            />
        );
    }

    return <Outlet />;
}

export default PrivateRoute;