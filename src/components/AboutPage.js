import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
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
                </Link>{' '}
                {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function AboutPage() {

    const navigate = useNavigate();

    function handleGetStarted(event) {
        event.stopPropagation();
        navigate("/visualize");
    }

    function handleHome(event) {
      event.stopPropagation();
      navigate("/")
    }

  return (
    <ThemeProvider theme={theme}>
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
              What is a Turing Machine?
            </Typography>

            <Typography variant="h5" align="justify" color="text.secondary" paragraph>
              Imagine an infinite length of tape. The tape is then divided into infinite squares.
              Each square can either be 1, 0, or blank. Now imagine a box that runs along this tape,
              scanning each square. The box has predetermined instructions for each square or 'state' and as it scans each square,
              it will change it accordingly. Eventually the box will hopefully halt, leaving a new set of 1's, 0's, and blanks. This
              new set would then contain the answer to problem that was trying to be solved. 
            </Typography>
            <hr></hr>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              What's the big deal?
            </Typography>
            <Typography variant="h5" align="justify" color="text.secondary" paragraph>
            While this might be extremely simple, this "machine" would be capable of doing anything that
            a modern day computer can do. This is because
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={handleGetStarted}>Get Started</Button>
              <Button variant="contained" onClick={handleHome}>Go to the front page</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
        </Container>
      </main>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
      {/* End footer */}

    </ThemeProvider>
  );
}