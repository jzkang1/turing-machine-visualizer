import React, {useEffect, useState} from 'react';
import { useContext } from 'react';
import { GlobalStoreContext } from '../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

export default function TransitionTable(props) {
    const {store} = useContext(GlobalStoreContext);
    
    const [table, setTable] = useState(null);

    // useEffect(() => {
    //     handleGenerateTable();
    // }, [store.currentlyEditingCell]);
      
    function getMaxWidth(alphabet) {
        if (alphabet.length < 10) {
            return 400 + alphabet.length*50;
        } else {
            return 1000;
        }
    }

    function getAlphabetRow(alphabet) {
        let row = [];
        for (let i = 0; i < alphabet.length; i++) {
            row.push(<TableCell align="center" sx={{minWidth: 50}}>{alphabet[i]}</TableCell>);
        }
        return row;
    }

    function getStateRows(table, listOfStates, alphabet, currentlyEditingCell) {
        let rows = [];
        for (let i = 0; i < listOfStates.length; i++) {
            let row = [<TableCell component="th">{listOfStates[i]}</TableCell>];
            for (let j = 0; j < alphabet.length; j++) {
                if (currentlyEditingCell !== null 
                    && currentlyEditingCell.state  === listOfStates[i] 
                    && currentlyEditingCell.character === alphabet[j]) {
                    row.push(
                        <TextField onKeyPress={(event) => {handleOnEnter(event)}}
                        placeholder={currentlyEditingCell.state !== null ? currentlyEditingCell.state : "Input something"} sx={{maxWidth: 100}}></TextField>
                    );
                } else {  
                    row.push(
                    <TableCell onDoubleClick={(event) => {handleTableCellDoubleClick(event, listOfStates[i], alphabet[j])}} 
                    align="center"
                    key={listOfStates[i] + " " + alphabet[j]}>
                        {"("
                        + (table[listOfStates[i]][alphabet[j]].write === null ? "_" : table[listOfStates[i]][alphabet[j]].write)
                        + ","
                        + (table[listOfStates[i]][alphabet[j]].action === null ? "_" : table[listOfStates[i]][alphabet[j]].action)
                        + ")"}
                    </TableCell>
                    );
                }
            }
            rows.push(
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {row}
                </TableRow>
            );
        }
        return rows;
    }
    
    function handleGenerateTable() {
        const { changed, listOfStates, alphabet, acceptingStates } = props.updateInputs();
        
        if (!changed) {
            return;
        }

        let i = -1;
        let j = -1;

        while (listOfStates[i] in store.transitionTable && i < listOfStates.length)
            ++i;
        
        if(i >= 0){
            while(alphabet[j] in store.transitionTable[listOfStates[0]] && j < alphabet.length)
                ++j;
        }


        let newTransitionTable = {};
        for (let a = 0; a < listOfStates.length; a++) {
            let stateObj = {};
            if (a <= i) {
                for (let b = 0; b < alphabet.length; b++) {
                    if (b <= j) {
                        stateObj[alphabet[b]] = store.transitionTable[listOfStates[a]][alphabet[b]];
                    } else {
                        stateObj[alphabet[b]] = {write: null, action: null};
                    }
                }
            } else {
                for (let b = 0; b < alphabet.length; b++) {
                    stateObj[alphabet[b]] = {write: null, action: null};
                }
            }
            newTransitionTable[listOfStates[a]] = stateObj;
            console.log(newTransitionTable);
        }

        // let newTransitionTable = {};
        // for (let a = 0; a < listOfStates.length; a++) {
        //     let stateObj = {};
        //     for (let b = 0; b < alphabet.length; b++) {
        //         stateObj[alphabet[b]] = {write: null, action: null}
        //     }
        //     newTransitionTable[listOfStates[a]] = stateObj;
        // }
        
        setTable(
            <div style={{display:"flex", "justifyContent": "center"}}>
            <TableContainer component={Paper} sx={{minWidth: 200, maxWidth: getMaxWidth(alphabet), mt: "10vh"}}>
                <Table sx={{maxWidth: getMaxWidth(alphabet) }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>States</TableCell>
                            {getAlphabetRow(alphabet)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getStateRows(newTransitionTable, listOfStates, alphabet, null)}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        );
        store.updateTransitionTable(newTransitionTable);
    }

    function handleTableCellDoubleClick(event, state, character) {
        event.stopPropagation();
        let newCurrentlyEditingCell = {state, character, action: {}};
        store.updateCurrentlyEditingCell(newCurrentlyEditingCell);
        setTable(
            <div style={{display:"flex", "justifyContent": "center"}}>
            <TableContainer component={Paper} sx={{minWidth: 200, maxWidth: getMaxWidth(store.alphabet), mt: "10vh"}}>
                <Table sx={{maxWidth: getMaxWidth(store.alphabet) }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>States</TableCell>
                            {getAlphabetRow(store.alphabet)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getStateRows(store.transitionTable, store.listOfStates, store.alphabet, newCurrentlyEditingCell)}
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        );
    }

    function handleOnEnter(event) {
        event.stopPropagation();
        if (event.key === "Enter") {
            //get new cell action
            let cellArray = event.target.value.split(",").map(item => item.trim());
            if (cellArray.length == 2) {
                let cellAction = {write: cellArray[0], action: cellArray[1]};
                let newTransitionTable = store.transitionTable;
                newTransitionTable[store.currentlyEditingCell.state][store.currentlyEditingCell.character] = cellAction;
                store.updateTransitionTable(newTransitionTable);
            }
            store.updateCurrentlyEditingCell(null);
        }
        
    }

    return (
        <div style={{display:"block", "justifyContent":"center"}}>
        <Button variant="contained" color="success" sx={{mt: "8vh"}} onClick={handleGenerateTable}>
        Generate Table
        </Button>
        {table}
        </div>
    );
}