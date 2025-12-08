import { Box, Typography } from '@mui/material';
import { useOrders } from '../hooks/use-orders.ts';
import { OrdersFilters } from '../components/orders-filters.tsx';
import { OrdersTable } from '../components/order-table.tsx';
import { MainPageContainer } from '../../../common/layout/main-page-container';

const OrdersPage = () => {
    const {
        orders,
        total,
        page,
        rowsPerPage,
        loading,
        error,
        filters,
        setFilters,
        applyFilters,
        handleChangePage,
        handleChangeRowsPerPage,
    } = useOrders(0, 3);

    return (
        <MainPageContainer>
            <Box sx={{ p: 2 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Orders
                </Typography>

                <OrdersFilters
                    filters={filters}
                    onChange={setFilters}
                    onApply={applyFilters}
                />

                <OrdersTable
                    orders={orders}
                    total={total}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    loading={loading}
                    error={error}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </MainPageContainer>
    );
};

export default OrdersPage;
