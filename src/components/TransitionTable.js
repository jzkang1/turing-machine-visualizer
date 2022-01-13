import React from 'react'
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';



export default function TransitionTable() {
    const {store} = useContext(GlobalStoreContext);
    
    const [table, setTable] = useState(null);

    function getListFromString(string) {
        if (string === "") {
            return []
        }
        return string.split(",").map(item => item.trim())
    }
      
    function getMaxWidth() {
        if (store.alphabet.length < 10) {
            return 400 + store.alphabet.length*50;
        } else {
            return 1000;
        }
    }

    function getAlphabetRow() {
        let row = [];
        for (let i = 0; i < store.alphabet.length; i++) {
            row.push(<TableCell align="center" sx={{minWidth: 50}}>{store.alphabet[i]}</TableCell>);
        }
        return row;
    }

    function getStateRows() {
        let rows = [];
        for (let i = 0; i < store.listOfStates.length; i++) {
            let row = [<TableCell component="th">{store.listOfStates[i]}</TableCell>];
            for (let j = 0; j < store.alphabet.length; j++) {
                row.push(
                    <TableCell
                    align="center"
                    key={store.listOfStates[i] + " " + store.alphabet[j]}>
                        {"(C,A)"}
                    </TableCell>
                );
            }
            rows.push(
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick>
                {row}
                </TableRow>
            );
        }
        return rows;
    }

    function handleTableCellDoubleClick(event, state, character) {
        event.stopPropagation();
    }
    
    function handleGenerateTable() {
        if (!store.stateOrAlphabetChange) {
            return;
        }
        
        setTable(
        <div style={{display:"flex", "justifyContent": "center"}}>
        <TableContainer component={Paper} sx={{minWidth: 200, maxWidth: getMaxWidth(), mt: "10vh"}}>
            <Table sx={{maxWidth: getMaxWidth() }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>States</TableCell>
                        {getAlphabetRow()}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getStateRows()}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
        );

        let newTransitionTable = {};
        for (let state of store.states) {
            let stateObj = {};
            for (let character of store.alphabet) {
                stateObj[character] = {write: null, action: null}
            }
            newTransitionTable[state] = stateObj;
        }

        store.updateTransitiontable(newTransitionTable);
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