
import {
    useMemo,
    useState,
} from "react";

interface UsePaginationOptions {
    initialPage?: number;
    initialRowsPerPage?: number;
}

function usePagination<T>(
    items: T[],
    options: UsePaginationOptions = {}
) {
    const {
        initialPage = 0,
        initialRowsPerPage = 10,
    } = options;

    const [page, setPage] =
        useState(initialPage);

    const [rowsPerPage, setRowsPerPage] =
        useState(initialRowsPerPage);

    const totalItems = items.length;

    const totalPages =
        Math.ceil(
            totalItems / rowsPerPage
        );

    const paginatedItems = useMemo(() => {
        const start =
            page * rowsPerPage;

        const end =
            start + rowsPerPage;

        return items.slice(start, end);
    }, [
        items,
        page,
        rowsPerPage,
    ]);

    const handleChangePage = (
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        newRowsPerPage: number
    ) => {
        setRowsPerPage(newRowsPerPage);
        setPage(0);
    };

    const nextPage = () => {
        if (page < totalPages - 1) {
            setPage((current) =>
                current + 1
            );
        }
    };

    const previousPage = () => {
        if (page > 0) {
            setPage((current) =>
                current - 1
            );
        }
    };

    const firstPage = () => {
        setPage(0);
    };

    const lastPage = () => {
        if (totalPages > 0) {
            setPage(totalPages - 1);
        }
    };

    const resetPagination = () => {
        setPage(0);
        setRowsPerPage(
            initialRowsPerPage
        );
    };

    return {
        page,

        rowsPerPage,

        totalItems,

        totalPages,

        paginatedItems,

        hasNextPage:
            page < totalPages - 1,

        hasPreviousPage:
            page > 0,

        handleChangePage,

        handleChangeRowsPerPage,

        nextPage,

        previousPage,

        firstPage,

        lastPage,

        resetPagination,
    };
}

export default usePagination;

