import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material/';
import { TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
import { Modal } from '@mui/material';
import { Backdrop } from '@mui/material';
import { Fade } from '@mui/material';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';


export default function TransitionTable(props) {
    const {store} = useContext(GlobalStoreContext);

    useEffect(() => {
    }, [store.currentlyEditingCell]);
      
    function getMaxTableWidth(alphabet) {
        if (alphabet.length < 10) {
            return 400 + alphabet.length*50;
        } else {
            return 1000;
        }
    }

    function getStatesFromTable(table) {
        let states = [];
        for (let state in table) {
            states.push(state);
        }
        return states;
    }

    function getAlphabetFromTable(table) {
        let randomState = Object.keys(table)[0];
        let alphabet = [];
        for (let parseCharacter in table[randomState]) {
            alphabet.push(parseCharacter);
        }
        return alphabet;
    }

    function getAlphabetRow(alphabet) {
        let row = [<TableCell key="states">States</TableCell>];
        if (alphabet === null || alphabet.length === 0) {
            return row;
        }

        for (let i = 0; i < alphabet.length; i++) {
            row.push(<TableCell key={alphabet[i]} align="center" sx={{minWidth: 50}}>{alphabet[i]}</TableCell>);
        }
        return row;
    }

    function getStateRows(table, states, alphabet, currentlyEditingCell) {
        let rows = [];
        for (let state of states) {
            let row = [<TableCell component="th">{state}</TableCell>];
            for (let parseCharacter of alphabet) {
                if (currentlyEditingCell !== null
                    && currentlyEditingCell.state  === state
                    && currentlyEditingCell.parseCharacter === parseCharacter) {
                    row.push(
                        <TextField
                        key={state + " " + parseCharacter}
                        sx={{maxWidth: 100}}
                        placeholder={currentlyEditingCell.state !== null ? currentlyEditingCell.state : "Input something"}
                        onKeyPress={(event) => {handleOnEnter(event)}}
                        />
                    );
                } else {
                    row.push(
                        <TableCell
                        key={state + " " + parseCharacter}
                        onDoubleClick={(event) => {handleTableCellDoubleClick(event, state, parseCharacter)}} 
                        align="center"
                        >
                            {"("
                            + (table[state][parseCharacter].write === null ? "_" : table[state][parseCharacter].write)
                            + ","
                            + (table[state][parseCharacter].action === null ? "_" : table[state][parseCharacter].action)
                            + ")"}
                        </TableCell>
                    );
                }
            }
            rows.push(
                <TableRow key={"stateRow " + state} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {row}
                </TableRow>
            );
        }
        return rows;
    }
    
    function handleResetTable(event) {
        event.stopPropagation();
        store.openResetTableModal();
    }

    function handleCloseResetTableModal(event) {
        store.closeResetTableModal();
    }

    function handleConfirmResetTableModal(event) {
        store.resetTransitionTable();
    }

    function getTable(table) {
        console.log("rerendering the table");
        let states = getStatesFromTable(table);
        let alphabet = getAlphabetFromTable(table);

        return (
            <div style={{display:"flex", "justifyContent": "center"}}>
            <TableContainer component={Paper} sx={{minWidth: 200, maxWidth: getMaxTableWidth(alphabet)}}>
                <Table sx={{maxWidth: getMaxTableWidth(alphabet)}} aria-label="simple table">

                    <TableHead key={Math.random()}>
                        <TableRow key={Math.random()}>
                            {getAlphabetRow(alphabet)}
                        </TableRow>
                    </TableHead>

                    <TableBody key={Math.random()}>
                        {getStateRows(table, states, alphabet, store.currentlyEditingCell)}
                    </TableBody>

                </Table>
            </TableContainer>
            </div>
        );
    }
    
    function handleTableCellDoubleClick(event, state, parseCharacter) {
        event.stopPropagation();
        let newCurrentlyEditingCell = {state, parseCharacter, action: {}};
        store.updateCurrentlyEditingCell(newCurrentlyEditingCell);
    }

    function handleOnEnter(event) {
        event.stopPropagation();
        if (event.key === "Enter") {
            let cellArray = event.target.value.split(",").map(item => item.trim());
            if (cellArray.length === 2) {
                let cellAction = {write: cellArray[0], action: cellArray[1]};
                let newTransitionTable = store.transitionTable;
                newTransitionTable[store.currentlyEditingCell.state][store.currentlyEditingCell.parseCharacter] = cellAction;
                store.updateTransitionTable(newTransitionTable);
            }
            store.updateCurrentlyEditingCell(null);
        }
    }

    function handleStartTM(event) {
        store.updateTransitionTable({});
    }

    return (
        <div style={{display:"block", "justifyContent":"center"}}>
        {getTable(store.transitionTable)}
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center" sx={{mt: "2em"}}>
            <Button variant="contained" color="success" disabled={Object.keys(store.transitionTable).length === -1} onClick={handleStartTM}>Let's go !</Button>
            <Button variant="contained" color="error" onClick={handleResetTable}>Reset Table</Button>
        </Stack>

        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={store.resetTableModalOpen}
            onClose={handleCloseResetTableModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
            timeout: 500,
            }}
        >
            <Fade in={store.resetTableModalOpen}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'white',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            }}>
                <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
                    Are you sure you want to reset the table?
                </Typography>

                <Stack direction="row" spacing={4} alignItems="center" justifyContent="center" sx={{minHeight: "3em", mt: "2em"}}>
                    <Button variant="contained" sx={{width: "6em"}}>Yes</Button>
                    <Button variant="contained" sx={{width: "6em"}}>Cancel</Button>
                </Stack>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}