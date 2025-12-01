import { BrowserRouter, Outlet, Route, Routes } from 'react-router';
import { ThemeProvider } from '@mui/material';
import { UserProvider } from './context/user-context';

import Header from './layout/header';
import Footer from './layout/footer';

import HomePage from './pages/home';

import theme from './theme';
import { DemoUser } from './fake-data/user.ts';
import { CLIENT_ROUTE } from './common/routes.ts';

const { home } = CLIENT_ROUTE;

const Layout = () => (
    <>
        <ThemeProvider theme={theme}>
            <UserProvider initialUser={DemoUser}>
                <Header />
                <Outlet />
                <Footer />
            </UserProvider>
        </ThemeProvider>
    </>
);



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path={home} element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
