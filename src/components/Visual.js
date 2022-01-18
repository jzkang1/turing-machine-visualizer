import React, { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Tape from './Tape.js'
import { Button } from '@mui/material';



export default function Visual(props) {
    const { store } = useContext(GlobalStoreContext);

    return (
        <React.Fragment>
            <Tape/>

            <Button variant="outlined">Outlined</Button>
            
            

            {/* <PauseButton/>
            <StopButton/>
            <SpeedSlider/> */}
        </React.Fragment>
    );
}