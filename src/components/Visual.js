import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Tape from './Tape.js'
import { Box, Button, TextField, Stack} from '@mui/material';



export default function Visual(props) {
    const { store } = useContext(GlobalStoreContext);



    return (
        <React.Fragment>
            <Tape/>
            {/* <PauseButton/>
            <StopButton/>
            <SpeedSlider/> */}
        </React.Fragment>
    );
}