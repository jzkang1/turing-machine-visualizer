import React, { useContext, useCallback, useMemo } from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Icon } from '@mui/material';

export default function TransitionTable(props) {
    const {store} = useContext(GlobalStoreContext);

    function getMaxTableWidth(alphabet) {
        if (alphabet.length < 10) {
            return 400 + alphabet.length*50;
        } else {
            return 1000;
        }
    }

    function handleCellActionChange(event, state, parseCharacter) {
        store.setCellAction(state, parseCharacter, event.target.value);
    }
    
    function handleCellStateChange(event, state, parseCharacter) {
        store.setCellNewState(state, parseCharacter, event.target.value);
    }

    function handleStateClick(event, state) {
        event.stopPropagation();
        if (store.acceptingStates.includes(state)) {
            store.removeAcceptingState(state);
        } else {
            store.addAcceptingState(state);
        }
    }

    const getAlphabetRow = useCallback(() => {
        let row = [<TableCell key="states" sx={{maxWidth: 50}}>States</TableCell>];
        if (store.alphabet === null || store.alphabet.length === 0) {
            return row;
        }

        for (let i = 0; i < store.alphabet.length; i++) {
            row.push(<TableCell key={store.alphabet[i]} align="center" sx={{minWidth: 50}}>{store.alphabet[i]}</TableCell>);
        }
        return row;
    }, [store.alphabet]);

    const getStateRows = () => {
        let rows = [];
        for (let state of store.states) {
            let row = [];
            row.push(
                <TableCell
                    component="th"
                    sx={{color: store.acceptingStates.includes(state) ? "green" : ""}}
                    onClick={(event) => {handleStateClick(event, state)}}
                >
                    {state}
                </TableCell>
            );
            for (let parseCharacter of store.alphabet) {
                row.push(
                    <TableCell
                    key={state + " " + parseCharacter}
                    align="center"
                    >
                        <Stack direction="column">
                            {/* Action */}
                            <TextField
                            select
                            label="A"
                            sx={{minWidth: "4em", maxWidth: "5em", minHeight: "2em", maxHeight: "3em"}}
                            value={store.transitionTable[state][parseCharacter].action === null ? "" : store.transitionTable[state][parseCharacter].action}
                            onChange={(event) => {handleCellActionChange(event, state, parseCharacter)}}
                            >
                            {["←","→"].concat(store.alphabet).map((option) => (
                                <MenuItem key={state + " " + parseCharacter + " " + option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            </TextField>

                            {/* New State */}
                            <TextField
                            id="outlined-select-currency"
                            select
                            label="Q"
                            sx={{mt: "1em", minWidth: "4em", maxWidth: "5em", minHeight: "2em", maxHeight: "3em"}}
                            value={store.transitionTable[state][parseCharacter].newState === null ? "" : store.transitionTable[state][parseCharacter].newState}
                            onChange={(event) => {handleCellStateChange(event, state, parseCharacter)}}
                            >
                            {store.states.map((option) => (
                                <MenuItem key={state + " " + parseCharacter + " " + option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                            </TextField>

                        </Stack>
                    </TableCell>
                );
            }

            rows.push(
                <TableRow key={"stateRow " + state} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {row}
                </TableRow>
            );
        }
        return rows;
    };
    

    function handleResetTable(event) {
        event.stopPropagation();
        store.openResetTableModal();
    }

    function handleConfirmResetTableModal(event) {
        event.stopPropagation();
        store.resetTransitionTable();
    }

    function handleCloseResetTableModal(event) {
        store.closeResetTableModal();
    }
    

    const getTable = () => {
        console.log("got table");
        return (
            <div style={{display:"flex", "justifyContent": "center"}}>
            <TableContainer component={Paper} sx={{minWidth: 200, maxWidth: getMaxTableWidth(store.alphabet)}}>
                <Table sx={{maxWidth: getMaxTableWidth(store.alphabet)}} aria-label="simple table">
                    <TableHead >
                        <TableRow>
                            {getAlphabetRow()}
                        </TableRow>


                    </TableHead>

                    <TableBody>
                        {getStateRows()}
                    </TableBody>
                </Table>

                <Icon onClick={store.addRow} style={{cursor:"pointer"}}>
                    {<AddCircleOutlineIcon/>}
                </Icon>
                
            </TableContainer>
            <Icon onClick={store.addColumn} style={{cursor:"pointer"}}>
                {<AddCircleOutlineIcon/>}
            </Icon>
            </div>
        );
    };

    function handleStartTM(event) {
        store.updateTransitionTable({});
    }
    
    return (
        <div style={{display:"block", "justifyContent":"center"}}>
        {getTable()}
        
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
                    <Button variant="contained" sx={{width: "6em"}} onClick={handleConfirmResetTableModal}>Yes</Button>
                    <Button variant="contained" sx={{width: "6em"}} onClick={handleCloseResetTableModal}>Cancel</Button>
                </Stack>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}