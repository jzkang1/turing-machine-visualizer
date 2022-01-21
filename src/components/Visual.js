import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Tape from './Tape.js'
import { Box, Button, TextField, Stack} from '@mui/material';



export default function Visual(props) {
    const { store } = useContext(GlobalStoreContext);

    function handleLoadInput () {

    }

    return (
        <React.Fragment>
            <Tape/>
            <Box component="form" noValidate onSubmit={handleLoadInput} sx={{maxWidth: "20em", maxHeight: "20em"}}>
                <Stack direction="row">
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="input"
                    label="Tape Input"
                    name="input"
                    autoFocus
                />
                <Button
                    variant="contained"
                >Load</Button>
                </Stack>
            </Box>
            
            
            {/* <PauseButton/>
            <StopButton/>
            <SpeedSlider/> */}
        </React.Fragment>
    );
}