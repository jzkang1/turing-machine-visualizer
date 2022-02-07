import React, { useContext, useState, useEffect, useRef } from 'react';
import { GlobalStoreContext } from '../store/index.js'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { Icon, IconButton } from '@mui/material';
import { Box, Stack, TextField, Button} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

export default function Tape(props) {
    const { store } = useContext(GlobalStoreContext);

    // the entire tape array
    // may be dynamically expanded
    const [tape, setTape] = useState([]);

    // index of the tape pointer in the tape array
    const [tapePointer, setTapePointer] = useState(0);

    // string representing the current runtime state
    const [machineState, setMachineState] = useState(store.startingState);

    const [actionQueue, setActionQueue] = useState([]);

    // machine's runtime timeout object, used to stop and start the machine
    const [machineTimeout, setMachineTimeout] = useState(null);

    const tapeRef = useRef(null);

    function handleLoadInput(event) {
        setTape(event.target.value);
        console.log("yuh")
    }

    function getStartOrPauseButton() {
        if (store.tapeRuntimeObj === null || (store.tapeRuntimeObj !== null && store.tapeRuntimeObj.paused === true)) {
            return (
                <IconButton
                    edge="end"
                    aria-label=""
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClickStart}
                >
                    <PlayArrowIcon/>
                </IconButton>
            )
        } else {
            return (
                <IconButton
                    edge="end"
                    aria-label=""
                    aria-haspopup="true"
                    color="inherit"
                    onClick={handleClickPause}
                >
                    <PauseIcon/>
                </IconButton>
            )
        }
    }

    function handleClickStart(event) {
        event.stopPropagation();

        if (store.tapeRuntimeObj === null) {
            store.startMachine();
            let timeout = setTimeout(() => {
                let parsedCharacter = tape[tapePointer];
                let logicObj = store.transitionTable[machineState][parsedCharacter];

                if (logicObj.action === "←") {
                    moveLeft();
                } else if (logicObj.action === "→") {
                    moveRight();
                } else if (logicObj.action !== parsedCharacter) {
                    let newTape = tape;
                    // setTape(newTape);
                }
            }, 1000);

        } else if (store.tapeRuntimeObj !== null && store.tapeRuntimeObj.paused) {
            store.unpauseMachine();
        }
    }

    function handleClickPause(event) {
        if (store.tapeRuntimeObj !== null && !store.tapeRuntimeObj.paused) {
            store.pauseMachine();
        }
    }

    function handleClickStop(event) {

    }

    function moveLeft() {
        setTapePointer(tapePointer-1);
    }

    function moveRight() {
        setTapePointer(tapePointer-1);
    }

    useEffect(() => {
        const tape = tapeRef.current;
        const context = tape.getContext('2d');

        context.fillStyle = 'black';
        context.strokeStyle = '#000000';
        context.lineWidth = 4;
        context.font = "60px Arial black";

        // right side
        for (let i = window.innerWidth/2-50; i < window.innerWidth; i+= 100) {
            context.strokeRect(i, 0, 100, 100);
            context.fillText("0", i+30, 75);
        }

        // left side
        for (let i = window.innerWidth/2-150; i >= -100; i-=100) {
            context.strokeRect(i, 0, 100, 100);
            context.fillText("1", i+30, 75)
        }
    }, [tapePointer]);

    return (
        <div display="flex" align="center">
            <canvas width={window.innerWidth} height="100em" style={{marginTop: "10em"}} ref={tapeRef} {...props}/>
            <Icon>
                {<ChangeHistoryIcon/>}
            </Icon>
            
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
                    >
                        Load
                    </Button>
                </Stack>
            </Box>

            <Stack direction="row" >
                <IconButton>
                    <PlayArrowIcon/>
                </IconButton>

                <IconButton>
                    <PauseIcon/>
                </IconButton>

                <IconButton>
                    {getStartOrPauseButton()}
                </IconButton>

                <IconButton>
                    <StopIcon/>
                </IconButton>
            </Stack>
        </div>
    );
}