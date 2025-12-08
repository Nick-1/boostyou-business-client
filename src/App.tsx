import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';

import Header from './common/layout/header';
import Footer from './common/layout/footer';
import { ROUTE } from './common/routes.ts';

import theme from './theme';

import OrdersPage from './modules/orders/pages/orders-page.tsx';
import DashboardPage from './modules/dashboard/pages/dashboard-page.tsx';

const { home, admin } = ROUTE;

const Layout = () => (
    <>
        <ThemeProvider theme={theme}>
            <Header />
            <Outlet />
            <Footer />
        </ThemeProvider>
    </>
);

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={home} element={<DashboardPage />} />
                    <Route path={admin.orders} element={<OrdersPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
