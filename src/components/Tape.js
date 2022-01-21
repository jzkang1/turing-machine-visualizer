import React, { useContext, useState, useEffect, useRef } from 'react';
import { GlobalStoreContext } from '../store/index.js'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { Icon } from '@mui/material';

export default function Tape(props) {
    const { store } = useContext(GlobalStoreContext);

    const [tape, setTape] = useState([]);

    const [actionQueue, setActionQueue] = useState([]);

    const tapeRef = useRef(null);

    useEffect(() => {
        const tape = tapeRef.current;
        const context = tape.getContext('2d');

        context.fillStyle = 'black';
        context.strokeStyle = '#000000';
        context.lineWidth = 4;
        context.font = "60px Arial black";
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        // context.strokeRect(0, 0, context.canvas.width, context.canvas.height);

        // right side
        for (let i = window.innerWidth/2-50; i < window.innerWidth; i+= 100) {
            context.strokeRect(i, 0, 100, 100);
            context.fillText("0",i+30,75)
        }

        // left side
        for (let i = window.innerWidth/2-150; i >= -100; i-=100) {
            context.strokeRect(i, 0, 100, 100);
            context.fillText("1",i+30,75)
        }
    }, []);

    return (
        <div display="flex" align="center">
            <canvas width={window.innerWidth} height="100em" style={{marginTop: "10em"}} ref={tapeRef} {...props}/>
            <Icon>
                {<ChangeHistoryIcon/>}
            </Icon>
        </div>
    );
}