import { useEffect, useState } from 'react';

import { getOrders } from '../api/orders.api';
import type { OrderListItemDto } from '../api/dto/get-orders-response.dto.ts';

export type Filters = {
    orderId: string;
    status: string;
    place: string;
    user: string;
};

const DEFAULT_FILTERS: Filters = { orderId: '', status: '', place: '', user: '' };

export const useOrders = (initialPage = 0, initialLimit = 10) => {
    const [orders, setOrders] = useState<OrderListItemDto[]>([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(initialPage);
    const [rowsPerPage, setRowsPerPage] = useState(initialLimit);

    console.info(rowsPerPage);

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
    const [appliedFilters, setAppliedFilters] = useState<Filters>(DEFAULT_FILTERS);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const applyFilters = () => {
        setPage(0);
        setAppliedFilters(filters);
    };

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const newLimit = parseInt(event.target.value, 10);
        setRowsPerPage(newLimit);
        setPage(0);
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await getOrders({
                    page: page + 1,
                    limit: rowsPerPage,
                    orderId: appliedFilters.orderId || undefined,
                    status: appliedFilters.status || undefined,
                    place: appliedFilters.place || undefined,
                    user: appliedFilters.user || undefined,
                });

                setOrders(response.orders);
                setTotal(response.total);
            } catch (e: any) {
                console.error(e);
                setError(e?.message ?? 'Failed to load orders');
            } finally {
                setLoading(false);
            }
        };

        fetch();
    }, [page, rowsPerPage, appliedFilters]);

    return {
        orders,
        total,
        page,
        rowsPerPage,
        loading,
        error,
        filters,
        setFilters,
        appliedFilters,
        applyFilters,
        handleChangePage,
        handleChangeRowsPerPage,
    };
};
