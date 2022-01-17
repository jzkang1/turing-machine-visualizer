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
import MenuItem from '@mui/material/MenuItem';
import { getStatesFromTable, getAlphabetFromTable } from '../utils';


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
        let newTransitionTable = store.transitionTable;
        newTransitionTable[state][parseCharacter].action = event.target.value;
        store.updateTransitionTable(newTransitionTable);
    }
    
    function handleCellStateChange(event, state, parseCharacter) {
        let newTransitionTable = store.transitionTable;
        newTransitionTable[state][parseCharacter].newState = event.target.value;
        store.updateTransitionTable(newTransitionTable);
    }

    function getAlphabetRow(alphabet) {
        let row = [<TableCell key="states" sx={{maxWidth: 50}}>States</TableCell>];
        if (alphabet === null || alphabet.length === 0) {
            return row;
        }

        for (let i = 0; i < alphabet.length; i++) {
            row.push(<TableCell key={alphabet[i]} align="center" sx={{minWidth: 50}}>{alphabet[i]}</TableCell>);
        }
        return row;
    }

    function getStateRows(states, alphabet) {
        let rows = [];
        for (let state of states) {
            let row = [<TableCell component="th">{state}</TableCell>];
            for (let parseCharacter of alphabet) {
                row.push(
                    <TableCell
                    key={state + " " + parseCharacter}
                    align="center"
                    >
                        <Stack direction="column">

                            {/* Action */}
                            <TextField
                            select
                            label="Action"
                            sx={{minWidth: "6em"}}
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
                            label="New State"
                            sx={{mt: "1em"}}
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
    }
    
    function addRow(table, states, alphabet) {
        let latestStateNum = states[states.length-1].slice(1);
        let newState = "q" + (parseInt(latestStateNum) + 1).toString();
        states.push(newState)
        let newTransitionTable = table;
        newTransitionTable[newState] = {};
        for (let character of alphabet){
            newTransitionTable[newState][character] = {action: null, newState: null}
        }
        store.updateTransitionTable(newTransitionTable, states, alphabet);
    }

    function addColumn(table, states, alphabet){
        let latestCharacter = parseInt(alphabet[alphabet.length-1]);
        let newCharacter = (latestCharacter + 1).toString();
        alphabet.push(newCharacter);
        let newTransitionTable = table;
        for(let state of states){
            newTransitionTable[state][newCharacter] = {action: null, newState: null}
        }
        store.updateTransitionTable(newTransitionTable, states, alphabet);
    }

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

    function getTable(table) {
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
                        <TableRow key={Math.random()}>
                        <Button onClick={(event) => {addColumn(table, states, alphabet)}}>Add New Column</Button>
                        </TableRow>
                    </TableHead>

                    <TableBody key={Math.random()}>
                        {getStateRows(states, alphabet)}
                    </TableBody>
                </Table>
                <Button onClick={(event) => {addRow(table, states, alphabet)}}>Add New State</Button> 
            </TableContainer>
            </div>
        );
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
                    <Button variant="contained" sx={{width: "6em"}} onClick={handleConfirmResetTableModal}>Yes</Button>
                    <Button variant="contained" sx={{width: "6em"}} onClick={handleCloseResetTableModal}>Cancel</Button>
                </Stack>
            </Box>
            </Fade>
        </Modal>
        </div>
    );
}