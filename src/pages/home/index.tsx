import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router';

import { Button, Grid, Typography } from '@mui/material';

import { MainPageContainer } from '../../layout/main-page-container';
import { apiGet } from '../../api-client/api-client.ts';

import './style.scss';

const HomePage = () => {
    const [data, setData] = useState<string>('loading...');

    const images = useMemo(
        () => [
            '/home-page/cup-1.jpg',
            '/home-page/cup-2.jpg',
            '/home-page/cup-3.jpg',
            '/home-page/cup-4.jpg',
        ],
        []
    );

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000); // change slide every 3 seconds
        return () => clearInterval(interval);
    }, [images.length]);

    useEffect(() => {
        apiGet<{ login: string }>('/api/v1/users/8dcac25e-f652-49cb-a0ae-2029e9a7de13')
            .then((response) => {
                console.log(response);
                setData(response.login)
            });
    }, []);

    return (
        <MainPageContainer className="home-page-container">
            <Grid className="home-page-grid-wrapper" container spacing={2}>
                <Grid className="home-moto" size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <Typography
                        gutterBottom
                        variant="h3"
                        textAlign="center"
                    >
                        Everyone who drinks coffee will know about your business!
                    </Typography>

                    <div style={{ padding: 20 }}>
                        <h1>Test GET request</h1>
                        <p>Backend response: {data}</p>
                    </div>

                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        component={Link}
                        to={`/stickers/create`}
                    >
                        Boost!
                    </Button>
                </Grid>
                <Grid className="home-slider" size={{ xs: 12, sm: 12, md: 6, lg: 6 }}>
                    <div className="fade-slider">
                        {images.map((src, i) => (
                            <img
                                key={src}
                                src={src}
                                alt={`slide-${i + 1}`}
                                className={`slide ${i === index ? 'active' : ''}`}
                                draggable={false}
                            />)
                        )}
                    </div>
                </Grid>
            </Grid>
        </MainPageContainer>
    );
};

export default HomePage;
