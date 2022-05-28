import React, { useContext, useState, useEffect, useRef } from 'react';
import { GlobalStoreContext } from '../store/index.js'
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { Icon, IconButton } from '@mui/material';
import { Box, Stack, TextField, Button, Input} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';

export default function Tape(props) {
    const { store } = useContext(GlobalStoreContext);

    const inputFieldRef = useRef("");

    // the entire tape array
    // may be dynamically expanded
    const [tape, setTape] = useState("1234");

    // index of the tape pointer in the tape array
    const [tapePointer, setTapePointer] = useState(0);

    // string representing the current runtime state
    const [machineState, setMachineState] = useState(store.startingState);

    // machine's runtime timeout object, used to stop and start the machine
    const [machineTimeout, setMachineTimeout] = useState(null);

    const tapeRef = useRef(null);

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
            );
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
            );
        }
    }

    function handleLoadInput(event) {
        event.stopPropagation();
        setTape(inputFieldRef.current.value);
    }

    function handleClickStart(event) {
        event.stopPropagation();

        if (store.tapeRuntimeObj === null) {
            store.startMachine();
            let timeout = setTimeout(nextAction, 1000);

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
        event.stopPropagation();
        // TODO
    }

    function moveLeft() {
        setTapePointer(tapePointer-1);

        // TODO ANIMATE TAPE MOVING LEFT
    }

    function moveRight() {
        setTapePointer(tapePointer-1);

        // TODO ANIMATE TAPE MOVING RIGHT
    }

    function nextAction() {
        let parsedCharacter = tape[tapePointer];
        let logicObj = store.transitionTable[machineState][parsedCharacter];

        if (logicObj.action === "←") {
            moveLeft();
        } else if (logicObj.action === "→") {
            moveRight();
        } else if (logicObj.action !== parsedCharacter) {
            let newTape = tape;
            newTape[tapePointer] = logicObj.action;
            // setTape(newTape);
        }
    }

    useEffect(() => {
        const tape = tapeRef.current;
        const context = tape.getContext('2d');

        context.fillStyle = 'black';
        context.strokeStyle = '#000000';
        context.lineWidth = 4;
        context.font = "60px Arial black";

        console.log(tape);

        // right side
        for (let i = window.innerWidth/2-50, j = 0; i < window.innerWidth; i+= 100, j++) {
            context.strokeRect(i, 0, 100, 100);
            let fillVar = " ";
            if (j < tape.length) {
                fillVar = tape[j];
            }
            context.fillText(fillVar, i+30, 75);
        }

        // left side
        for (let i = window.innerWidth/2-150; i >= -100; i-=100) {
            context.strokeRect(i, 0, 100, 100);
            context.fillText(" ", i+30, 75)
        }
    }, [tapePointer, tape]);

    return (
        <div display="flex" align="center">
            <canvas width={window.innerWidth} height="100em" style={{marginTop: "10em"}} ref={tapeRef} {...props}/>
            <Icon>
                {<ChangeHistoryIcon/>}
            </Icon>
            
            <Box component="form" noValidate sx={{maxWidth: "20em", maxHeight: "20em"}}>
                <Stack direction="row">
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="input"
                        label="Tape Input"
                        name="input"
                        autoFocus
                        inputRef={inputFieldRef}
                    />

                    <Button
                        variant="contained"
                        onClick={handleLoadInput}
                    >
                        Load
                    </Button>
                </Stack>
            </Box>

            <Input></Input>

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