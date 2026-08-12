
import { useMemo } from "react";

import axiosInstance from "../api/axios";

function useAxios() {
    const api = useMemo(() => {
        return axiosInstance;
    }, []);

    return api;
}

export default useAxios;

