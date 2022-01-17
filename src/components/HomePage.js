import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Turing Machine Visualizer
            </Link>
            {" "}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function HomePage() {

    const navigate = useNavigate();

    function handleGetStarted(event) {
        event.stopPropagation();
        navigate("/visualize");
    }

    function handleAbout(event) {
      event.stopPropagation();
      navigate("/about")
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
            {/* Hero unit */}
            <Box
                sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
                }}
            >
                <Container maxWidth="sm">

                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Turing Machine Visualizer
                </Typography>

                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                    Filler
                </Typography>
                <Stack
                    sx={{ pt: 4 }}
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                >
                    <Button variant="contained" onClick={handleGetStarted}>Get Started</Button>
                    <Button variant="contained" onClick={handleAbout}>What is a Turing Machine?</Button>
                </Stack>
                </Container>
            </Box>
            <Container sx={{ py: 8 }} maxWidth="md">
                {/* End hero unit */}
            </Container>
            </main>

            <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer"><Copyright /></Box>

        </ThemeProvider>
    );
}