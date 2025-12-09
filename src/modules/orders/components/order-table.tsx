import { useMemo, useState } from 'react';
import {
    Paper,
    Box,
    CircularProgress,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    TableSortLabel,
} from '@mui/material';
import type { OrderListItemDto } from '../api/dto/get-orders-response.dto.ts';
import {OrderIdChip} from './order-id-chip.tsx';

type Props = {
    orders: OrderListItemDto[];
    total: number;
    page: number;
    rowsPerPage: number;
    loading: boolean;
    error: string | null;
    onPageChange: (event: unknown, newPage: number) => void;
    onRowsPerPageChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => void;
};

type SortField = 'status' | 'user' | 'totalPrice' | 'createdAt';
type SortDirection = 'asc' | 'desc';

const getShortString = (id: string, showLetters: number = 4) => id.slice(0, showLetters) + '…';

const formatDateTime = (value: string | Date) =>
    new Date(value).toLocaleString('uk-UA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });

export const OrdersTable: React.FC<Props> = ({
     orders,
     total,
     page,
     rowsPerPage,
     loading,
     error,
     onPageChange,
     onRowsPerPageChange,
    }) => {
    const [sortField, setSortField] = useState<SortField>('createdAt');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

    const handleSortClick = (field: SortField) => {
        if (sortField === field) {
            setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const createSortHandler = (field: SortField) => () => handleSortClick(field);

    const sortedOrders = useMemo(() => {
        const copy = [...orders];

        copy.sort((a, b) => {
            let aValue: string | number | Date = '';
            let bValue: string | number | Date = '';

            switch (sortField) {
                case 'status':
                    aValue = a.status;
                    bValue = b.status;
                    break;
                case 'user':
                    aValue = a.user?.login ?? '';
                    bValue = b.user?.login ?? '';
                    break;
                case 'totalPrice':
                    aValue = a.totalPrice;
                    bValue = b.totalPrice;
                    break;
                case 'createdAt':
                default:
                    aValue = new Date(a.createdAt);
                    bValue = new Date(b.createdAt);
                    break;
            }

            let result: number;

            if (aValue instanceof Date && bValue instanceof Date) {
                result = aValue.getTime() - bValue.getTime();
            } else if (typeof aValue === 'number' && typeof bValue === 'number') {
                result = aValue - bValue;
            } else {
                result = String(aValue).localeCompare(String(bValue));
            }

            return sortDirection === 'asc' ? result : -result;
        });

        return copy;
    }, [orders, sortField, sortDirection]);

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {loading && (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        py: 4,
                    }}
                >
                    <CircularProgress />
                </Box>
            )}

            {error && !loading && (
                <Box sx={{ p: 2 }}>
                    <Typography color="error">Помилка: {error}</Typography>
                </Box>
            )}

            {!loading && !error && (
                <>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>

                                    {/* Status */}
                                    <TableCell
                                        sortDirection={sortField === 'status' ? sortDirection : false}
                                    >
                                        <TableSortLabel
                                            active={sortField === 'status'}
                                            direction={sortField === 'status' ? sortDirection : 'asc'}
                                            onClick={createSortHandler('status')}
                                        >
                                            Status
                                        </TableSortLabel>
                                    </TableCell>

                                    {/* User */}
                                    <TableCell
                                        sortDirection={sortField === 'user' ? sortDirection : false}
                                    >
                                        <TableSortLabel
                                            active={sortField === 'user'}
                                            direction={sortField === 'user' ? sortDirection : 'asc'}
                                            onClick={createSortHandler('user')}
                                        >
                                            Customer
                                        </TableSortLabel>
                                    </TableCell>

                                    {/* Total */}
                                    <TableCell
                                        align="right"
                                        sortDirection={
                                            sortField === 'totalPrice' ? sortDirection : false
                                        }
                                    >
                                        <TableSortLabel
                                            active={sortField === 'totalPrice'}
                                            direction={
                                                sortField === 'totalPrice' ? sortDirection : 'asc'
                                            }
                                            onClick={createSortHandler('totalPrice')}
                                        >
                                            Total
                                        </TableSortLabel>
                                    </TableCell>

                                    {/* Created At */}
                                    <TableCell
                                        sortDirection={sortField === 'createdAt' ? sortDirection : false}
                                    >
                                        <TableSortLabel
                                            active={sortField === 'createdAt'}
                                            direction={
                                                sortField === 'createdAt' ? sortDirection : 'desc'
                                            }
                                            onClick={createSortHandler('createdAt')}
                                        >
                                            Created At
                                        </TableSortLabel>
                                    </TableCell>

                                    <TableCell>Items count</TableCell>
                                    <TableCell>Places</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {sortedOrders.map((order) => {
                                    const itemsCount = order.items.length;
                                    const places = order.items
                                        .map((item) => getShortString(item.place.name, 20))
                                        .join(', ');

                                    return (
                                        <TableRow key={order.id} hover>
                                            <TableCell><OrderIdChip id={order.id} /></TableCell>
                                            <TableCell>{order.status}</TableCell>
                                            <TableCell>{order.user?.login}</TableCell>
                                            <TableCell align="right">
                                                {order.totalPrice}
                                            </TableCell>
                                            <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                                            <TableCell>{itemsCount}</TableCell>
                                            <TableCell>{places}</TableCell>
                                        </TableRow>
                                    );
                                })}

                                {sortedOrders.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={8} align="center">
                                            Немає ордерів
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={total}
                        page={page}
                        onPageChange={onPageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={onRowsPerPageChange}
                        rowsPerPageOptions={[5, 10, 25, 50]}
                    />
                </>
            )}
        </Paper>
    );
};
