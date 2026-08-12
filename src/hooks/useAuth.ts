
import {
    useDispatch,
    useSelector,
} from "react-redux";

import type {
    TypedUseSelectorHook,
} from "react-redux";

import type {
    RootState,
    AppDispatch,
} from "../store";

import {
    login,
    logout,
} from "../store/auth/authSlice";

import type {
    LoginRequest,
} from "../api/auth";

export const useAppDispatch =
    () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<
    RootState
> = useSelector;

function useAuth() {
    const dispatch = useAppDispatch();

    const auth = useAppSelector(
        (state) => state.auth
    );

    const handleLogin = async (
        data: LoginRequest
    ) => {
        return dispatch(login(data));
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return {
        ...auth,

        login: handleLogin,

        logout: handleLogout,

        isAuthenticated:
            Boolean(auth.token),
    };
}

export default useAuth;

