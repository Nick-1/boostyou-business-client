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
} from '@mui/material';

import type { OrderListItemDto } from '../api/dto/get-orders-response.dto.ts';

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

const formatDateTime = (value: string) =>
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
}) => (
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
                <Typography color="error">Error: {error}</Typography>
            </Box>
        )}

        {!loading && !error && (
            <>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Customer</TableCell>
                                <TableCell align="right">Total</TableCell>
                                <TableCell>Currency</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Items count</TableCell>
                                <TableCell>Places</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => {
                                const itemsCount = order.items.length;
                                const places = order.items
                                    .map((item) => `${item.place.name} (${item.place.city})`)
                                    .join(', ');

                                return (
                                    <TableRow key={order.id} hover>
                                        <TableCell>{order.id}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell>{order.user?.login}</TableCell>
                                        <TableCell align="right">{order.totalPrice}</TableCell>
                                        <TableCell>{order.currency}</TableCell>
                                        <TableCell>{formatDateTime(order.createdAt)}</TableCell>
                                        <TableCell>{itemsCount}</TableCell>
                                        <TableCell>{places}</TableCell>
                                    </TableRow>
                                );
                            })}

                            {orders.length === 0 && (
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
