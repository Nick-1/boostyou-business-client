import { Typography } from '@mui/material';

import { MainPageContainer } from '../../../common/layout/main-page-container';

import './style.scss';

const DashboardPage = () => {
    return (
        <MainPageContainer className="home-page-container">
            <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                Dashboard
            </Typography>
        </MainPageContainer>
    );
};

export default DashboardPage;
